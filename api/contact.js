// Vercel Serverless Function for Contact Form
// Uses Resend for email delivery

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for Resend API key
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      // Fallback: Log the message and return success for development
      console.log('Contact form submission:', { name, email, subject, message });
      
      // In production without Resend, we can still notify via other means
      // For now, we'll save to a log and return success
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! I will get back to you soon.',
        fallback: true
      });
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['jigmenamgyel.dev@gmail.com'],
        reply_to: email,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #080C72 0%, #0a0e5c 100%); padding: 30px; border-radius: 16px 16px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                <p style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">${name}</p>
                <p style="margin: 4px 0 0; color: #6b7280;">${email}</p>
              </div>
              <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e5e7eb;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 500;">${subject}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    const data = await response.json();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! I will get back to you soon.',
      id: data.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
