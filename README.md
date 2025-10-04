# 🌦️ DryPlan - Weather-Proof Event Guardian

## 👋 Welcome Team!
**Created by: Natasha Hinga**  
*Backend & Dashboard Developer*

---

## 🚀 Quick Start Guide

### 📋 Prerequisites
- Node.js installed
- Git installed
- VS Code (or any code editor)

---

## ⚡ Setup Instructions

### 1. GET THE LATEST CODE
```bash
# Open terminal in VS Code
git pull origin main
```

### 2. OPEN TWO TERMINAL WINDOWS
- **Terminal 1** → Backend (Port 5000)
- **Terminal 2** → Frontend (Port 5173)

---

## 🔧 Terminal 1: Backend Setup

### Navigate to backend folder:
```bash
cd backend
```

### Install dependencies:
```bash
npm install
```

### Set up environment:
Make sure `.env` file exists in backend folder with:
```env
MONGO_URI=mongodb://localhost:27017/dryplan
PORT=5000
OPENWEATHER_API_KEY=321428953e553724280a6a3952309ce4
```

### Start backend server:
```bash
npm run dev
```

**✅ SUCCESS MESSAGE:**
```
Server running on port 5000
MongoDB connected
```

---

## 🎨 Terminal 2: Frontend Setup

### Navigate to frontend folder:
```bash
cd frontend
```

### Install dependencies:
```bash
npm install
```

### Start frontend server:
```bash
npm run dev
```

**✅ SUCCESS MESSAGE:**
```
Vite dev server running at:
  http://localhost:5173/
```

---

## 🌐 Access the Application

### Open your browser and visit:
```
http://localhost:5173
```

### What you'll see:
- 🌦️ DryPlan Navigation Bar
- Dashboard with Event Creation Form
- Live Event Cards with Risk Assessment
- Beautiful, responsive design

---

## 🛠️ Troubleshooting

### If Backend Fails:
- Check if MongoDB is running
- Verify `.env` file exists with correct API key
- Ensure port 5000 is available

### If Frontend Fails:
- Make sure backend is running on port 5000
- Verify all dependencies are installed
- Check browser console for errors

### If API Connection Fails:
- Both servers MUST run simultaneously
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

## 📱 Test the Application

### Quick Demo Flow:
1. **Add an Event** using the quick form
2. **See Event Card** appear with risk assessment
3. **View Real-time Updates** as events are created
4. **Check Responsive Design** on different screen sizes

---

## ⚠️ Important Reminders

### MUST RUN BOTH SERVERS:
- ✅ Backend: `cd backend && npm run dev`
- ✅ Frontend: `cd frontend && npm run dev`

### DON'T CLOSE TERMINALS:
- Keep both terminals open during development
- Closing terminals stops the servers

### AUTO-RELOAD FEATURE:
- Both servers support hot reload
- Changes automatically refresh in browser

---

## 🆘 Need Help?

### First, Check These:
```bash
# Backend working?
curl http://localhost:5000/api/events

# Frontend working?
# Open http://localhost:5173 in browser
```

### Common Fixes:
```bash
# If npm install fails:
npm cache clean --force
npm install

# If port is in use:
# Change PORT in backend/.env or kill process using port
```

### Still Stuck?
1. Share the exact error message
2. Confirm both terminals are running
3. Verify you're in the correct folders
4. Check for typos in commands

---

## 📞 Support
**Created and maintained by:** Natasha Hinga  
**Role:** Backend & Dashboard Development  
**Specialties:** Express.js, MongoDB, API Integration, React Dashboard

---

## 🎯 Success Checklist
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173  
- [ ] Can create events in dashboard
- [ ] Event cards display with risk badges
- [ ] No errors in browser console

---

**Happy Coding! 🚀**  
*Natasha Hinga - DryPlan Backend & Dashboard*
