import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Consultation from '../models/Consultation.js';

dotenv.config();

const router = express.Router();

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

router.post('/book', async (req, res) => {
  try {
    console.log('--- NEW BOOKING REQUEST ---');
    console.log('Body:', req.body);
    const { visitorName, visitorEmail, duration, startTime, reason, overview } = req.body;

    if (!visitorName || !visitorEmail || !duration || !startTime) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // 1. Generate Meeting Room (Daily.co if API key present, otherwise fallback to Jitsi)
    let roomUrl = '';
    let meetingId = '';
    let visitorToken = '';
    
    if (process.env.DAILY_API_KEY) {
      // Create Daily.co Room
      const dailyResponse = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DAILY_API_KEY}`
        },
        body: JSON.stringify({
          properties: {
            exp: Math.floor(new Date(startTime).getTime() / 1000) + (duration * 60) + 3600, // Expires 1 hour after meeting ends
            enable_chat: true,
          }
        })
      });
      const roomData = await dailyResponse.json();
      if (roomData.url) {
        roomUrl = roomData.url;
        meetingId = roomData.name;
        
        // Optionally create meeting token for security
        const tokenResponse = await fetch('https://api.daily.co/v1/meeting-tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.DAILY_API_KEY}`
          },
          body: JSON.stringify({
            properties: { room_name: meetingId }
          })
        });
        const tokenData = await tokenResponse.json();
        visitorToken = tokenData.token || '';
      }
    } 
    
    if (!roomUrl) {
      // Fallback: Generate Jitsi Meet room
      meetingId = `vp-consultation-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      roomUrl = `https://meet.jit.si/${meetingId}`;
    }

    // 2. Save Appointment to Database
    const newConsultation = new Consultation({
      visitorName,
      visitorEmail,
      duration,
      startTime,
      meetingId,
      roomUrl,
      visitorToken,
      reason,
      overview
    });
    
    await newConsultation.save();

    // 3. Send Confirmation Email
    const meetingLink = `${process.env.FRONTEND_URL || 'https://vp-group-website.vercel.app'}/meeting/${meetingId}?token=${visitorToken}`;
    const dateObj = new Date(startTime);
    
    const mailOptions = {
      from: `"VP Group Scheduling" <${process.env.EMAIL_USER}>`,
      to: [visitorEmail, 'contact.vpsdev@gmail.com'], // Send to both
      subject: `Booking Confirmed: VP Group Video Consultation`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Consultation Confirmed</h2>
          <p>Hi ${visitorName},</p>
          <p>Your ${duration}-minute video consultation has been successfully scheduled.</p>
          <p><strong>Date & Time:</strong> ${dateObj.toLocaleString()}</p>
          <p><strong>Reason:</strong> ${reason || 'Not specified'}</p>
          <p><strong>Overview:</strong> ${overview || 'No additional details provided.'}</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${meetingLink}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Join Meeting</a>
          </div>
          <p style="color: #666; font-size: 0.9em;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 0.9em; word-break: break-all;">${meetingLink}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.8em; color: #999;">VP Group & Technologies</p>
        </div>
      `
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error('Nodemailer failed, but booking was saved:', mailError);
        // We don't throw here so the user still gets their success response
      }
    } else {
      console.log('Skipping email send: EMAIL_USER/PASS not configured. Meeting link:', meetingLink);
    }

    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully.',
      consultation: newConsultation,
      meetingLink
    });

  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ error: 'Failed to book consultation.' });
  }
});

// Route to get meeting details for the room
router.get('/:meetingId', async (req, res) => {
  try {
    const consultation = await Consultation.findOne({ meetingId: req.params.meetingId });
    if (!consultation) {
      return res.status(404).json({ error: 'Meeting not found.' });
    }
    res.json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all consultations (for Admin Dashboard)
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ startTime: -1 });
    res.json({ success: true, consultations });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
