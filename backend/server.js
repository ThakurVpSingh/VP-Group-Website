import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import hrRoutes from './routes/hrRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

import User from './models/User.js';
import Role from './models/Role.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

async function autoSeed() {
  try {
    const roleNames = ['Employee', 'Manager', 'Admin', 'SuperAdmin'];
    const rolesMap = {};
    for (const name of roleNames) {
      let role = await Role.findOne({ name });
      if (!role) {
        role = await Role.create({ name, permissions: [] });
      }
      rolesMap[name] = role;
    }

    const credentials = [
      { email: 'superadmin@vexio.local', username: 'SuperAdminOne', role: 'SuperAdmin' },
      { email: 'admin@vexio.local', username: 'AdminOne', role: 'Admin' },
      { email: 'manager@vexio.local', username: 'ManagerOne', role: 'Manager' },
      { email: 'employee@vexio.local', username: 'EmployeeOne', role: 'Employee' }
    ];

    for (const cred of credentials) {
      const user = await User.findOne({ email: cred.email });
      if (!user) {
        await User.create({
          username: cred.username,
          email: cred.email,
          password: 'password123',
          role: rolesMap[cred.role]._id
        });
        console.log(`✅ Seeded: ${cred.email}`);
      }
    }
  } catch (err) {
    console.error('Seed attempt failed:', err.message);
  }
}

if (!mongoURI) {
  console.error('❌ CONFIG ERROR: MONGODB_URI is missing from .env');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅✅✅ SUCCESS: VEXIOGATE CONNECTED TO ATLAS!');
    await autoSeed();
    app.listen(PORT, () => console.log(`🚀 Server live at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ CONNECTION FAILED:', err.message);
  });
