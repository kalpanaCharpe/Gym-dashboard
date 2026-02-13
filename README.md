# 🏋️ FitCore - Gym Management Dashboard

A modern, professional, and fully responsive **Gym Management Admin Dashboard** built with **React.js**, **Vite**, and **Tailwind CSS**. This SaaS-style dashboard provides comprehensive tools for managing gym members, trainers, classes, attendance, payments, and more.

![FitCore Dashboard](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Dashboard** - KPI cards, revenue charts, attendance overview, membership distribution
- **Members Management** - Add, edit, delete members with search and filter
- **Trainers Management** - Manage trainer profiles, specializations, and ratings
- **Membership Plans** - Beautiful plan cards with pricing and features
- **Attendance Tracking** - Daily check-ins, duration tracking, and history
- **Payment Management** - Invoice tracking, payment status, revenue summary
- **Class Scheduling** - Manage classes, schedules, and enrollments
- **Settings** - Gym profile configuration and role management

### 🎨 Design Features
- **Modern SaaS UI** - Clean, professional interface with smooth animations
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Beautiful Charts** - Interactive charts with Recharts library
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Notification System** - Toast notifications for user actions

### 🛠️ Technical Features
- **React Context API** - Global state management
- **Mock Data API** - JSON-based data storage with CRUD operations
- **React Router** - Client-side routing
- **Reusable Components** - Modular, maintainable code structure
- **Search & Filter** - Dynamic data filtering
- **Pagination** - Efficient data presentation

## 📁 Project Structure

```
gym-dashboard/
├── public/
│   └── data.json                 # Mock data storage
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   │   └── Header.jsx       # Top header with search
│   │   ├── Modal.jsx            # Reusable modal component
│   │   ├── Table.jsx            # Reusable table component
│   │   ├── Pagination.jsx       # Pagination component
│   │   └── StatCard.jsx         # Dashboard stat cards
│   ├── contexts/
│   │   ├── ThemeContext.jsx     # Dark/Light mode
│   │   ├── DataContext.jsx      # Data management
│   │   └── NotificationContext.jsx # Toast notifications
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Members.jsx          # Members management
│   │   ├── Trainers.jsx         # Trainers management
│   │   ├── MembershipPlans.jsx  # Plans display
│   │   ├── Attendance.jsx       # Attendance tracking
│   │   ├── Payments.jsx         # Payment management
│   │   ├── Classes.jsx          # Class scheduling
│   │   └── Settings.jsx         # Settings page
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone or extract the project**
   ```bash
   cd gym-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📊 Data Management

All data is stored in `public/data.json` and managed through the DataContext. The application supports full CRUD operations:

- **Members** - Add, edit, delete members
- **Trainers** - Add, edit, delete trainers
- **Classes** - Add, edit, delete classes
- **Attendance** - Track check-ins and check-outs
- **Payments** - Record and manage payments

Data changes are stored in localStorage to persist between sessions during development.

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    500: '#ef4444', // Main brand color
    600: '#dc2626',
    // ... other shades
  }
}
```

### Dark Mode
Toggle dark mode using the moon/sun icon in the header. Preference is saved to localStorage.

### Components
All components are in `src/components/` and are fully customizable. Each component uses Tailwind CSS classes for styling.

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

The sidebar converts to a mobile drawer on smaller screens.

## 🔧 Technologies Used

- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **React Router 6** - Client-side routing
- **Tailwind CSS 3.3** - Utility-first CSS
- **Recharts 2.10** - Charts and graphs
- **Lucide React** - Icon library
- **Framer Motion** - Animations (optional enhancement)

## 📈 Available Pages

1. **Dashboard** (`/`)
   - Total members, revenue, attendance stats
   - Revenue line chart
   - Attendance bar chart
   - Membership distribution pie chart
   - Recent activity feed

2. **Members** (`/members`)
   - Member list table with search and filter
   - Add/Edit member modal
   - Status management
   - Pagination

3. **Trainers** (`/trainers`)
   - Trainer profile cards
   - Ratings and specializations
   - Session and member counts
   - Certifications display

4. **Membership Plans** (`/plans`)
   - Plan comparison cards
   - Pricing and features
   - Color-coded tiers

5. **Attendance** (`/attendance`)
   - Daily attendance view
   - Check-in/Check-out tracking
   - Duration monitoring
   - Date filtering

6. **Payments** (`/payments`)
   - Payment history table
   - Invoice tracking
   - Revenue statistics
   - Status filtering

7. **Classes** (`/classes`)
   - Class schedule cards
   - Enrollment tracking
   - Capacity management
   - Trainer assignments

8. **Settings** (`/settings`)
   - Gym profile information
   - Operating hours
   - Role management
   - Permissions


## 🔐 Future Enhancements

Potential improvements:
- Backend API integration
- User authentication
- Real-time updates with WebSockets
- Advanced reporting
- Export to Excel/PDF
- Email notifications
- Multi-language support
- Mobile app version

---

**Made with ❤️ using React + Vite + Tailwind CSS**
