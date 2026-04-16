const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio Backend API is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (name, email, message)',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a1a; color: #ffffff; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #1a1a3e 0%, #0a0a1a 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; border-bottom: 1px solid rgba(100,150,255,0.3); }
            .header h1 { margin: 0; font-size: 24px; color: #ffffff; }
            .content { background: #0f0f2a; padding: 30px; border-radius: 0 0 12px 12px; }
            .field { margin-bottom: 20px; }
            .label { color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .value { color: #ffffff; font-size: 16px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid rgba(100,150,255,0.5); }
            .message-box { white-space: pre-wrap; line-height: 1.6; }
            .footer { text-align: center; margin-top: 30px; color: rgba(255,255,255,0.4); font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject || 'No subject'}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              This message was sent from your portfolio contact form.
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'} - from ${name}`,
      html: htmlContent,
      text: `New contact from ${name} (${email})\n\nSubject: ${subject || 'No subject'}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully from ${name} (${email})`);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
