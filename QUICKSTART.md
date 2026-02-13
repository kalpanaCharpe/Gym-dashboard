# 🚀 Quick Start Guide - FitCore Gym Dashboard

## ⚡ Get Running in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to: `http://localhost:3000`

---

## 🎯 What You'll See

### Dashboard (Home)
- **4 KPI Cards**: Total Members, Active Members, Monthly Revenue, Today's Attendance
- **Revenue Chart**: Last 6 months line graph
- **Attendance Chart**: Weekly bar chart
- **Membership Distribution**: Pie chart
- **Recent Activity**: Live feed of member actions

### Members Page
- **Search Bar**: Filter members by name/email
- **Status Filter**: Active/Expired
- **Table View**: All member details
- **Add Member**: Click the "+ Add Member" button
- **Edit/Delete**: Hover over rows to see action buttons

### Trainers Page
- **Card Grid**: Beautiful trainer profile cards
- **Ratings**: Star ratings and reviews
- **Stats**: Members assigned and sessions completed
- **Certifications**: Display professional credentials

### Membership Plans
- **4 Tiers**: Basic, Standard, Premium, Elite
- **Feature Lists**: Each plan's included benefits
- **Pricing**: Monthly subscription costs
- **Color-Coded**: Each tier has a unique color theme

### Attendance
- **Date Picker**: Select any date
- **Check-in Tracking**: See who's currently at the gym
- **Duration Stats**: Average workout times
- **Status Badges**: Active/Completed indicators

### Payments
- **Revenue Stats**: Total, Completed, Pending
- **Invoice Table**: All payment transactions
- **Status Filter**: Filter by payment status
- **Download**: Export invoice functionality

### Classes
- **Schedule Cards**: All gym classes
- **Enrollment Progress**: Visual capacity bars
- **Trainer Info**: Assigned instructor
- **Time & Duration**: When and how long

### Settings
- **Gym Profile**: Name, contact, address
- **Opening Hours**: Weekly schedule
- **Roles**: Admin, Manager, Receptionist permissions

---

## 🎨 Try These Features

### Dark Mode
Click the moon/sun icon in the top-right header to toggle themes.

### Add a Member
1. Go to Members page
2. Click "+ Add Member"
3. Fill in the form
4. Click "Add Member"
5. See success notification!

### Filter Members
1. Use the search bar to find specific members
2. Use the status dropdown to filter Active/Expired
3. Navigate with pagination at the bottom

### Edit Trainer
1. Go to Trainers page
2. Hover over a trainer card
3. Click the edit (pencil) icon
4. Modify details
5. Save changes

---

## 🔍 Understanding the Data

All data lives in `public/data.json`. The file contains:

```json
{
  "members": [...],      // All gym members
  "trainers": [...],     // All trainers
  "membershipPlans": [...], // Available plans
  "attendance": [...],   // Check-in records
  "payments": [...],     // Payment history
  "classes": [...],      // Gym classes
  "settings": {...},     // Gym configuration
  "dashboard": {...}     // Chart data
}
```

### How CRUD Works

**Create**: Click "+ Add" buttons → Fill form → Data added to context
**Read**: Data loads from data.json on app start
**Update**: Click edit icons → Modify form → Data updated in context
**Delete**: Click trash icons → Confirm → Data removed from context

Changes are stored in **localStorage** during development.

---

## 🎯 Common Tasks

### Add a New Class
```
1. Navigate to Classes page
2. Click "+ Add Class"
3. Select a trainer from dropdown
4. Set schedule and capacity
5. Add description
6. Submit
```

### Check Today's Attendance
```
1. Go to Attendance page
2. Date picker defaults to today
3. See all check-ins
4. Green badge = completed, Yellow = active
```

### View Revenue
```
1. Dashboard shows monthly revenue KPI
2. Payments page shows detailed breakdown
3. Filter by status: Completed/Pending/Failed
```

---

## 🛠️ Customization Tips

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR_HERE',
  }
}
```

### Modify Sidebar Links
Edit `src/components/layout/Sidebar.jsx` menuItems array.

### Add New Page
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add link in Sidebar

---

## 📱 Mobile View

On mobile devices:
- Sidebar becomes a slide-out drawer
- Header shows hamburger menu
- Tables scroll horizontally
- Cards stack vertically

---

## 🐛 Troubleshooting

### Port Already in Use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001, // or any other port
}
```

### Data Not Updating
Clear localStorage:
```javascript
localStorage.clear()
// Then refresh the page
```

### Charts Not Showing
Ensure Recharts is installed:
```bash
npm install recharts
```

---

## 🎉 You're Ready!

Explore the dashboard, try adding members, schedule classes, and customize it to your needs. The code is well-commented and modular for easy modifications.

**Happy Coding! 🏋️‍♂️**
