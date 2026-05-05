import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  visitorName: { type: String, required: true },
  visitorEmail: { type: String, required: true },
  duration: { type: Number, required: true }, // 45 or 90
  startTime: { type: Date, required: true },
  meetingId: { type: String, required: true, unique: true },
  roomUrl: { type: String, required: true },
  visitorToken: { type: String },
  instructorToken: { type: String },
  reason: { type: String },
  overview: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

export default mongoose.model('Consultation', consultationSchema);
