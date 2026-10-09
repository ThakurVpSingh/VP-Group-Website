import mongoose from 'mongoose';

const employeeStandupSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  accomplishments: { type: String, required: true },
  plannedWork: { type: String },
  blockers: { type: String, default: 'None' },
  hoursWorked: { type: Number, default: 8 }
}, { timestamps: true });

export default mongoose.model('EmployeeStandup', employeeStandupSchema);
