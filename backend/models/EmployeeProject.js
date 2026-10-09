import mongoose from 'mongoose';

const employeeProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, default: 'Internal VP Group' },
  description: { type: String },
  role: { type: String, default: 'Full-Stack Contributor' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  status: { type: String, enum: ['Active', 'In Review', 'Planning', 'Completed'], default: 'Active' },
  priority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'High' },
  deadline: { type: String },
  assignedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assignedModules: [{ type: String }],
  loggedHours: { type: Number, default: 0 },
  recentUpdate: { type: String }
}, { timestamps: true });

export default mongoose.model('EmployeeProject', employeeProjectSchema);
