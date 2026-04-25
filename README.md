# VP Group Responsive Institutional Portal

![VP Group Portal](https://img.shields.io/badge/VP%20Group-Institutional%20Portal-8b5cf6?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

The **VP Group Institutional Portal** is a high-performance, full-stack web ecosystem built for enterprise clients, strategic partners, and global operations. Featuring a highly responsive glassmorphism UI, a custom-built 3D interaction layer, and a robust backend command center.

## 🌟 Key Features

### 1. High-Fidelity UI & Responsive Engineering
*   **Glassmorphism Design System**: Unified translucent panels with vibrant gradients and seamless transition states.
*   **Absolute Responsiveness**: Custom CSS Grid implementations ensuring zero layout collision and fluid resizing from 4K monitors down to mobile devices.
*   **Centralized Template Engine**: Uses a core `PageTemplate.jsx` to dynamically render structural grids for Contact, Help, and Service detail pages.

### 2. Comprehensive Service & Client Architecture
*   **Dynamic Services Engine**: Dedicated, high-conversion detail pages for Software Engineering, IT Consulting, Web Development, UI/UX, and Technical Support.
*   **Client Vaults**: Features specialized landing pages for institutional clients (e.g., Mother Bliss) and global partnership networks.
*   **Expansion Slots**: "Neural Core" and "New Partner" slots built directly into the UI to dynamically accept future integration metrics.

### 3. Integrated VP Command Center (Backend)
*   **Secure API Architecture**: Built on Node.js and Express, connected to a MongoDB Atlas cluster.
*   **Real-time Communication**: Custom Nodemailer integration that securely relays client contact requests and Partnership applications.
*   **File Attachment System**: Native Base64 encoding support allowing partners to upload technical documentation directly through the frontend form to the backend email processor.

## 🛠️ Technology Stack

**Frontend:**
*   React 18 + Vite
*   Lucide React (Iconography)
*   React Router DOM (Client-side routing)
*   CSS3 (Grid, Flexbox, Clamp typography, CSS Variables)

**Backend:**
*   Node.js & Express
*   MongoDB (Mongoose)
*   Nodemailer (SMTP Secure Mailing)
*   JWT Authentication & bcryptjs
*   CORS & Dotenv

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB Atlas Account (or local MongoDB server)
*   A Gmail Account with a generated **App Password**.

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ThakurVpSingh/vp-group-portal.git
   cd vp-group-portal
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<your-cluster-url>
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_digit_app_password
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🔒 Security Posture
*   **.gitignore Enforced**: Prevents leakage of `node_modules`, build artifacts, and critical `.env` files.
*   **Legacy Code Vaulted**: Administrative and legacy IAM Vault components have been properly decoupled from the primary institutional router, ensuring a minimized attack surface on public-facing routes.
*   **Anti-Spoofing Protocols**: Forms are configured to use authenticated server-side `replyTo` architectures to bypass strict anti-spam filters.

---
*Built with precision by VP Group Engineering.*
