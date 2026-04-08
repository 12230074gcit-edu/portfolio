import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initScrollTracking, initTimeTracking } from './utils/analytics'

// Initialize analytics tracking
const AppWithAnalytics = () => {
  useEffect(() => {
    // Initialize scroll depth tracking
    const cleanupScroll = initScrollTracking();
    
    // Initialize time on page tracking
    const cleanupTime = initTimeTracking();

    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupTime) cleanupTime();
    };
  }, []);

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithAnalytics />
  </StrictMode>,
)
