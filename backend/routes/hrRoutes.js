import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import User from '../models/User.js';
import EmployeeTask from '../models/EmployeeTask.js';
import EmployeeProject from '../models/EmployeeProject.js';
import EmployeeStandup from '../models/EmployeeStandup.js';

const router = express.Router();

// Get personal stats (Employee/Manager) - support date ranges
router.get('/stats', protect, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const leaveQuery = { user: req.user._id };
    const attendanceQuery = { user: req.user._id };

    if (startDate && endDate) {
      attendanceQuery.date = { $gte: startDate, $lte: endDate };
      leaveQuery.$or = [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } }
      ];
    } else {
      // Default to current month
      attendanceQuery.date = { $regex: new Date().toISOString().substring(0, 7) };
    }

    const leaves = await Leave.find(leaveQuery);
    const attendance = await Attendance.find(attendanceQuery).sort({ date: -1 });

    res.json({
      availableLeaves: 12 - leaves.filter(l => l.status === 'Approved').length,
      appliedLeaves: leaves.length,
      attendanceRecord: attendance,
      allLeaves: leaves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update subordinate data (Manager/Admin Only)
router.put('/subordinate/:id', protect, async (req, res) => {
    try {
        const subordinateId = req.params.id;
        const userToUpdate = await User.findById(subordinateId);
        
        if (!userToUpdate) return res.status(404).json({ message: 'User not found' });

        // Security check: Is this user under the current manager or is current user Admin?
        if (userToUpdate.manager?.toString() !== req.user._id.toString() && req.user.role.name !== 'Admin' && req.user.role.name !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Not authorized to update this member' });
        }

        const { username, email, status } = req.body;
        if (username) userToUpdate.username = username;
        if (email) userToUpdate.email = email;
        if (status) userToUpdate.status = status;

        await userToUpdate.save();
        res.json({ message: 'Subordinate profile updated successfully', user: userToUpdate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get team data (Manager Only)
router.get('/team', protect, async (req, res) => {
  try {
    if (req.user.role.name !== 'Manager' && req.user.role.name !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const team = await User.find({ manager: req.user._id });
    const teamIds = team.map(u => u._id);
    
    const teamAttendance = await Attendance.find({ 
      user: { $in: teamIds },
      date: new Date().toISOString().substring(0, 10) // Today
    }).populate('user', 'username');

    const pendingLeaves = await Leave.find({
      user: { $in: teamIds },
      status: 'Pending'
    }).populate('user', 'username');

    res.json({
      teamMembers: team,
      todayAttendance: teamAttendance,
      pendingLeaves: pendingLeaves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply for Leave
router.post('/leave', protect, async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const leave = new Leave({
      user: req.user._id,
      startDate,
      endDate,
      reason,
      status: 'Pending'
    });
    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clock In
router.post('/attendance/clock-in', protect, async (req, res) => {
  try {
    const date = new Date().toISOString().substring(0, 10);
    let attendance = await Attendance.findOne({ user: req.user._id, date });
    if (attendance) {
      return res.status(400).json({ message: 'Already clocked in for today' });
    }
    attendance = new Attendance({
      user: req.user._id,
      date,
      checkIn: new Date().toISOString().substring(11, 16)
    });
    await attendance.save();
    res.status(201).json({ message: 'Clocked in successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clock Out
router.put('/attendance/clock-out', protect, async (req, res) => {
  try {
    const date = new Date().toISOString().substring(0, 10);
    const attendance = await Attendance.findOne({ user: req.user._id, date });
    if (!attendance) {
      return res.status(404).json({ message: 'No clock-in record found for today' });
    }
    const checkOutTime = new Date().toISOString().substring(11, 16);
    attendance.checkOut = checkOutTime;
    
    if (attendance.checkIn) {
      const [inH, inM] = attendance.checkIn.split(':').map(Number);
      const [outH, outM] = checkOutTime.split(':').map(Number);
      const diffMins = (outH * 60 + outM) - (inH * 60 + inM);
      attendance.workHours = Math.max(0, +(diffMins / 60).toFixed(2));
    }
    
    await attendance.save();
    res.json({ message: 'Clocked out successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/Reject Leave (Manager Only)
router.put('/leave/:id', protect, async (req, res) => {
  try {
    if (req.user.role.name !== 'Manager' && req.user.role.name !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { status } = req.body; // 'Approved' or 'Rejected'
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    
    leave.status = status;
    await leave.save();
    res.json({ message: `Leave ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// EMPLOYEE DASHBOARD EXPANDED ENDPOINTS
// ==========================================

// Get Comprehensive Employee Dashboard Data
router.get('/employee/dashboard-data', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('role', 'name')
      .populate('manager', 'username email status');

    const today = new Date().toISOString().substring(0, 10);
    const todayAttendance = await Attendance.findOne({ user: req.user._id, date: today });

    // Recent 30 days attendance
    const attendanceHistory = await Attendance.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30);

    // Leaves
    const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });

    // Tasks for this employee
    let tasks = await EmployeeTask.find({ user: req.user._id }).sort({ createdAt: -1 });
    if (tasks.length === 0) {
      // Seed default realistic tasks for this employee
      const defaultTasks = [
        {
          user: req.user._id,
          title: 'Implement JWT Token Rotation & Session Mesh',
          description: 'Ensure token refresh occurs seamlessly every 15 minutes across client micro-frontends.',
          project: 'VP Vault IAM',
          priority: 'High',
          status: 'In Progress',
          estimatedHours: 3.5,
          loggedHours: 2,
          dueDate: today
        },
        {
          user: req.user._id,
          title: 'Optimize WebGL Canvas Pipeline for Service Showcase',
          description: 'Reduce GPU draw calls and handle high DPR displays on mobile devices.',
          project: 'AI Custom ERP',
          priority: 'Medium',
          status: 'Completed',
          estimatedHours: 2.0,
          loggedHours: 2.0,
          dueDate: today
        },
        {
          user: req.user._id,
          title: 'Audit REST API Rate Limiter on Consultation Booking',
          description: 'Prevent spam bot reservations and implement Redis/memory sliding window algorithm.',
          project: 'Enterprise Client Portal',
          priority: 'High',
          status: 'Todo',
          estimatedHours: 4.0,
          loggedHours: 0,
          dueDate: today
        },
        {
          user: req.user._id,
          title: 'Sync Sprint Backlog with Tech Lead in Daily Standup',
          description: 'Review blocked items on distributed database migration.',
          project: 'Internal Core',
          priority: 'Low',
          status: 'Completed',
          estimatedHours: 1.0,
          loggedHours: 1.0,
          dueDate: today
        }
      ];
      tasks = await EmployeeTask.insertMany(defaultTasks);
    }

    // Projects for this employee
    let projects = await EmployeeProject.find({
      $or: [
        { assignedMembers: req.user._id },
        { assignedMembers: { $exists: true, $size: 0 } }
      ]
    });

    if (projects.length === 0) {
      const defaultProjects = [
        {
          title: 'AI Custom ERP 2.0',
          client: 'Apex Global Logistics',
          description: 'Next-gen enterprise resource planning system with autonomous forecasting and inventory neural nets.',
          role: 'Lead Frontend Architecture & State Specialist',
          progress: 78,
          status: 'Active',
          priority: 'High',
          deadline: '2026-10-25',
          assignedMembers: [req.user._id],
          assignedModules: ['Automated Invoice OCR', 'Inventory Realtime Radar', 'Multi-tenant Org Switcher'],
          loggedHours: 48,
          recentUpdate: 'Completed micro-frontend state synchronization with zero lag.'
        },
        {
          title: 'VP Vault IAM Security Mesh',
          client: 'FinTech Global Systems',
          description: 'Zero-trust enterprise identity and access management with hardware key & multi-factor verification.',
          role: 'Security Integration Engineer',
          progress: 92,
          status: 'In Review',
          priority: 'Urgent',
          deadline: '2026-10-10',
          assignedMembers: [req.user._id],
          assignedModules: ['Hardware Token Auth', 'Granular Role Matrices', 'Audit Log Encryption'],
          loggedHours: 36,
          recentUpdate: 'Penetration test passed with zero critical vulnerabilities.'
        },
        {
          title: 'Enterprise Client Portal Modernization',
          client: 'Mother Bliss Care',
          description: 'Decoupled headless portal with real-time consultation booking and telemedicine WebRTC video room.',
          role: 'Full-Stack Contributor',
          progress: 64,
          status: 'Active',
          priority: 'Normal',
          deadline: '2026-11-15',
          assignedMembers: [req.user._id],
          assignedModules: ['Consultation Booking Engine', 'Doctor Availability Calendar', 'Telehealth RTC Hub'],
          loggedHours: 29,
          recentUpdate: 'Successfully connected WebRTC media stream pipeline.'
        },
        {
          title: 'Cybersecurity Threat Radar & IDS',
          client: 'Defense Tech Syndicate',
          description: 'Real-time packet inspection and anomaly classifier for distributed cloud VPC networks.',
          role: 'Module Developer',
          progress: 42,
          status: 'Active',
          priority: 'High',
          deadline: '2026-11-30',
          assignedMembers: [req.user._id],
          assignedModules: ['Packet Sniffer Daemon', 'Incident Alerting Webhook', 'Traffic Heatmap'],
          loggedHours: 19,
          recentUpdate: 'Alpha packet parser benchmarked at 2.4 Gbps throughput.'
        }
      ];
      projects = await EmployeeProject.insertMany(defaultProjects);
    }

    // Manager Details
    let manager = user.manager;
    if (!manager) {
      // Find or provision a representative manager
      const foundManager = await User.findOne({ email: 'manager@vexio.local' });
      manager = foundManager ? {
        _id: foundManager._id,
        username: foundManager.username,
        email: foundManager.email,
        role: 'Engineering Manager',
        department: 'Core Systems & Cloud Architecture',
        status: 'Active'
      } : {
        _id: 'mgr-001',
        username: 'Sarah Jenkins',
        email: 's.jenkins@vpgroup.tech',
        role: 'VP of Engineering & Architecture Lead',
        department: 'Core Systems & Cloud Architecture',
        status: 'Active'
      };
    }

    // Team Members (colleagues in the department)
    const teamUsers = await User.find({ _id: { $ne: req.user._id } })
      .populate('role', 'name')
      .select('username email role status')
      .limit(6);

    const teamMembers = teamUsers.length > 0 ? teamUsers.map(m => ({
      _id: m._id,
      username: m.username,
      email: m.email,
      role: m.role?.name || 'Engineer',
      status: m.status || 'Active'
    })) : [
      { _id: 'tm-1', username: 'Alex Mercer', email: 'a.mercer@vpgroup.tech', role: 'Staff Backend Engineer', status: 'Active', currentProject: 'AI Custom ERP' },
      { _id: 'tm-2', username: 'Priya Sharma', email: 'p.sharma@vpgroup.tech', role: 'Lead UI/UX Designer', status: 'Active', currentProject: 'Enterprise Client Portal' },
      { _id: 'tm-3', username: 'Vikram Patel', email: 'v.patel@vpgroup.tech', role: 'DevOps & SRE Specialist', status: 'Active', currentProject: 'VP Vault IAM' },
      { _id: 'tm-4', username: 'Elena Rostova', email: 'e.rostova@vpgroup.tech', role: 'AI & Neural Systems Researcher', status: 'Active', currentProject: 'Threat Radar' },
      { _id: 'tm-5', username: 'Rohan Gupta', email: 'r.gupta@vpgroup.tech', role: 'QA & Automation Engineer', status: 'Active', currentProject: 'AI Custom ERP' }
    ];

    // Standup logs
    const standups = await EmployeeStandup.find({ user: req.user._id }).sort({ date: -1 }).limit(7);

    res.json({
      employee: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role?.name || 'Employee',
        employeeId: 'VP-EMP-8402',
        designation: 'Senior Full-Stack & AI Systems Engineer',
        department: 'Enterprise Platforms & Applied AI Core',
        joiningDate: '2024-03-15',
        status: user.status || 'Active'
      },
      todayAttendance,
      attendanceHistory,
      leaves: {
        available: 12 - leaves.filter(l => l.status === 'Approved').length,
        applied: leaves.length,
        records: leaves
      },
      tasks,
      projects,
      manager,
      teamMembers,
      standups
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Employee Task
router.post('/employee/tasks', protect, async (req, res) => {
  try {
    const { title, description, project, priority, estimatedHours, dueDate } = req.body;
    const task = new EmployeeTask({
      user: req.user._id,
      title,
      description,
      project: project || 'General / Internal',
      priority: priority || 'Medium',
      estimatedHours: estimatedHours || 2,
      dueDate: dueDate || new Date().toISOString().substring(0, 10),
      status: 'Todo'
    });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update/Toggle Employee Task
router.put('/employee/tasks/:id', protect, async (req, res) => {
  try {
    const task = await EmployeeTask.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { status, title, description, priority, loggedHours } = req.body;
    if (status !== undefined) {
      task.status = status;
      if (status === 'Completed') {
        task.completedAt = new Date();
      }
    }
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority) task.priority = priority;
    if (loggedHours !== undefined) task.loggedHours = loggedHours;

    await task.save();
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Employee Task
router.delete('/employee/tasks/:id', protect, async (req, res) => {
  try {
    const task = await EmployeeTask.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Project Work Progress & Log Hours
router.put('/employee/projects/:id/progress', protect, async (req, res) => {
  try {
    const { progress, loggedHoursIncrement, recentUpdate } = req.body;
    const project = await EmployeeProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (progress !== undefined) project.progress = Math.min(100, Math.max(0, Number(progress)));
    if (loggedHoursIncrement) project.loggedHours = (project.loggedHours || 0) + Number(loggedHoursIncrement);
    if (recentUpdate) project.recentUpdate = recentUpdate;

    await project.save();
    res.json({ message: 'Project progress updated', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit Daily Standup & EOD Progress Report
router.post('/employee/standup', protect, async (req, res) => {
  try {
    const { accomplishments, plannedWork, blockers, hoursWorked } = req.body;
    const date = new Date().toISOString().substring(0, 10);

    let standup = await EmployeeStandup.findOne({ user: req.user._id, date });
    if (standup) {
      standup.accomplishments = accomplishments;
      standup.plannedWork = plannedWork;
      standup.blockers = blockers || 'None';
      standup.hoursWorked = hoursWorked || 8;
      await standup.save();
    } else {
      standup = new EmployeeStandup({
        user: req.user._id,
        date,
        accomplishments,
        plannedWork,
        blockers: blockers || 'None',
        hoursWorked: hoursWorked || 8
      });
      await standup.save();
    }

    res.status(201).json({ message: 'EOD Standup report submitted successfully', standup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

