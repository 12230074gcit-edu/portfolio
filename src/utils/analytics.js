// Analytics utility for tracking user interactions
// Replace GA_MEASUREMENT_ID with your actual Google Analytics ID

export const GA_TRACKING_ID = 'GA_MEASUREMENT_ID';

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track specific events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Pre-defined tracking events for the portfolio
export const trackEvents = {
  // Navigation
  navClick: (page) => event({
    action: 'navigation_click',
    category: 'Navigation',
    label: page,
  }),

  // Project interactions
  projectView: (projectName) => event({
    action: 'project_view',
    category: 'Projects',
    label: projectName,
  }),

  projectCardClick: (projectName) => event({
    action: 'project_card_click',
    category: 'Projects',
    label: projectName,
  }),

  // Contact form
  contactFormStart: () => event({
    action: 'form_start',
    category: 'Contact',
    label: 'Contact Form',
  }),

  contactFormSubmit: () => event({
    action: 'form_submit',
    category: 'Contact',
    label: 'Contact Form',
  }),

  // CV/Resume
  cvDownload: () => event({
    action: 'download',
    category: 'CV',
    label: 'Resume Download',
  }),

  // Social links
  socialClick: (platform) => event({
    action: 'social_click',
    category: 'Social',
    label: platform,
  }),

  // Scroll depth
  scrollDepth: (percentage) => event({
    action: 'scroll_depth',
    category: 'Engagement',
    label: `${percentage}%`,
    value: percentage,
  }),

  // Time on page
  timeOnPage: (seconds) => event({
    action: 'time_on_page',
    category: 'Engagement',
    value: seconds,
  }),

  // Bubble interactions
  bubblePop: () => event({
    action: 'bubble_pop',
    category: 'Interaction',
    label: 'Bubble Popped',
  }),

  // Gallery interactions
  galleryOpen: (imageName) => event({
    action: 'gallery_open',
    category: 'Gallery',
    label: imageName,
  }),
};

// Scroll depth tracking utility
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 100];
  const tracked = new Set();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvents.scrollDepth(threshold);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// Time on page tracking
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // seconds
  const tracked = new Set();

  const checkTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    intervals.forEach((interval) => {
      if (elapsed >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        trackEvents.timeOnPage(interval);
      }
    });
  };

  const intervalId = setInterval(checkTime, 5000);
  return () => clearInterval(intervalId);
};
