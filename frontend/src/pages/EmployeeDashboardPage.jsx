import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../config';
import { AuthContext } from '../context/AuthContext';
import { 
  Clock, Calendar, CheckCircle2, Circle, AlertCircle, Play, Square, 
  Pause, Coffee, Briefcase, Users, User, ArrowUpRight, Plus, 
  Send, ChevronRight, Filter, Shield, Zap, Sparkles, Building2, 
  FolderGit2, MessageSquare, PhoneCall, Mail, Bell, ExternalLink, 
  LogOut, RefreshCw, BarChart3, Award, Flame, Check, X, 
  CalendarDays, ChevronLeft, ChevronDown, Laptop, HelpCircle
} from 'lucide-react';
import Logo from '../components/Logo';

// Initial default rich data for immediate display and fallback
const DEFAULT_INITIAL_STATE = {
  employee: {
    name: 'Vaibhav P. Singh',
    username: 'EmployeeOne',
    email: 'employee@vexio.local',
    employeeId: 'VP-EMP-8402',
    designation: 'Senior Full-Stack & AI Systems Engineer',
    department: 'Enterprise AI & Cloud Platforms Core',
    joiningDate: '15 March 2024',
    location: 'VP Tech Hub (HQ) / Remote Hybrid',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
  },
  manager: {
    name: 'Sarah Jenkins',
    email: 's.jenkins@vpgroup.tech',
    role: 'VP of Engineering & Head of Architecture',
    department: 'Engineering Leadership Core',
    status: 'Online',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '+91 6388 398 552',
    next1on1: 'Thursday, 3:00 PM IST',
    office: 'VP Tech Tower, Level 4'
  },
  teamMembers: [
    {
      id: 'tm-1',
      name: 'Alex Mercer',
      email: 'a.mercer@vpgroup.tech',
      role: 'Staff Distributed Systems Engineer',
      status: 'Online',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      currentProject: 'AI Custom ERP 2.0',
      activeTask: 'Optimizing Redis Cache cluster'
    },
    {
      id: 'tm-2',
      name: 'Priya Sharma',
      email: 'p.sharma@vpgroup.tech',
      role: 'Lead UI/UX & Design Systems Architect',
      status: 'Online',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      currentProject: 'Enterprise Client Portal',
      activeTask: 'Figma token export for Dark Mode'
    },
    {
      id: 'tm-3',
      name: 'Vikram Patel',
      email: 'v.patel@vpgroup.tech',
      role: 'DevOps & SRE Specialist',
      status: 'In Review',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      currentProject: 'VP Vault IAM',
      activeTask: 'Kubernetes ingress SSL rotation'
    },
    {
      id: 'tm-4',
      name: 'Elena Rostova',
      email: 'e.rostova@vpgroup.tech',
      role: 'AI & Neural Systems Researcher',
      status: 'Online',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      currentProject: 'Cybersecurity Threat Radar',
      activeTask: 'Fine-tuning anomaly classifier'
    },
    {
      id: 'tm-5',
      name: 'Rohan Gupta',
      email: 'r.gupta@vpgroup.tech',
      role: 'QA & Automation Engineer',
      status: 'Meeting',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      currentProject: 'AI Custom ERP 2.0',
      activeTask: 'Writing Cypress regression suite'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AI Custom ERP 2.0',
      client: 'Apex Global Logistics & Supply Chain',
      role: 'Lead Frontend Architecture & State Specialist',
      progress: 78,
      status: 'Active',
      priority: 'High',
      deadline: '2026-10-25',
      loggedHours: 48,
      totalHoursEst: 64,
      assignedModules: [
        'Automated Invoice OCR Reader',
        'Real-time Inventory Radar',
        'Multi-tenant Org Switcher',
        'Financial Ledger Sync'
      ],
      recentUpdate: 'Completed micro-frontend state synchronization with zero lag.',
      repo: 'github.com/vpgroup/ai-erp-core'
    },
    {
      id: 'proj-2',
      title: 'VP Vault IAM Security Mesh',
      client: 'FinTech Global Systems',
      role: 'Security Protocol Contributor',
      progress: 92,
      status: 'In Review',
      priority: 'Urgent',
      deadline: '2026-10-10',
      loggedHours: 36,
      totalHoursEst: 40,
      assignedModules: [
        'Hardware Token WebAuthn Auth',
        'Granular Role Matrix Engine',
        'Audit Trail Zero-Knowledge Exporter'
      ],
      recentUpdate: 'Security penetration test passed with zero critical CVEs.',
      repo: 'github.com/vpgroup/vault-iam'
    },
    {
      id: 'proj-3',
      title: 'Enterprise Client Portal Modernization',
      client: 'Mother Bliss Care',
      role: 'Full-Stack Contributor & WebRTC Lead',
      progress: 64,
      status: 'Active',
      priority: 'Normal',
      deadline: '2026-11-15',
      loggedHours: 29,
      totalHoursEst: 45,
      assignedModules: [
        'Consultation Booking Engine',
        'Doctor Availability Grid',
        'Telehealth WebRTC Video Room'
      ],
      recentUpdate: 'Connected WebRTC media stream pipeline with HD audio.',
      repo: 'github.com/vpgroup/mother-bliss-portal'
    },
    {
      id: 'proj-4',
      title: 'Cybersecurity Threat Radar & IDS',
      client: 'Defense Tech Syndicate',
      role: 'Core Engine Developer',
      progress: 42,
      status: 'Active',
      priority: 'High',
      deadline: '2026-11-30',
      loggedHours: 19,
      totalHoursEst: 50,
      assignedModules: [
        'Packet Sniffer Daemon',
        'Incident Alerting Webhook',
        'Live Traffic Visualizer'
      ],
      recentUpdate: 'Alpha packet parser benchmarked at 2.4 Gbps throughput.',
      repo: 'github.com/vpgroup/threat-radar'
    }
  ],
  tasks: [
    {
      id: 'task-1',
      title: 'Implement JWT Token Rotation & Session Mesh',
      description: 'Ensure token refresh occurs seamlessly every 15 minutes across client micro-frontends.',
      project: 'VP Vault IAM Security Mesh',
      priority: 'High',
      status: 'In Progress',
      estimatedHours: 3.5,
      loggedHours: 2,
      dueDate: new Date().toISOString().substring(0, 10)
    },
    {
      id: 'task-2',
      title: 'Optimize WebGL Canvas Pipeline for Service Showcase',
      description: 'Reduce GPU draw calls and handle high DPR displays on mobile devices.',
      project: 'AI Custom ERP 2.0',
      priority: 'Medium',
      status: 'Completed',
      estimatedHours: 2.0,
      loggedHours: 2.0,
      dueDate: new Date().toISOString().substring(0, 10)
    },
    {
      id: 'task-3',
      title: 'Audit REST API Rate Limiter on Consultation Booking',
      description: 'Prevent spam reservations and implement sliding window algorithm.',
      project: 'Enterprise Client Portal Modernization',
      priority: 'High',
      status: 'Todo',
      estimatedHours: 4.0,
      loggedHours: 0,
      dueDate: new Date().toISOString().substring(0, 10)
    },
    {
      id: 'task-4',
      title: 'Sync Sprint Backlog with Tech Lead in Daily Standup',
      description: 'Review blocked items on distributed database migration.',
      project: 'Internal VP Group',
      priority: 'Low',
      status: 'Completed',
      estimatedHours: 1.0,
      loggedHours: 1.0,
      dueDate: new Date().toISOString().substring(0, 10)
    }
  ],
  attendance: {
    todayClockIn: '09:15',
    todayClockOut: null,
    isClockedIn: true,
    workMode: 'On-Duty', // 'On-Duty', 'On-Break', 'Completed'
    clockInTimestamp: Date.now() - (4 * 3600 * 1000 + 22 * 60 * 1000), // ~4h 22m ago
    history: [
      { date: '2026-09-28', clockIn: '09:15', clockOut: '--:--', hours: 4.4, status: 'Present', location: 'VP Tech Hub' },
      { date: '2026-09-27', clockIn: '09:02', clockOut: '18:10', hours: 9.1, status: 'Present', location: 'VP Tech Hub' },
      { date: '2026-09-26', clockIn: '09:20', clockOut: '17:45', hours: 8.4, status: 'Present', location: 'Remote Hybrid' },
      { date: '2026-09-25', clockIn: '08:55', clockOut: '18:05', hours: 9.2, status: 'Present', location: 'VP Tech Hub' },
      { date: '2026-09-24', clockIn: '09:10', clockOut: '18:00', hours: 8.8, status: 'Present', location: 'VP Tech Hub' },
      { date: '2026-09-23', clockIn: '09:05', clockOut: '18:30', hours: 9.4, status: 'Present', location: 'Remote Hybrid' },
      { date: '2026-09-22', clockIn: '09:00', clockOut: '17:30', hours: 8.5, status: 'Present', location: 'VP Tech Hub' }
    ],
    leaves: {
      available: 9,
      medical: 5,
      applied: 2,
      records: [
        { id: 'lv-1', type: 'Casual Leave', startDate: '2026-08-14', endDate: '2026-08-15', reason: 'Family engagement', status: 'Approved' },
        { id: 'lv-2', type: 'WFH Day', startDate: '2026-09-04', endDate: '2026-09-04', reason: 'Internet maintenance at home', status: 'Approved' }
      ]
    }
  },
  standup: {
    accomplishments: 'Delivered initial WebAuthn hardware key flow. Merged PR #42 into ERP core.',
    plannedWork: 'Finish JWT token sliding window refresh. Connect WebRTC media server.',
    blockers: 'None. AWS KMS permissions were resolved by DevOps.',
    lastUpdated: 'Today at 09:30 AM'
  }
};

const EmployeeDashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'attendance', 'tasks', 'projects', 'team'
  
  // Dashboard State (loaded from backend or cached in localStorage)
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('vp_emp_dashboard_data_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_INITIAL_STATE, ...parsed };
      } catch (e) {
        return DEFAULT_INITIAL_STATE;
      }
    }
    return DEFAULT_INITIAL_STATE;
  });

  // UI state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toastMessage, setToastMessage] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(null); // Project object being updated
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState('All'); // 'All', 'Todo', 'In Progress', 'Completed'
  const [projectFilter, setProjectFilter] = useState('All'); // 'All', 'Active', 'In Review'

  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('AI Custom ERP 2.0');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskHours, setNewTaskHours] = useState('2');
  
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  const [standupAccomplishments, setStandupAccomplishments] = useState(data.standup.accomplishments);
  const [standupPlanned, setStandupPlanned] = useState(data.standup.plannedWork);
  const [standupBlockers, setStandupBlockers] = useState(data.standup.blockers);

  // Manager message state
  const [managerMessage, setManagerMessage] = useState('');

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('vp_emp_dashboard_data_v1', JSON.stringify(data));
  }, [data]);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show Toast Helper
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch from backend API if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
        if (!storedUser?.token) return;

        const res = await axios.get(getApiUrl('/api/hr/employee/dashboard-data'), {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });

        if (res.data) {
          setData(prev => {
            const updated = { ...prev };
            if (res.data.employee) {
              updated.employee = { ...prev.employee, ...res.data.employee };
            }
            if (res.data.manager) {
              updated.manager = { ...prev.manager, ...res.data.manager };
            }
            if (res.data.teamMembers && res.data.teamMembers.length > 0) {
              updated.teamMembers = res.data.teamMembers;
            }
            if (res.data.projects && res.data.projects.length > 0) {
              updated.projects = res.data.projects;
            }
            if (res.data.tasks && res.data.tasks.length > 0) {
              updated.tasks = res.data.tasks;
            }
            if (res.data.todayAttendance) {
              updated.attendance.todayClockIn = res.data.todayAttendance.checkIn;
              updated.attendance.todayClockOut = res.data.todayAttendance.checkOut;
              updated.attendance.isClockedIn = !res.data.todayAttendance.checkOut;
            }
            return updated;
          });
        }
      } catch (err) {
        // Backend offline or cold-start: continue smoothly with client state
        console.log('Using local responsive dashboard state');
      }
    };

    fetchBackendData();
  }, []);

  // Compute live elapsed shift time
  const elapsedShiftTime = useMemo(() => {
    if (!data.attendance.isClockedIn) {
      return 'Shift Inactive';
    }
    const diff = Math.max(0, currentTime.getTime() - data.attendance.clockInTimestamp);
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hrs).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  }, [currentTime, data.attendance.isClockedIn, data.attendance.clockInTimestamp]);

  // Compute Task Stats
  const taskStats = useMemo(() => {
    const total = data.tasks.length;
    const completed = data.tasks.filter(t => t.status === 'Completed').length;
    const inProgress = data.tasks.filter(t => t.status === 'In Progress').length;
    const todo = data.tasks.filter(t => t.status === 'Todo').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, todo, percentage };
  }, [data.tasks]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    if (taskFilter === 'All') return data.tasks;
    return data.tasks.filter(t => t.status === taskFilter);
  }, [data.tasks, taskFilter]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') return data.projects;
    return data.projects.filter(p => p.status === projectFilter);
  }, [data.projects, projectFilter]);

  // --- ACTIONS ---

  // Clock In
  const handleClockIn = async () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const todayDate = new Date().toISOString().substring(0, 10);

    // Call backend API
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (storedUser?.token) {
        await axios.post(getApiUrl('/api/hr/attendance/clock-in'), {}, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
      }
    } catch (e) {
      console.log('Clock-in local fallback active');
    }

    setData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        isClockedIn: true,
        todayClockIn: timeStr,
        todayClockOut: null,
        workMode: 'On-Duty',
        clockInTimestamp: Date.now(),
        history: [
          {
            date: todayDate,
            clockIn: timeStr,
            clockOut: '--:--',
            hours: 0,
            status: 'Present',
            location: 'VP Tech Hub (HQ)'
          },
          ...prev.attendance.history.filter(h => h.date !== todayDate)
        ]
      }
    }));

    showToast(`Clocked in successfully at ${timeStr}! Have a productive shift.`);
  };

  // Clock Out
  const handleClockOut = async () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const todayDate = new Date().toISOString().substring(0, 10);

    // Call backend API
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (storedUser?.token) {
        await axios.put(getApiUrl('/api/hr/attendance/clock-out'), {}, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
      }
    } catch (e) {
      console.log('Clock-out local fallback active');
    }

    const elapsedHrs = +((Date.now() - data.attendance.clockInTimestamp) / (1000 * 3600)).toFixed(1);

    setData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        isClockedIn: false,
        todayClockOut: timeStr,
        workMode: 'Completed',
        history: prev.attendance.history.map(h => 
          h.date === todayDate 
            ? { ...h, clockOut: timeStr, hours: elapsedHrs } 
            : h
        )
      }
    }));

    showToast(`Clocked out at ${timeStr}. Total shift duration: ${elapsedHrs} hrs. Great work!`);
  };

  // Toggle Task Completion
  const handleToggleTask = async (taskId) => {
    const currentTask = data.tasks.find(t => t.id === taskId);
    if (!currentTask) return;

    const newStatus = currentTask.status === 'Completed' ? 'In Progress' : 'Completed';

    // Call backend API
    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (storedUser?.token) {
        await axios.put(getApiUrl(`/api/hr/employee/tasks/${taskId}`), { status: newStatus }, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
      }
    } catch (e) {}

    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => 
        t.id === taskId 
          ? { ...t, status: newStatus, loggedHours: newStatus === 'Completed' ? t.estimatedHours : t.loggedHours } 
          : t
      )
    }));

    if (newStatus === 'Completed') {
      showToast(`Task "${currentTask.title.substring(0, 30)}..." marked Complete! 🎉`);
    } else {
      showToast(`Task reopened as In Progress.`);
    }
  };

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: 'task-' + Date.now(),
      title: newTaskTitle,
      project: newTaskProject,
      priority: newTaskPriority,
      status: 'Todo',
      estimatedHours: Number(newTaskHours) || 2,
      loggedHours: 0,
      dueDate: new Date().toISOString().substring(0, 10)
    };

    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (storedUser?.token) {
        await axios.post(getApiUrl('/api/hr/employee/tasks'), newTask, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
      }
    } catch (e) {}

    setData(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));

    setNewTaskTitle('');
    setShowAddTaskModal(false);
    showToast(`New task "${newTask.title}" added to your board!`);
  };

  // Submit Leave Request
  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (!leaveStart || !leaveEnd || !leaveReason) return;

    const newLeave = {
      id: 'lv-' + Date.now(),
      type: leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason,
      status: 'Pending'
    };

    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (storedUser?.token) {
        await axios.post(getApiUrl('/api/hr/leave'), newLeave, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
      }
    } catch (e) {}

    setData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        leaves: {
          ...prev.attendance.leaves,
          applied: prev.attendance.leaves.applied + 1,
          records: [newLeave, ...prev.attendance.leaves.records]
        }
      }
    }));

    setShowLeaveModal(false);
    setLeaveStart('');
    setLeaveEnd('');
    setLeaveReason('');
    showToast(`Leave application submitted for approval from ${data.manager.name}!`);
  };

  // Save Standup
  const handleSaveStandup = async (e) => {
    e.preventDefault();

    try {
      const storedUser = JSON.parse(localStorage.getItem('vexiogate_user'));
      if (storedUser?.token) {
        await axios.post(getApiUrl('/api/hr/employee/standup'), {
          accomplishments: standupAccomplishments,
          plannedWork: standupPlanned,
          blockers: standupBlockers
        }, {
          headers: { Authorization: `Bearer ${storedUser.token}` }
        });
      }
    } catch (e) {}

    setData(prev => ({
      ...prev,
      standup: {
        accomplishments: standupAccomplishments,
        plannedWork: standupPlanned,
        blockers: standupBlockers,
        lastUpdated: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    }));

    showToast('Daily EOD Standup submitted to Engineering Manager! 🚀');
  };

  // Update Project Work Progress
  const handleUpdateProjectProgress = (projectId, newProgress, addedHours, note) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            progress: Math.min(100, Math.max(0, Number(newProgress))),
            loggedHours: (p.loggedHours || 0) + (Number(addedHours) || 0),
            recentUpdate: note || p.recentUpdate
          };
        }
        return p;
      })
    }));

    setShowProjectModal(null);
    showToast(`Project work progress updated to ${newProgress}%!`);
  };

  // Send message to Manager
  const handleSendMessageToManager = (e) => {
    e.preventDefault();
    if (!managerMessage.trim()) return;
    setShowManagerModal(false);
    setManagerMessage('');
    showToast(`Message dispatched directly to ${data.manager.name}!`);
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate('/employee-login');
  };

  return (
    <div className="emp-dash-root">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`toast-notification toast-${toastMessage.type}`}>
          <Sparkles size={18} />
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <header className="dash-top-header">
        <div className="header-left">
          <div className="header-logo-group" onClick={() => navigate('/')}>
            <Logo variant="icon" size="32px" />
            <div className="header-brand-labels">
              <span className="brand-primary">VP GROUP</span>
              <span className="brand-sub">WORKFORCE TERMINAL</span>
            </div>
          </div>
          <span className="header-status-badge">
            <span className="pulse-dot" /> LIVE SYNCED
          </span>
        </div>

        {/* Live Clock & Shift Status Widget */}
        <div className="header-center">
          <div className="live-clock-pill">
            <Clock size={16} className="clock-icon" />
            <span className="clock-time">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="clock-date">
              {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className={`shift-status-pill ${data.attendance.isClockedIn ? 'status-active' : 'status-offline'}`}>
            <span className="status-label">
              {data.attendance.isClockedIn ? 'CLOCK IN ACTIVE' : 'CLOCKED OUT'}
            </span>
            <span className="shift-timer">{elapsedShiftTime}</span>
          </div>
        </div>

        {/* User Profile & Quick Actions */}
        <div className="header-right">
          <div className="quick-punch-group">
            {!data.attendance.isClockedIn ? (
              <button onClick={handleClockIn} className="punch-btn punch-in-btn">
                <Play size={14} /> Clock In
              </button>
            ) : (
              <button onClick={handleClockOut} className="punch-btn punch-out-btn">
                <Square size={14} /> Clock Out
              </button>
            )}
          </div>

          <div className="user-profile-chip" onClick={() => setActiveTab('overview')}>
            <img 
              src={data.employee.avatar} 
              alt={data.employee.name} 
              className="user-avatar-img"
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Vaibhav+Singh&background=6366f1&color=fff'; }}
            />
            <div className="user-meta-info">
              <span className="meta-name">{data.employee.name}</span>
              <span className="meta-id">{data.employee.employeeId}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-icon-btn" title="Sign Out">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* DASHBOARD NAVIGATION TABS */}
      <nav className="dash-subnav">
        <div className="subnav-container">
          <button 
            className={`nav-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={18} />
            <span>Workspace Overview</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <Calendar size={18} />
            <span>Daily Attendance & Leaves</span>
            <span className="tab-chip-counter">{data.attendance.history.length}</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <CheckCircle2 size={18} />
            <span>Daily Tasks & Work Progress</span>
            <span className="tab-chip-counter">{taskStats.completed}/{taskStats.total}</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={18} />
            <span>Assigned Projects ({data.projects.length})</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <Users size={18} />
            <span>Manager & Squad ({data.teamMembers.length})</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="dash-content-container">
        
        {/* ======================================================== */}
        {/* TAB 1: WORKSPACE OVERVIEW */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="tab-pane animate-fade-in">
            {/* HERO EMPLOYEE GREETING CARD */}
            <div className="emp-hero-card">
              <div className="hero-left">
                <div className="hero-avatar-halo">
                  <img 
                    src={data.employee.avatar} 
                    alt={data.employee.name} 
                    className="hero-avatar"
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Vaibhav+Singh&background=6366f1&color=fff'; }}
                  />
                  <span className="hero-online-ring" />
                </div>
                <div className="hero-details">
                  <div className="hero-tag-row">
                    <span className="badge-emp-id">{data.employee.employeeId}</span>
                    <span className="badge-dept">{data.employee.department}</span>
                    <span className="badge-loc">📍 {data.employee.location}</span>
                  </div>
                  <h1 className="hero-greeting">
                    Welcome back, <span className="text-gradient-primary">{data.employee.name}</span>
                  </h1>
                  <p className="hero-role-desc">
                    {data.employee.designation} • Joined {data.employee.joiningDate}
                  </p>
                </div>
              </div>

              {/* Quick Today's Punch State */}
              <div className="hero-punch-panel">
                <div className="punch-status-indicator">
                  <span className="indicator-title">TODAY'S SHIFT</span>
                  <div className="indicator-row">
                    <span className={`indicator-bullet ${data.attendance.isClockedIn ? 'bullet-active' : 'bullet-inactive'}`} />
                    <span className="indicator-text">
                      {data.attendance.isClockedIn ? 'Currently Clocked In' : 'Shift Not Active'}
                    </span>
                  </div>
                  <div className="punch-time-stamps">
                    <span>Punch In: <strong>{data.attendance.todayClockIn || 'Pending'}</strong></span>
                    <span>Punch Out: <strong>{data.attendance.todayClockOut || '--:--'}</strong></span>
                  </div>
                </div>

                <div className="hero-action-buttons">
                  {!data.attendance.isClockedIn ? (
                    <button onClick={handleClockIn} className="btn-primary-glow">
                      <Play size={16} /> Punch In Now
                    </button>
                  ) : (
                    <button onClick={handleClockOut} className="btn-danger-outline">
                      <Square size={16} /> Complete Shift
                    </button>
                  )}
                  <button onClick={() => setShowLeaveModal(true)} className="btn-ghost">
                    <CalendarDays size={16} /> Request Leave
                  </button>
                </div>
              </div>
            </div>

            {/* 4 HIGH-LEVEL METRIC TILES */}
            <div className="metric-tiles-grid">
              <div className="metric-card">
                <div className="card-icon icon-emerald">
                  <Clock size={24} />
                </div>
                <div className="metric-value">{elapsedShiftTime.split(' ')[0]}</div>
                <div className="metric-label">Hours Logged Today</div>
                <div className="metric-subtext">Target: 8.0 hrs standard shift</div>
              </div>

              <div className="metric-card">
                <div className="card-icon icon-violet">
                  <CheckCircle2 size={24} />
                </div>
                <div className="metric-value">{taskStats.percentage}%</div>
                <div className="metric-label">Daily Task Velocity</div>
                <div className="metric-subtext">{taskStats.completed} of {taskStats.total} deliverables done</div>
              </div>

              <div className="metric-card">
                <div className="card-icon icon-cyan">
                  <FolderGit2 size={24} />
                </div>
                <div className="metric-value">{data.projects.length}</div>
                <div className="metric-label">Assigned Projects</div>
                <div className="metric-subtext">Active in current sprint cycle</div>
              </div>

              <div className="metric-card">
                <div className="card-icon icon-amber">
                  <Calendar size={24} />
                </div>
                <div className="metric-value">{data.attendance.leaves.available} Days</div>
                <div className="metric-label">Available Leave Balance</div>
                <div className="metric-subtext">12 annual PTO allowance</div>
              </div>
            </div>

            {/* TWO-COLUMN WORKSPACE OVERVIEW */}
            <div className="overview-split-layout">
              {/* Left: Today's Tasks & Project Highlights */}
              <div className="overview-col-left">
                {/* Daily Tasks Quick Widget */}
                <div className="glass-section-card">
                  <div className="section-card-header">
                    <div>
                      <h3 className="section-title">Today's Daily Tasks</h3>
                      <p className="section-sub">Deliverables assigned for this shift</p>
                    </div>
                    <div className="header-actions">
                      <button 
                        onClick={() => setShowAddTaskModal(true)} 
                        className="btn-sm-primary"
                      >
                        <Plus size={14} /> Add Task
                      </button>
                      <button 
                        onClick={() => setActiveTab('tasks')} 
                        className="btn-sm-ghost"
                      >
                        View All
                      </button>
                    </div>
                  </div>

                  {/* Task Progress Bar */}
                  <div className="daily-progress-container">
                    <div className="progress-labels">
                      <span>Daily Work Progress</span>
                      <span><strong>{taskStats.percentage}%</strong> ({taskStats.completed}/{taskStats.total})</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${taskStats.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="tasks-compact-list">
                    {data.tasks.slice(0, 4).map(task => (
                      <div 
                        key={task.id} 
                        className={`task-row ${task.status === 'Completed' ? 'task-done' : ''}`}
                        onClick={() => handleToggleTask(task.id)}
                      >
                        <button className="task-checkbox" aria-label="Toggle task completion">
                          {task.status === 'Completed' ? (
                            <CheckCircle2 size={20} color="#10B981" />
                          ) : (
                            <Circle size={20} color="#64748b" />
                          )}
                        </button>
                        <div className="task-info">
                          <span className="task-title-text">{task.title}</span>
                          <div className="task-tags">
                            <span className="tag-project">{task.project}</span>
                            <span className={`tag-priority priority-${task.priority.toLowerCase()}`}>
                              {task.priority}
                            </span>
                            <span className="tag-est">{task.estimatedHours}h est.</span>
                          </div>
                        </div>
                        <span className={`task-status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assigned Projects Snapshot */}
                <div className="glass-section-card">
                  <div className="section-card-header">
                    <div>
                      <h3 className="section-title">Assigned Projects Progress</h3>
                      <p className="section-sub">Your active contributions and milestones</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('projects')} 
                      className="btn-sm-ghost"
                    >
                      Project Details <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div className="projects-snapshot-grid">
                    {data.projects.map(proj => (
                      <div key={proj.id} className="project-snapshot-card">
                        <div className="proj-head">
                          <span className="proj-title">{proj.title}</span>
                          <span className="proj-pct">{proj.progress}%</span>
                        </div>
                        <span className="proj-role">{proj.role}</span>
                        <div className="proj-bar-track">
                          <div 
                            className="proj-bar-fill" 
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                        <div className="proj-foot">
                          <span>{proj.loggedHours}h logged</span>
                          <span className="deadline-tag">Due {proj.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Reporting Manager & Team Members Mini-Hub */}
              <div className="overview-col-right">
                {/* Reporting Manager Card */}
                <div className="glass-section-card manager-highlight-card">
                  <div className="section-card-header">
                    <span className="eyebrow-accent">REPORTING LINE</span>
                    <span className="online-indicator">🟢 {data.manager.status}</span>
                  </div>
                  <div className="manager-profile-row">
                    <img 
                      src={data.manager.avatar} 
                      alt={data.manager.name} 
                      className="manager-avatar"
                      onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=8b5cf6&color=fff'; }}
                    />
                    <div>
                      <h4 className="manager-name">{data.manager.name}</h4>
                      <p className="manager-title">{data.manager.role}</p>
                      <span className="manager-dept">{data.manager.department}</span>
                    </div>
                  </div>

                  <div className="manager-details-box">
                    <div className="detail-item">
                      <Mail size={14} />
                      <span>{data.manager.email}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={14} />
                      <span>Next 1:1 Sync: <strong>{data.manager.next1on1}</strong></span>
                    </div>
                  </div>

                  <div className="manager-action-row">
                    <button 
                      onClick={() => setShowManagerModal(true)} 
                      className="btn-manager-action"
                    >
                      <MessageSquare size={14} /> Direct Ping
                    </button>
                    <a 
                      href={`mailto:${data.manager.email}?subject=Sync%20Request%20from%20${encodeURIComponent(data.employee.name)}`}
                      className="btn-manager-action"
                    >
                      <Mail size={14} /> Email
                    </a>
                  </div>
                </div>

                {/* Team Members Snapshot */}
                <div className="glass-section-card">
                  <div className="section-card-header">
                    <div>
                      <h3 className="section-title">My Squad & Colleagues</h3>
                      <p className="section-sub">{data.teamMembers.length} active peers</p>
                    </div>
                    <button onClick={() => setActiveTab('team')} className="btn-sm-ghost">
                      Team Hub <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="team-compact-list">
                    {data.teamMembers.map(member => (
                      <div key={member.id} className="team-compact-row">
                        <div className="member-avatar-box">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="member-avatar-img"
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=fff`; }}
                          />
                          <span className={`status-dot dot-${member.status.toLowerCase().replace(' ', '-')}`} />
                        </div>
                        <div className="member-text">
                          <span className="member-name">{member.name}</span>
                          <span className="member-role">{member.role}</span>
                        </div>
                        <span className="member-project-chip">{member.currentProject.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EOD Standup Quick Card */}
                <div className="glass-section-card">
                  <div className="section-card-header">
                    <h3 className="section-title">EOD Standup</h3>
                    <span className="text-muted-xs">{data.standup.lastUpdated}</span>
                  </div>
                  <p className="standup-snippet">
                    "{data.standup.accomplishments.substring(0, 100)}..."
                  </p>
                  <button 
                    onClick={() => setActiveTab('tasks')} 
                    className="btn-standup-edit"
                  >
                    Edit Standup / Submit Daily Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DAILY ATTENDANCE & LEAVES */}
        {/* ======================================================== */}
        {activeTab === 'attendance' && (
          <div className="tab-pane animate-fade-in">
            {/* Attendance Punch Header Banner */}
            <div className="attendance-banner-card">
              <div className="banner-left">
                <span className="eyebrow-accent">DAILY ATTENDANCE LOG</span>
                <h2 className="banner-title">Shift Verification & Time Tracking</h2>
                <p className="banner-desc">
                  VP Group automated attendance system logs geolocation, active coding duration, and verifies compliance with company standard working hours.
                </p>

                <div className="shift-specs-row">
                  <div className="spec-item">
                    <span className="spec-label">Standard Shift</span>
                    <span className="spec-val">09:00 AM - 06:00 PM IST (8.0 Hours)</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Location Verification</span>
                    <span className="spec-val">VP Tech Hub (HQ / Approved Remote IP)</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Current Status</span>
                    <span className="spec-val text-success">
                      {data.attendance.isClockedIn ? '● Active Clock-In' : '○ Completed / Off-duty'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="banner-right">
                <div className="live-punch-box">
                  <span className="punch-box-label">LIVE SHIFT COUNTER</span>
                  <div className="punch-box-clock">{elapsedShiftTime}</div>
                  <span className="punch-box-today">
                    Today: {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>

                  <div className="punch-cta-group">
                    {!data.attendance.isClockedIn ? (
                      <button onClick={handleClockIn} className="btn-clock-in-large">
                        <Play size={18} /> Operational Clock In
                      </button>
                    ) : (
                      <button onClick={handleClockOut} className="btn-clock-out-large">
                        <Square size={18} /> Secure Clock Out
                      </button>
                    )}
                    <button onClick={() => setShowLeaveModal(true)} className="btn-leave-large">
                      <CalendarDays size={18} /> Apply for Leave
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance 4 Stats Cards */}
            <div className="metric-tiles-grid" style={{ marginBottom: '32px' }}>
              <div className="metric-card">
                <div className="card-icon icon-emerald"><CheckCircle2 size={24} /></div>
                <div className="metric-value">22 / 22</div>
                <div className="metric-label">Days Present (Month)</div>
                <div className="metric-subtext">100% On-Time Record</div>
              </div>

              <div className="metric-card">
                <div className="card-icon icon-violet"><Clock size={24} /></div>
                <div className="metric-value">176.4 hrs</div>
                <div className="metric-label">Productive Shift Hours</div>
                <div className="metric-subtext">Avg 8.8 hrs per working day</div>
              </div>

              <div className="metric-card">
                <div className="card-icon icon-cyan"><Award size={24} /></div>
                <div className="metric-value">98.5%</div>
                <div className="metric-label">Punctuality Score</div>
                <div className="metric-subtext">Zero unexcused tardiness</div>
              </div>

              <div className="metric-card">
                <div className="card-icon icon-amber"><CalendarDays size={24} /></div>
                <div className="metric-value">{data.attendance.leaves.available} Days</div>
                <div className="metric-label">Remaining Leaves</div>
                <div className="metric-subtext">{data.attendance.leaves.applied} applications processed</div>
              </div>
            </div>

            {/* Attendance History Table & Leave Log */}
            <div className="overview-split-layout">
              {/* Left: Detailed Records Table */}
              <div className="overview-col-left">
                <div className="glass-section-card">
                  <div className="section-card-header">
                    <div>
                      <h3 className="section-title">Past Attendance Records (Last 30 Days)</h3>
                      <p className="section-sub">Verified punch timestamps and working hours</p>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="vp-custom-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Punch In</th>
                          <th>Punch Out</th>
                          <th>Hours</th>
                          <th>Location</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.attendance.history.map((rec, i) => (
                          <tr key={i}>
                            <td className="font-bold">{rec.date}</td>
                            <td>{rec.clockIn}</td>
                            <td>{rec.clockOut}</td>
                            <td>{rec.hours > 0 ? `${rec.hours} hrs` : '--'}</td>
                            <td className="text-muted-xs">{rec.location}</td>
                            <td>
                              <span className="badge-status-present">
                                {rec.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right: Leave Requests & Policies */}
              <div className="overview-col-right">
                <div className="glass-section-card">
                  <div className="section-card-header">
                    <div>
                      <h3 className="section-title">Leave History & PTO</h3>
                      <p className="section-sub">Approved and pending absence requests</p>
                    </div>
                    <button 
                      onClick={() => setShowLeaveModal(true)} 
                      className="btn-sm-primary"
                    >
                      <Plus size={14} /> New Request
                    </button>
                  </div>

                  <div className="leave-records-list">
                    {data.attendance.leaves.records.map((lv, i) => (
                      <div key={lv.id || i} className="leave-record-card">
                        <div className="leave-top">
                          <span className="leave-type">{lv.type}</span>
                          <span className={`badge-leave-${lv.status.toLowerCase()}`}>
                            {lv.status}
                          </span>
                        </div>
                        <div className="leave-dates">
                          {lv.startDate} {lv.startDate !== lv.endDate ? `→ ${lv.endDate}` : ''}
                        </div>
                        <p className="leave-reason">"{lv.reason}"</p>
                      </div>
                    ))}
                  </div>

                  <div className="leave-quota-summary">
                    <h5 className="quota-title">Annual Leave Allowances</h5>
                    <div className="quota-bar-row">
                      <span>Casual / Vacation (8 Remaining)</span>
                      <span>8 / 12</span>
                    </div>
                    <div className="quota-bar-row">
                      <span>Sick / Medical (5 Remaining)</span>
                      <span>5 / 6</span>
                    </div>
                    <div className="quota-bar-row">
                      <span>Remote / WFH (4 Remaining)</span>
                      <span>4 / 6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: DAILY TASKS & WORK PROGRESS */}
        {/* ======================================================== */}
        {activeTab === 'tasks' && (
          <div className="tab-pane animate-fade-in">
            {/* Header with filters and Add Task */}
            <div className="tasks-action-bar">
              <div>
                <h2 className="tab-heading">Daily Tasks & Sprint Velocity</h2>
                <p className="tab-subheading">
                  Track individual deliverables, update progress, and log daily accomplishments.
                </p>
              </div>

              <div className="tasks-controls">
                <div className="filter-pill-group">
                  {['All', 'Todo', 'In Progress', 'Completed'].map(f => (
                    <button
                      key={f}
                      className={`filter-btn ${taskFilter === f ? 'active' : ''}`}
                      onClick={() => setTaskFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setShowAddTaskModal(true)} 
                  className="btn-primary-glow"
                >
                  <Plus size={16} /> Add Task
                </button>
              </div>
            </div>

            {/* Task Velocity Card */}
            <div className="velocity-overview-card">
              <div className="velocity-stats">
                <div className="v-stat">
                  <span className="v-num text-success">{taskStats.completed}</span>
                  <span className="v-label">Completed Deliverables</span>
                </div>
                <div className="v-stat">
                  <span className="v-num text-cyan">{taskStats.inProgress}</span>
                  <span className="v-label">In Progress</span>
                </div>
                <div className="v-stat">
                  <span className="v-num text-amber">{taskStats.todo}</span>
                  <span className="v-label">Pending In Queue</span>
                </div>
                <div className="v-stat">
                  <span className="v-num text-primary">{taskStats.percentage}%</span>
                  <span className="v-label">Overall Completion</span>
                </div>
              </div>

              <div className="velocity-bar-box">
                <div className="progress-labels">
                  <span>Shift Sprint Progress</span>
                  <span>{taskStats.percentage}% Target Reached</span>
                </div>
                <div className="progress-track" style={{ height: '12px' }}>
                  <div 
                    className="progress-fill" 
                    style={{ width: `${taskStats.percentage}%`, height: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Tasks Board & EOD Standup */}
            <div className="overview-split-layout">
              {/* Task Items List */}
              <div className="overview-col-left">
                <div className="tasks-detailed-list">
                  {filteredTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`task-detailed-card ${task.status === 'Completed' ? 'is-completed' : ''}`}
                    >
                      <div className="task-check-column">
                        <button 
                          className="task-circle-btn" 
                          onClick={() => handleToggleTask(task.id)}
                          title="Click to toggle complete / in-progress"
                        >
                          {task.status === 'Completed' ? (
                            <CheckCircle2 size={24} color="#10B981" />
                          ) : (
                            <Circle size={24} color="#94a3b8" />
                          )}
                        </button>
                      </div>

                      <div className="task-body-column">
                        <div className="task-header-row">
                          <h4 className="task-card-title">{task.title}</h4>
                          <span className={`badge-priority priority-${task.priority.toLowerCase()}`}>
                            {task.priority} Priority
                          </span>
                        </div>

                        {task.description && (
                          <p className="task-card-desc">{task.description}</p>
                        )}

                        <div className="task-card-footer">
                          <div className="footer-left">
                            <span className="badge-project-attach">
                              <Briefcase size={12} /> {task.project}
                            </span>
                            <span className="badge-time-est">
                              <Clock size={12} /> {task.loggedHours}/{task.estimatedHours} hrs logged
                            </span>
                          </div>

                          <div className="footer-right">
                            <span className={`task-badge-status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredTasks.length === 0 && (
                    <div className="empty-tasks-card">
                      <CheckCircle2 size={40} color="#10B981" />
                      <h4>No tasks in this category</h4>
                      <p>You're all caught up or no tasks match the "{taskFilter}" filter.</p>
                      <button 
                        onClick={() => setShowAddTaskModal(true)} 
                        className="btn-sm-primary"
                      >
                        Create New Task
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* EOD Standup Form */}
              <div className="overview-col-right">
                <div className="glass-section-card standup-card">
                  <div className="section-card-header">
                    <div>
                      <h3 className="section-title">End-of-Day (EOD) Standup</h3>
                      <p className="section-sub">Summarize today's deliverables for your manager</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveStandup} className="standup-form">
                    <div className="input-field-group">
                      <label>1. What did you accomplish today?</label>
                      <textarea
                        rows={3}
                        value={standupAccomplishments}
                        onChange={(e) => setStandupAccomplishments(e.target.value)}
                        placeholder="e.g., Integrated JWT refresh tokens, fixed WebGL memory leak, reviewed PR #104."
                        required
                      />
                    </div>

                    <div className="input-field-group">
                      <label>2. What will you work on tomorrow?</label>
                      <textarea
                        rows={3}
                        value={standupPlanned}
                        onChange={(e) => setStandupPlanned(e.target.value)}
                        placeholder="e.g., Finalize WebRTC media pipeline, deploy staging build."
                        required
                      />
                    </div>

                    <div className="input-field-group">
                      <label>3. Any blockers or dependencies?</label>
                      <input
                        type="text"
                        value={standupBlockers}
                        onChange={(e) => setStandupBlockers(e.target.value)}
                        placeholder="e.g., None, or waiting on AWS KMS policy review."
                      />
                    </div>

                    <button type="submit" className="btn-submit-standup">
                      <Send size={16} /> Submit Daily Standup to Manager
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: ASSIGNED PROJECTS & TRACKING */}
        {/* ======================================================== */}
        {activeTab === 'projects' && (
          <div className="tab-pane animate-fade-in">
            <div className="tasks-action-bar">
              <div>
                <h2 className="tab-heading">Assigned Projects & Work Tracking</h2>
                <p className="tab-subheading">
                  Track every project you are attached to, log hours, and update delivery milestones.
                </p>
              </div>

              <div className="tasks-controls">
                <div className="filter-pill-group">
                  {['All', 'Active', 'In Review'].map(f => (
                    <button
                      key={f}
                      className={`filter-btn ${projectFilter === f ? 'active' : ''}`}
                      onClick={() => setProjectFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-full-grid">
              {filteredProjects.map(proj => (
                <div key={proj.id} className="project-detail-card">
                  <div className="proj-card-top">
                    <div className="proj-badge-cluster">
                      <span className="badge-client">{proj.client}</span>
                      <span className={`badge-proj-status status-${proj.status.toLowerCase().replace(' ', '-')}`}>
                        {proj.status}
                      </span>
                    </div>
                    <span className="badge-proj-priority">{proj.priority} Priority</span>
                  </div>

                  <h3 className="proj-card-heading">{proj.title}</h3>
                  <p className="proj-card-role">
                    <strong>Your Assigned Role:</strong> {proj.role}
                  </p>

                  {/* Progress Gauge */}
                  <div className="proj-progress-wrapper">
                    <div className="progress-labels">
                      <span>Milestone Progress</span>
                      <span className="progress-number"><strong>{proj.progress}%</strong> Completed</span>
                    </div>
                    <div className="progress-track" style={{ height: '10px' }}>
                      <div 
                        className="progress-fill" 
                        style={{ width: `${proj.progress}%`, height: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Assigned Modules / Work Deliverables */}
                  <div className="proj-modules-box">
                    <span className="modules-header">Assigned Modules for You:</span>
                    <ul className="modules-list">
                      {proj.assignedModules.map((mod, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={14} color="#10B981" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recent Work Update */}
                  {proj.recentUpdate && (
                    <div className="proj-recent-log">
                      <span className="log-title">Recent Delivery Note:</span>
                      <p className="log-text">"{proj.recentUpdate}"</p>
                    </div>
                  )}

                  <div className="proj-card-bottom">
                    <div className="proj-meta-stats">
                      <div className="p-stat">
                        <span className="stat-label">Logged Hours</span>
                        <span className="stat-val">{proj.loggedHours} hrs</span>
                      </div>
                      <div className="p-stat">
                        <span className="stat-label">Deadline</span>
                        <span className="stat-val">{proj.deadline}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setShowProjectModal(proj)} 
                      className="btn-update-proj"
                    >
                      <RefreshCw size={14} /> Update Progress & Log Hours
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: MANAGER & SQUAD DIRECTORY */}
        {/* ======================================================== */}
        {activeTab === 'team' && (
          <div className="tab-pane animate-fade-in">
            <div className="tasks-action-bar">
              <div>
                <h2 className="tab-heading">Engineering Leadership & Squad Directory</h2>
                <p className="tab-subheading">
                  Collaborate directly with your reporting manager and cross-functional teammates.
                </p>
              </div>
            </div>

            {/* FEATURED REPORTING MANAGER HERO CARD */}
            <div className="manager-large-hero">
              <div className="manager-large-avatar-wrap">
                <img 
                  src={data.manager.avatar} 
                  alt={data.manager.name} 
                  className="manager-large-avatar"
                  onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=8b5cf6&color=fff'; }}
                />
                <span className="status-badge-hero">🟢 ACTIVE ON DUTY</span>
              </div>

              <div className="manager-large-info">
                <div className="badge-row">
                  <span className="badge-reporting">DIRECT REPORTING MANAGER</span>
                  <span className="badge-dept-lead">LEADERSHIP CORE</span>
                </div>
                <h3 className="manager-large-name">{data.manager.name}</h3>
                <p className="manager-large-role">{data.manager.role} • {data.manager.department}</p>
                <p className="manager-large-desc">
                  Oversees architectural roadmap, sprint velocity, attendance reviews, and engineer 1:1 mentorship.
                </p>

                <div className="manager-contacts-grid">
                  <div className="m-contact-item">
                    <Mail size={16} />
                    <span>{data.manager.email}</span>
                  </div>
                  <div className="m-contact-item">
                    <PhoneCall size={16} />
                    <span>{data.manager.phone}</span>
                  </div>
                  <div className="m-contact-item">
                    <Building2 size={16} />
                    <span>{data.manager.office}</span>
                  </div>
                  <div className="m-contact-item">
                    <Calendar size={16} />
                    <span>Next Sync: <strong>{data.manager.next1on1}</strong></span>
                  </div>
                </div>

                <div className="manager-action-cta-row">
                  <button 
                    onClick={() => setShowManagerModal(true)} 
                    className="btn-primary-glow"
                  >
                    <MessageSquare size={16} /> Ping Manager Now
                  </button>
                  <a 
                    href={`mailto:${data.manager.email}?subject=1:1%20Meeting%20Sync%20Request`} 
                    className="btn-ghost"
                  >
                    <Calendar size={16} /> Request 1:1 Calendar Slot
                  </a>
                </div>
              </div>
            </div>

            {/* TEAM SQUAD MEMBERS CARDS */}
            <h3 className="section-title-margin">Engineering Squad Members ({data.teamMembers.length})</h3>
            
            <div className="team-squad-grid">
              {data.teamMembers.map(member => (
                <div key={member.id} className="squad-member-card">
                  <div className="squad-card-top">
                    <div className="squad-avatar-box">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="squad-avatar"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=fff`; }}
                      />
                      <span className={`status-indicator-dot dot-${member.status.toLowerCase().replace(' ', '-')}`} />
                    </div>
                    <span className={`badge-member-status status-${member.status.toLowerCase().replace(' ', '-')}`}>
                      {member.status}
                    </span>
                  </div>

                  <h4 className="squad-member-name">{member.name}</h4>
                  <p className="squad-member-role">{member.role}</p>

                  <div className="squad-project-pill">
                    <Briefcase size={12} />
                    <span>Project: <strong>{member.currentProject}</strong></span>
                  </div>

                  <div className="squad-task-note">
                    <span className="note-label">Currently Working On:</span>
                    <span className="note-text">{member.activeTask}</span>
                  </div>

                  <div className="squad-card-footer">
                    <a 
                      href={`mailto:${member.email}?subject=Collaboration%20from%20${encodeURIComponent(data.employee.name)}`}
                      className="btn-squad-contact"
                    >
                      <Mail size={14} /> Send Note
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* MODAL: ADD NEW DAILY TASK */}
      {/* ======================================================== */}
      {showAddTaskModal && (
        <div className="modal-backdrop" onClick={() => setShowAddTaskModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Daily Task</h3>
              <button onClick={() => setShowAddTaskModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="modal-form">
              <div className="input-field-group">
                <label>Task Title / Deliverable</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Implement OAuth callback handler"
                  required
                  autoFocus
                />
              </div>

              <div className="input-field-group">
                <label>Associated Project</label>
                <select 
                  value={newTaskProject} 
                  onChange={(e) => setNewTaskProject(e.target.value)}
                >
                  {data.projects.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                  <option value="Internal Core / Infrastructure">Internal Core / Infrastructure</option>
                </select>
              </div>

              <div className="modal-two-col">
                <div className="input-field-group">
                  <label>Priority</label>
                  <select 
                    value={newTaskPriority} 
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="input-field-group">
                  <label>Estimated Hours</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    max="12"
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowAddTaskModal(false)} 
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-glow">
                  Add to My Daily Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: APPLY FOR LEAVE */}
      {/* ======================================================== */}
      {showLeaveModal && (
        <div className="modal-backdrop" onClick={() => setShowLeaveModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Request Leave / PTO</h3>
              <button onClick={() => setShowLeaveModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="modal-form">
              <div className="input-field-group">
                <label>Leave Category</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                  <option value="Casual Leave">Casual Leave (Vacation / Personal)</option>
                  <option value="Medical / Sick Leave">Medical / Sick Leave</option>
                  <option value="Remote / WFH Day">Remote / WFH Exception Day</option>
                  <option value="Emergency PTO">Emergency Leave</option>
                </select>
              </div>

              <div className="modal-two-col">
                <div className="input-field-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={leaveStart} 
                    onChange={(e) => setLeaveStart(e.target.value)} 
                    required 
                  />
                </div>

                <div className="input-field-group">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    value={leaveEnd} 
                    onChange={(e) => setLeaveEnd(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="input-field-group">
                <label>Reason & Coverage Handover Plan</label>
                <textarea
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Detail the reason and colleague covering your tasks..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowLeaveModal(false)} 
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-glow">
                  Submit Leave for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: UPDATE PROJECT PROGRESS */}
      {/* ======================================================== */}
      {showProjectModal && (
        <div className="modal-backdrop" onClick={() => setShowProjectModal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Update Project Work</h3>
                <span className="text-muted-xs">{showProjectModal.title}</span>
              </div>
              <button onClick={() => setShowProjectModal(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              handleUpdateProjectProgress(
                showProjectModal.id,
                form.progress.value,
                form.hours.value,
                form.note.value
              );
            }} className="modal-form">
              <div className="input-field-group">
                <label>Milestone Completion Percentage (0 - 100%)</label>
                <div className="range-with-val">
                  <input 
                    type="range" 
                    name="progress"
                    min="0" 
                    max="100" 
                    defaultValue={showProjectModal.progress}
                    onChange={(e) => {
                      document.getElementById('range-val-disp').innerText = e.target.value + '%';
                    }}
                  />
                  <span id="range-val-disp" className="range-disp-text">
                    {showProjectModal.progress}%
                  </span>
                </div>
              </div>

              <div className="input-field-group">
                <label>Log Additional Work Hours on this Project</label>
                <input 
                  type="number" 
                  name="hours"
                  min="0" 
                  step="0.5" 
                  defaultValue="2" 
                  required 
                />
              </div>

              <div className="input-field-group">
                <label>Deliverable Update / Git Commit Note</label>
                <textarea 
                  name="note"
                  rows={2} 
                  defaultValue={showProjectModal.recentUpdate || ''} 
                  placeholder="Summarize recent progress, commits, or blockers resolved..."
                  required 
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowProjectModal(null)} className="btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-glow">
                  Save Progress & Log Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DIRECT PING TO MANAGER */}
      {/* ======================================================== */}
      {showManagerModal && (
        <div className="modal-backdrop" onClick={() => setShowManagerModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Direct Ping to {data.manager.name}</h3>
                <span className="text-muted-xs">{data.manager.role}</span>
              </div>
              <button onClick={() => setShowManagerModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSendMessageToManager} className="modal-form">
              <div className="input-field-group">
                <label>Direct Message / Priority Ping</label>
                <textarea
                  rows={4}
                  value={managerMessage}
                  onChange={(e) => setManagerMessage(e.target.value)}
                  placeholder="Type your message, urgent request, or blocker for Sarah..."
                  required
                  autoFocus
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowManagerModal(false)} className="btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-glow">
                  <Send size={15} /> Send Direct Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EMBEDDED STYLES FOR STATE-OF-THE-ART DARK UI */}
      {/* ======================================================== */}
      <style>{`
        .emp-dash-root {
          min-height: 100vh;
          background: var(--color-canvas);
          color: var(--color-ink);
          font-family: 'Outfit', 'Inter', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          transition: background 0.3s ease, color 0.3s ease;
        }

        /* Toast */
        .toast-notification {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .toast-success {
          background: #064e3b;
          border: 1px solid #10b981;
          color: #a7f3d0;
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Top Header */
        .dash-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left, .header-center, .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-logo-group {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .header-brand-labels {
          display: flex;
          flex-direction: column;
        }
        .brand-primary {
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: -0.5px;
          color: #ffffff;
        }
        .brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #818cf8;
        }

        .header-status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          font-size: 0.7rem;
          font-weight: 800;
          color: #34d399;
          letter-spacing: 1px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .live-clock-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          font-size: 0.85rem;
        }
        .clock-icon { color: #818cf8; }
        .clock-time { font-weight: 800; color: #fff; font-family: monospace; font-size: 0.95rem; }
        .clock-date { color: #94a3b8; font-size: 0.75rem; }

        .shift-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .status-active {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
        }
        .status-offline {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #f87171;
        }
        .shift-timer {
          font-family: monospace;
          background: rgba(0, 0, 0, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .punch-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .punch-in-btn {
          background: #10b981;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .punch-in-btn:hover { background: #059669; }
        .punch-out-btn {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .punch-out-btn:hover { background: rgba(239, 68, 68, 0.25); }

        .user-profile-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 12px 4px 4px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .user-profile-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(99, 102, 241, 0.4);
        }
        .user-avatar-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #6366f1;
        }
        .user-meta-info {
          display: flex;
          flex-direction: column;
        }
        .meta-name { font-size: 0.82rem; font-weight: 700; color: #fff; }
        .meta-id { font-size: 0.65rem; color: #94a3b8; font-weight: 600; }

        .logout-icon-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-icon-btn:hover { color: #f87171; background: rgba(239, 68, 68, 0.1); }

        /* Subnav Tabs */
        .dash-subnav {
          background: #090d16;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0 40px;
          position: sticky;
          top: 69px;
          z-index: 90;
        }
        .subnav-container {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .nav-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #94a3b8;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .nav-tab-btn:hover {
          color: #ffffff;
        }
        .nav-tab-btn.active {
          color: #ffffff;
          border-bottom-color: #6366f1;
          background: rgba(99, 102, 241, 0.08);
        }
        .tab-chip-counter {
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 10px;
          font-size: 0.72rem;
          color: #cbd5e1;
        }
        .nav-tab-btn.active .tab-chip-counter {
          background: #6366f1;
          color: #fff;
        }

        /* Content Container */
        .dash-content-container {
          flex: 1;
          padding: 32px 40px 60px;
          max-width: 1540px;
          width: 100%;
          margin: 0 auto;
        }

        /* Hero Employee Card */
        .emp-hero-card {
          background: radial-gradient(circle at top left, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.8) 60%);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 24px;
          padding: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          gap: 24px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
        }

        .hero-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .hero-avatar-halo {
          position: relative;
        }
        .hero-avatar {
          width: 88px;
          height: 88px;
          border-radius: 20px;
          object-fit: cover;
          border: 3px solid #6366f1;
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.35);
        }
        .hero-online-ring {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          border: 3px solid var(--color-canvas);
        }

        .hero-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }
        .badge-emp-id {
          background: #6366f1;
          color: white;
          font-weight: 800;
          font-size: 0.7rem;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .badge-dept {
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 6px;
        }
        .badge-loc {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 6px;
        }

        .hero-greeting {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 6px;
        }
        .text-gradient-primary {
          background: linear-gradient(135deg, #fff 0%, #818cf8 60%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-role-desc {
          color: #94a3b8;
          font-size: 0.92rem;
        }

        .hero-punch-panel {
          background: rgba(2, 6, 23, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 320px;
        }
        .indicator-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #64748b;
        }
        .indicator-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 700;
          margin-top: 2px;
        }
        .indicator-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .bullet-active { background: #10b981; box-shadow: 0 0 8px #10b981; }
        .bullet-inactive { background: #ef4444; }

        .punch-time-stamps {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #94a3b8;
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .punch-time-stamps strong { color: #fff; }

        .hero-action-buttons {
          display: flex;
          gap: 8px;
        }

        /* Buttons */
        .btn-primary-glow {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.4);
          transition: all 0.2s;
        }
        .btn-primary-glow:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 25px -4px rgba(99, 102, 241, 0.6);
        }

        .btn-danger-outline {
          background: rgba(239, 68, 68, 0.12);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-danger-outline:hover {
          background: rgba(239, 68, 68, 0.22);
        }

        .btn-ghost {
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .btn-sm-primary {
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-sm-ghost {
          background: none;
          border: none;
          color: #818cf8;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-sm-ghost:hover { text-decoration: underline; }

        /* Metric Tiles Grid */
        .metric-tiles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .metric-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 24px;
          position: relative;
          transition: all 0.25s ease;
        }
        .metric-card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5);
        }

        .card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .icon-emerald { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .icon-violet { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }
        .icon-cyan { background: rgba(6, 182, 212, 0.15); color: #06b6d4; }
        .icon-amber { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }

        .metric-value {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -1px;
          line-height: 1.1;
          color: #ffffff;
        }
        .metric-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #cbd5e1;
          margin-top: 6px;
        }
        .metric-subtext {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 4px;
        }

        /* Split Layout */
        .overview-split-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 28px;
        }
        .overview-col-left, .overview-col-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .glass-section-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 26px;
        }
        .section-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 1.18rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .section-sub {
          font-size: 0.8rem;
          color: #94a3b8;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Progress track */
        .daily-progress-container {
          background: rgba(2, 6, 23, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 14px 18px;
          border-radius: 14px;
          margin-bottom: 20px;
        }
        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 8px;
        }
        .progress-labels strong { color: #818cf8; }
        .progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #10b981);
          border-radius: 10px;
          transition: width 0.4s ease;
        }

        /* Task rows */
        .tasks-compact-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .task-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: rgba(2, 6, 23, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .task-row:hover {
          background: rgba(2, 6, 23, 0.7);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .task-row.task-done {
          opacity: 0.65;
        }
        .task-row.task-done .task-title-text {
          text-decoration: line-through;
          color: #94a3b8;
        }
        .task-checkbox {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .task-info {
          flex: 1;
          min-width: 0;
        }
        .task-title-text {
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          display: block;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .task-tags {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .tag-project {
          font-size: 0.68rem;
          background: rgba(99, 102, 241, 0.12);
          color: #a5b4fc;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .tag-priority {
          font-size: 0.68rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }
        .priority-high { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        .priority-medium { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .priority-low { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; }
        .tag-est {
          font-size: 0.68rem;
          color: #64748b;
        }
        .task-status-pill {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .status-completed { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .status-in-progress { background: rgba(99, 102, 241, 0.15); color: #818cf8; }
        .status-todo { background: rgba(255, 255, 255, 0.05); color: #94a3b8; }

        /* Projects Snapshot */
        .projects-snapshot-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .project-snapshot-card {
          background: rgba(2, 6, 23, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 16px;
        }
        .proj-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .proj-title { font-size: 0.92rem; font-weight: 800; color: #fff; }
        .proj-pct { font-size: 0.85rem; font-weight: 800; color: #818cf8; }
        .proj-role { font-size: 0.75rem; color: #94a3b8; display: block; margin-bottom: 10px; }
        .proj-bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .proj-bar-fill {
          height: 100%;
          background: #6366f1;
          border-radius: 4px;
        }
        .proj-foot {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: #64748b;
        }
        .deadline-tag { color: #f59e0b; font-weight: 600; }

        /* Manager Card Right */
        .manager-highlight-card {
          border-color: rgba(139, 92, 246, 0.3);
          background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.12) 0%, rgba(15, 23, 42, 0.7) 70%);
        }
        .eyebrow-accent {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: #a78bfa;
        }
        .online-indicator {
          font-size: 0.72rem;
          font-weight: 700;
          color: #34d399;
        }
        .manager-profile-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .manager-avatar {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid #8b5cf6;
        }
        .manager-name { font-size: 1.1rem; font-weight: 800; color: #fff; }
        .manager-title { font-size: 0.8rem; color: #cbd5e1; font-weight: 600; }
        .manager-dept { font-size: 0.72rem; color: #94a3b8; }

        .manager-details-box {
          background: rgba(2, 6, 23, 0.5);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #cbd5e1;
        }

        .manager-action-row {
          display: flex;
          gap: 8px;
        }
        .btn-manager-action {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.35);
          color: #c4b5fd;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-manager-action:hover {
          background: rgba(139, 92, 246, 0.28);
          color: #fff;
        }

        /* Team Compact List */
        .team-compact-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .team-compact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(2, 6, 23, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .member-avatar-box {
          position: relative;
        }
        .member-avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          object-fit: cover;
        }
        .status-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--color-canvas);
        }
        .dot-online { background: #10b981; }
        .dot-in-review { background: #f59e0b; }
        .dot-meeting { background: #38bdf8; }
        .dot-away { background: #94a3b8; }

        .member-text {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .member-name { font-size: 0.85rem; font-weight: 700; color: #fff; }
        .member-role { font-size: 0.7rem; color: #94a3b8; }
        .member-project-chip {
          font-size: 0.68rem;
          background: rgba(255, 255, 255, 0.06);
          color: #818cf8;
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        /* Standup Snippet */
        .standup-snippet {
          font-size: 0.85rem;
          color: #cbd5e1;
          font-style: italic;
          background: rgba(2, 6, 23, 0.4);
          padding: 12px 14px;
          border-radius: 10px;
          border-left: 3px solid #6366f1;
          margin-bottom: 12px;
        }
        .btn-standup-edit {
          width: 100%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #a5b4fc;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* ATTENDANCE TAB STYLES */
        .attendance-banner-card {
          background: radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.18) 0%, rgba(15, 23, 42, 0.8) 70%);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 24px;
          padding: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          margin-bottom: 32px;
        }
        .banner-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
          margin: 6px 0 10px;
        }
        .banner-desc {
          font-size: 0.92rem;
          color: #94a3b8;
          max-width: 600px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .shift-specs-row {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .spec-item {
          display: flex;
          flex-direction: column;
        }
        .spec-label { font-size: 0.68rem; font-weight: 700; color: #64748b; letter-spacing: 1px; }
        .spec-val { font-size: 0.85rem; font-weight: 700; color: #e2e8f0; }

        .live-punch-box {
          background: rgba(2, 6, 23, 0.8);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          min-width: 320px;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.15);
        }
        .punch-box-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #34d399;
        }
        .punch-box-clock {
          font-size: 1.85rem;
          font-family: monospace;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0;
        }
        .punch-box-today {
          font-size: 0.75rem;
          color: #94a3b8;
          display: block;
          margin-bottom: 18px;
        }
        .punch-cta-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .btn-clock-in-large {
          background: #10b981;
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.35);
          transition: all 0.2s;
        }
        .btn-clock-in-large:hover { background: #059669; }
        .btn-clock-out-large {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid #ef4444;
          color: #fca5a5;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-leave-large {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          padding: 10px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Attendance Table */
        .table-responsive {
          overflow-x: auto;
        }
        .vp-custom-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          text-align: left;
        }
        .vp-custom-table th {
          padding: 12px 14px;
          color: #94a3b8;
          font-weight: 700;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.75rem;
          letter-spacing: 0.5px;
        }
        .vp-custom-table td {
          padding: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          color: #e2e8f0;
        }
        .badge-status-present {
          background: rgba(16, 185, 129, 0.12);
          color: #34d399;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        /* Leave records */
        .leave-records-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .leave-record-card {
          background: rgba(2, 6, 23, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 14px;
        }
        .leave-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .leave-type { font-weight: 700; font-size: 0.88rem; color: #fff; }
        .badge-leave-approved {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .badge-leave-pending {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .leave-dates { font-size: 0.75rem; color: #818cf8; font-weight: 600; margin-bottom: 4px; }
        .leave-reason { font-size: 0.78rem; color: #94a3b8; }

        .leave-quota-summary {
          background: rgba(2, 6, 23, 0.4);
          border-radius: 12px;
          padding: 16px;
        }
        .quota-title { font-size: 0.82rem; font-weight: 700; color: #cbd5e1; margin-bottom: 12px; }
        .quota-bar-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94a3b8;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        /* TASKS TAB STYLES */
        .tasks-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .tab-heading {
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .tab-subheading {
          font-size: 0.88rem;
          color: #94a3b8;
        }
        .tasks-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .filter-pill-group {
          display: flex;
          background: rgba(2, 6, 23, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 3px;
        }
        .filter-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn.active {
          background: #6366f1;
          color: white;
        }

        .velocity-overview-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 28px;
        }
        .velocity-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 18px;
        }
        .v-stat {
          display: flex;
          flex-direction: column;
        }
        .v-num { font-size: 1.8rem; font-weight: 900; }
        .v-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

        .tasks-detailed-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .task-detailed-card {
          display: flex;
          gap: 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
        }
        .task-detailed-card:hover {
          border-color: rgba(99, 102, 241, 0.35);
          background: rgba(15, 23, 42, 0.8);
        }
        .task-detailed-card.is-completed {
          opacity: 0.6;
        }
        .task-detailed-card.is-completed .task-card-title {
          text-decoration: line-through;
          color: #94a3b8;
        }
        .task-circle-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0 0;
        }
        .task-body-column {
          flex: 1;
        }
        .task-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .task-card-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
        }
        .badge-priority {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .task-card-desc {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.45;
          margin-bottom: 14px;
        }
        .task-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-left {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .badge-project-attach {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(99, 102, 241, 0.1);
          color: #a5b4fc;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .badge-time-est {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: #64748b;
        }

        .empty-tasks-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        /* Standup Card Form */
        .standup-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .input-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .input-field-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #cbd5e1;
        }
        .input-field-group input, 
        .input-field-group textarea,
        .input-field-group select {
          background: rgba(2, 6, 23, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 10px 14px;
          color: #ffffff;
          font-size: 0.88rem;
          font-family: inherit;
        }
        .input-field-group input:focus, 
        .input-field-group textarea:focus,
        .input-field-group select:focus {
          outline: none;
          border-color: #6366f1;
        }
        .btn-submit-standup {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 12px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* PROJECTS TAB STYLES */
        .projects-full-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .project-detail-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }
        .project-detail-card:hover {
          border-color: rgba(99, 102, 241, 0.35);
          transform: translateY(-2px);
        }
        .proj-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .proj-badge-cluster {
          display: flex;
          gap: 8px;
        }
        .badge-client {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .badge-proj-status {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .badge-proj-priority {
          font-size: 0.72rem;
          font-weight: 800;
          color: #f59e0b;
        }

        .proj-card-heading {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .proj-card-role {
          font-size: 0.85rem;
          color: #a5b4fc;
          margin-bottom: 16px;
        }
        .proj-card-role strong { color: #fff; }

        .proj-progress-wrapper {
          margin-bottom: 18px;
        }
        .progress-number {
          color: #38bdf8;
        }

        .proj-modules-box {
          background: rgba(2, 6, 23, 0.5);
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 14px;
        }
        .modules-header {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #64748b;
          display: block;
          margin-bottom: 8px;
        }
        .modules-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modules-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #e2e8f0;
        }

        .proj-recent-log {
          background: rgba(99, 102, 241, 0.08);
          border-left: 3px solid #6366f1;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .log-title {
          font-size: 0.68rem;
          font-weight: 800;
          color: #818cf8;
          display: block;
          margin-bottom: 2px;
        }
        .log-text {
          font-size: 0.8rem;
          color: #cbd5e1;
          font-style: italic;
        }

        .proj-card-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .proj-meta-stats {
          display: flex;
          gap: 16px;
        }
        .p-stat {
          display: flex;
          flex-direction: column;
        }
        .stat-label { font-size: 0.65rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
        .stat-val { font-size: 0.85rem; font-weight: 800; color: #fff; }

        .btn-update-proj {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.35);
          color: #a5b4fc;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .btn-update-proj:hover {
          background: #6366f1;
          color: #fff;
        }

        /* TEAM TAB STYLES */
        .manager-large-hero {
          background: radial-gradient(circle at top left, rgba(139, 92, 246, 0.2) 0%, rgba(15, 23, 42, 0.8) 60%);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 24px;
          padding: 36px;
          display: flex;
          gap: 32px;
          margin-bottom: 40px;
        }
        .manager-large-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .manager-large-avatar {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          object-fit: cover;
          border: 3px solid #8b5cf6;
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
        }
        .status-badge-hero {
          font-size: 0.68rem;
          font-weight: 800;
          color: #34d399;
          background: rgba(16, 185, 129, 0.15);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .manager-large-info {
          flex: 1;
        }
        .badge-row {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        .badge-reporting {
          background: #8b5cf6;
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .badge-dept-lead {
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .manager-large-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
        }
        .manager-large-role {
          font-size: 0.95rem;
          color: #c4b5fd;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .manager-large-desc {
          font-size: 0.88rem;
          color: #94a3b8;
          max-width: 650px;
          margin-bottom: 20px;
        }

        .manager-contacts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          background: rgba(2, 6, 23, 0.5);
          padding: 14px 20px;
          border-radius: 14px;
          margin-bottom: 24px;
          max-width: 650px;
        }
        .m-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: #cbd5e1;
        }
        .manager-action-cta-row {
          display: flex;
          gap: 12px;
        }

        .section-title-margin {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .team-squad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .squad-member-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }
        .squad-member-card:hover {
          border-color: rgba(99, 102, 241, 0.35);
          transform: translateY(-2px);
        }
        .squad-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .squad-avatar-box {
          position: relative;
        }
        .squad-avatar {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          object-fit: cover;
          border: 2px solid #3b82f6;
        }
        .status-indicator-dot {
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--color-canvas);
        }
        .badge-member-status {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .squad-member-name { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 2px; }
        .squad-member-role { font-size: 0.78rem; color: #94a3b8; margin-bottom: 12px; }

        .squad-project-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          background: rgba(99, 102, 241, 0.1);
          color: #a5b4fc;
          padding: 4px 8px;
          border-radius: 6px;
          margin-bottom: 10px;
        }

        .squad-task-note {
          background: rgba(2, 6, 23, 0.5);
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 16px;
          font-size: 0.75rem;
        }
        .note-label { display: block; color: #64748b; font-weight: 700; margin-bottom: 2px; }
        .note-text { color: #cbd5e1; }

        .squad-card-footer {
          margin-top: auto;
        }
        .btn-squad-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: #e2e8f0;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-squad-contact:hover {
          background: #6366f1;
          color: #fff;
        }

        /* MODAL STYLES */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-card {
          background: var(--color-surface-card);
          border: 1px solid var(--color-hairline);
          color: var(--color-ink);
          border-radius: 20px;
          width: 100%;
          max-width: 520px;
          padding: 28px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
          animation: modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .modal-title { font-size: 1.25rem; font-weight: 800; color: #fff; }
        .modal-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }
        .modal-close-btn:hover { color: #fff; }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .range-with-val {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .range-with-val input[type="range"] {
          flex: 1;
          accent-color: #6366f1;
        }
        .range-disp-text {
          font-weight: 800;
          color: #818cf8;
          font-size: 1.1rem;
          min-width: 45px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        /* RESPONSIVENESS */
        @media (max-width: 1200px) {
          .metric-tiles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-squad-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .dash-top-header {
            padding: 14px 20px;
            flex-wrap: wrap;
            gap: 12px;
          }
          .header-center {
            order: 3;
            width: 100%;
            justify-content: space-between;
          }
          .dash-subnav {
            padding: 0 20px;
          }
          .dash-content-container {
            padding: 20px;
          }
          .emp-hero-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-punch-panel {
            width: 100%;
          }
          .overview-split-layout {
            grid-template-columns: 1fr;
          }
          .projects-full-grid {
            grid-template-columns: 1fr;
          }
          .attendance-banner-card {
            flex-direction: column;
          }
          .manager-large-hero {
            flex-direction: column;
          }
          .team-squad-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeDashboardPage;
