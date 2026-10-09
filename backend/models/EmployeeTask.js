import mongoose from 'mongoose';

const employeeTaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  project: { type: String, default: 'General / Internal' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeProject' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  status: { type: String, enum: ['Todo', 'In Progress', 'Completed', 'Blocked'], default: 'Todo' },
  estimatedHours: { type: Number, default: 2 },
  loggedHours: { type: Number, default: 0 },
  dueDate: { type: String },
  completedAt: { type: Date }
}, { timestamps: true });

export default mongoose.model('EmployeeTask', employeeTaskSchema);
