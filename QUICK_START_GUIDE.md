# 🚀 Quick Start Guide - Fix Network Error

## ❌ **Problem: Network Error**

Your frontend is showing "Network Error" because the backend server is not running.

---

## 🔧 **EASY SOLUTION:**

### **Option 1: Use the Batch Files (Easiest)**

1. **Start Backend:**
   - Double-click: `HOTEL-2/start-backend.bat`
   - Wait for: "🚀 Fane Hotel Management Server is running on port 8003"

2. **Start Frontend:**
   - Double-click: `Hotel-Manage-Frontend-Fane/start-frontend.bat`
   - Wait for frontend to load

3. **Use the App:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8003

---

### **Option 2: Manual Start**

**Terminal 1 - Backend:**
```bash
cd "c:\Users\DELL\Desktop\fane-full-hotel-management-system/HOTEL-2"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "c:\Users/DELL/Desktop/fane-full-hotel-management-system\Hotel-Manage-Frontend-Fane"
npm run dev
```

---

## 🎯 **Expected Results:**

### **✅ Backend Output:**
```
🚀 Fane Hotel Management Server is running on port 8003
🌐 Server URL: http://localhost:8003
✅ Server Status: READY FOR API CALLS
```

### **✅ Frontend Output:**
```
✓ Compiled in 2.1s
GET / 200 in 658ms
```

### **✅ No More Errors:**
- ❌ Network Error → ✅ API calls working
- ❌ Connection refused → ✅ Successful requests
- ❌ Forms not working → ✅ Signup/login working

---

## 🔍 **What's Happening:**

- **Frontend (port 3000)**: Trying to connect to backend
- **Backend (port 8003)**: Needs to be running for API calls
- **Network Error**: Frontend can't find backend server

---

## 📱 **Test Everything Works:**

1. **Visit:** http://localhost:3000
2. **Try signup:** Should work without Network Error
3. **Check wallet:** Should show ₦500,000 balance
4. **Browse hotels:** Should load hotel data

---

## 🚀 **Ready to Go!**

**Just double-click the batch files and the Network Error will disappear!**

### **Files Created:**
- `HOTEL-2/start-backend.bat` - Easy backend startup
- `Hotel-Manage-Frontend-Fane/start-frontend.bat` - Easy frontend startup

**The Network Error will be fixed once both servers are running!** 🎉✨
