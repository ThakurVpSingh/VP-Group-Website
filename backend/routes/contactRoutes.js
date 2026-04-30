import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize transporter once outside the route for better performance
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Nodemailer Verification Error:', error.message);
  } else {
    console.log('✅ Nodemailer is ready to take our messages');
  }
});

// Health check route to verify backend is reachable
router.get('/', (req, res) => {
  res.status(200).send('✅ VP Group Backend Contact API is Live and Reachable!');
});

router.post('/', async (req, res) => {
  console.log('📩 Incoming Contact Request:', req.body.email);
  const { name, email, subject, message, attachment } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!process.env.EMAIL_PASS || !process.env.EMAIL_USER) {
    console.error('❌ CONFIG ERROR: EMAIL_USER or EMAIL_PASS is missing in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: Email service not configured.' });
  }

  try {
    const mailOptions = {
      from: `"VP Group Portal" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `VP Group Contact: ${subject}`,
      text: `
        New Message from VP Group Contact Form:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8b5cf6;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
      attachments: attachment ? [
        {
          filename: attachment.filename,
          content: attachment.content,
          encoding: attachment.encoding
        }
      ] : []
    };

    console.log('📤 Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email Sent successfully:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to send email. Ensure the backend has correct EMAIL_PASS and EMAIL_USER.',
      details: error.message
    });
  }
});

export default router;
