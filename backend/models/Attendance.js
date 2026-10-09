import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, enum: ['Present', 'Absent', 'On Leave'], default: 'Present' },
  checkIn: { type: String },
  checkOut: { type: String },
  workHours: { type: Number, default: 0 },
  location: { type: String, default: 'VP Tech Hub (HQ)' },
  shiftType: { type: String, default: 'General (09:00 - 18:00)' },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
