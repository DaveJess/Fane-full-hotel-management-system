# 🏨 FANE Hotel Management System - Complete Development Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Project Setup & Installation](#project-setup--installation)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Database Design & Models](#database-design--models)
6. [Authentication Flow](#authentication-flow)
7. [API Design & Routes](#api-design--routes)
8. [Frontend Components & Pages](#frontend-components--pages)
9. [Data Flow Between Frontend & Backend](#data-flow-between-frontend--backend)
10. [Quick Reference](#quick-reference)

---

## 🎯 Project Overview

### **What is FANE Hotel Management System?**
A full-stack hotel booking and management platform built with modern web technologies.

### **Key Features:**
- 🏨 Multi-role system (User, Hotel, Admin, Super Admin)
- 🔐 JWT authentication with email verification
- 📱 Responsive design with modern UI
- 🗺️ Location-based hotel search
- 📅 Booking management system
- 💳 Payment status tracking
- 📊 Dashboard analytics

### **Technology Stack:**

**Backend (HOTEL-2/):**
- Node.js + TypeScript
- Express.js (Web Framework)
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- bcryptjs (Password Hashing)
- Nodemailer (Email Services)

**Frontend (Hotel-Manage-Frontend-Fane/):**
- Next.js 16 + React 19
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Axios (HTTP Client)
- React Hook Form

---

## 🚀 Project Setup & Installation

### **Prerequisites:**
- Node.js (v18+)
- MongoDB (local or cloud)
- Git

### **Step 1: Clone & Install Dependencies**
```bash
# Backend dependencies
cd HOTEL-2
npm install

# Frontend dependencies  
cd ../Hotel-Manage-Frontend-Fane
npm install
```

### **Step 2: Environment Configuration**

**Backend (.env in HOTEL-2/):**
```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/fane-hotel
JWT_SECRET=super_secure_fane_jwt_secret
FRONTEND_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Frontend (.env.local in frontend/):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Step 3: Start Both Servers**
```bash
# Option 1: Use batch script
run-project.bat

# Option 2: Start manually
cd HOTEL-2 && npm run dev      # Backend on :4000
cd Hotel-Manage-Frontend-Fane && npm run dev  # Frontend on :3000
```

### **Step 4: Access Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Super Admin Login:** superadmin@fane.com / SuperAdmin@123

---

## 🏗️ Backend Architecture

### **File Structure:**
```
src/
├── server.ts          # Entry point
├── app.ts             # Express app setup
├── controllers/       # Business logic
├── models/           # Database schemas
├── routes/           # API endpoints
├── middleware/       # Request processing
├── repository/       # Data access layer
├── service/          # Business services
├── utils/            # Helper functions
└── validators/       # Input validation
```

### **Server Entry Point (server.ts):**
```typescript
import dotenv from "dotenv";
import connectToDatabase from "./database/db";
import app from "./app";

dotenv.config();
connectToDatabase();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
```

### **Express App Configuration (app.ts):**
```typescript
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import hotelRoutes from "./routes/hotel.routes";

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handling
app.use(errorHandler);
```

### **Database Connection (db.ts):**
```typescript
import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL as string)
        console.log("Database connected")
    } catch (error: any) {
        console.log("Failed to connect to db")
        throw new Error(error)    
    }
}
```

---

## 🎨 Frontend Architecture

### **Next.js App Router Structure:**
```
app/
├── layout.tsx         # Root layout
├── page.tsx          # Landing page
├── (auth)/           # Authentication pages group
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (dashboard)/      # User dashboard group
│   ├── layout.tsx
│   └── dashboard/
└── (hotel)/          # Hotel management group
    ├── layout.tsx
    └── hotel-dashboard/
```

### **Root Layout (layout.tsx):**
```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
```

### **API Client Setup (lib/api-axios.ts):**
```typescript
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - adds auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handles errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error.response?.data || 'Request failed');
  }
);
```

### **Route Groups with Parentheses:**
- **(auth)/:** Authentication pages (doesn't appear in URL)
- **(dashboard)/:** User dashboard pages
- **(hotel)/:** Hotel management pages

---

## 🗄️ Database Design & Models

### **MongoDB Collections:**

#### **User Model:**
```typescript
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  identification: { type: String, required: true },
  id_no: { type: Number, required: true },
  nin: { type: String, required: false },
  role: {
    type: String,
    enum: ["USER", "HOTEL", "ADMIN", "SUPER_ADMIN"],
    default: "USER"
  },
  isVerified: { type: Boolean, default: false },
  emailToken: { type: String }
}, { timestamps: true });
```

#### **Hotel Model:**
```typescript
const HotelSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: String,
  starRating: { type: Number, min: 1, max: 5 },
  images: [String],
  owner: { type: Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
```

#### **Room Model:**
```typescript
const RoomSchema = new Schema({
  hotel: { type: Types.ObjectId, ref: "Hotel", required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  totalRooms: { type: Number, required: true },
  images: [String]
}, { timestamps: true });
```

#### **Booking Model:**
```typescript
const BookingSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  hotel: { type: Types.ObjectId, ref: "Hotel", required: true },
  room: { type: Types.ObjectId, ref: "Room", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING"
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED"],
    default: "PENDING"
  }
}, { timestamps: true });
```

### **Relationships:**
- **User ←→ Hotel:** One user can own many hotels
- **Hotel ←→ Room:** One hotel can have many rooms
- **User ←→ Booking:** One user can have many bookings
- **Hotel/Room ←→ Booking:** Many bookings per hotel/room

---

## 🔐 Authentication Flow

### **JWT Authentication Middleware:**
```typescript
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
```

### **Password Security:**
```typescript
import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);
```

### **JWT Token Generation:**
```typescript
export const generateJWT = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
};
```

### **Complete Authentication Flow:**

#### **1. Registration:**
```
User fills form → POST /api/auth/register
↓
Backend validates → Hashes password → Creates user
↓
Generates email token → Sends verification email
↓
Returns user data (without password)
```

#### **2. Email Verification:**
```
User clicks email link → GET /api/auth/verify/:token
↓
Backend finds user by token → Updates isVerified: true
↓
Clears email token → Returns success message
```

#### **3. Login:**
```
User submits credentials → POST /api/auth/login
↓
Backend finds user → Compares hashed passwords
↓
If match → Generates JWT token → Returns token + user
↓
Frontend stores token in localStorage
```

#### **4. Protected Route Access:**
```
User requests protected data → Frontend adds Authorization: Bearer token
↓
Backend middleware extracts token → Verifies JWT signature
↓
Finds user by ID → Attaches user to request
↓
Continues to route handler → Returns protected data
```

---

## 🛣️ API Design & Routes

### **RESTful API Endpoints:**

#### **Authentication Routes:**
```typescript
// POST /api/auth/register - User registration
router.post('/register', registerValidator, validate, register);

// POST /api/auth/login - User login
router.post('/login', loginValidator, validate, login);

// GET /api/auth/verify/:token - Email verification
router.get('/verify/:token', verify);
```

#### **Hotel Routes:**
```typescript
// POST /api/hotels - Create hotel (protected)
router.post('/', createHotelValidator, validate, createHotel);

// GET /api/hotels - Get hotels with filters
router.get('/', getHotels); // ?state=Abuja&city=Gwagwalada

// GET /api/hotels/all - List all hotels
router.get('/all', listAllHotels);
```

#### **Booking Routes:**
```typescript
// GET /api/bookings/stats - Dashboard statistics (public)
router.get('/stats', getDashboardStats);

// POST /api/bookings - Create booking (protected)
router.post('/', authenticate, createBookingValidator, validate, createBooking);

// GET /api/bookings/user - Get current user's bookings (protected)
router.get('/user', authenticate, getUserBookings);

// GET /api/bookings/hotel/:hotelId - Get hotel's bookings (protected)
router.get('/hotel/:hotelId', authenticate, getHotelBookings);
```

### **Input Validation:**
```typescript
export const createHotelValidator = [
  body('name').notEmpty().withMessage('Hotel name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('country').notEmpty().withMessage('Country is required'),
];
```

### **Validation Middleware:**
```typescript
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
```

### **HTTP Status Codes:**
| Status | Meaning | When to Use |
|--------|---------|-------------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST |
| **400** | Bad Request | Validation errors, invalid data |
| **401** | Unauthorized | Missing/invalid authentication |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **500** | Internal Server Error | Server-side errors |

---

## 🎨 Frontend Components & Pages

### **UI Components - Building Blocks:**

#### **Button Component with Variants:**
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border bg-background shadow-xs hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md gap-1.5 px-3',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9',
      },
    },
  }
);
```

#### **Card Compound Component:**
```typescript
function Card({ className, ...props }) {
  return (
    <div className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)} {...props} />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div className={cn('grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6', className)} {...props} />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <div className={cn('leading-none font-semibold', className)} {...props} />
  )
}
```

### **Dashboard Components:**

#### **Sidebar Navigation:**
```typescript
const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Search Hotels", icon: Search, href: "/dashboard/hotels" },
  { title: "My Bookings", icon: CalendarDays, href: "/dashboard/bookings" },
  { title: "Reservations", icon: BookMarked, href: "/dashboard/reservations" },
  { title: "Favorites", icon: Heart, href: "/dashboard/favorites" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/"><FaneLogo size="md" /></Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

#### **Dashboard Page:**
```typescript
export default function DashboardPage() {
  const { stats, loading, error } = useDashboardStats()

  if (loading) return <Loader2 className="h-8 w-8 animate-spin" />
  if (error) return <p className="text-red-500">Error: {error}</p>

  const realStats = [
    { label: "Total Bookings", value: stats.totalBookings.toString(), icon: CalendarDays, change: "+2 this month" },
    { label: "Upcoming Stays", value: stats.upcomingStays.toString(), icon: Clock, change: "Next booking soon" },
    { label: "Available Hotels", value: stats.favoriteHotels.toString(), icon: Building2, change: "Browse all" },
    { label: "Reviews Given", value: stats.reviewsGiven.toString(), icon: Star, change: "Share your experience" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-fane-green" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### **Custom React Hooks:**

#### **useBookings Hook:**
```typescript
export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = async () => {
    try {
      const data = await bookingsAPI.getAll()
      setBookings(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return { bookings, loading, error, refetch: fetchBookings }
}
```

#### **useDashboardStats Hook:**
```typescript
export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingStays: 0,
    favoriteHotels: 0,
    reviewsGiven: 0,
    recentBookings: [],
    recommendedHotels: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      const data = await bookingsAPI.get('/stats')
      setStats(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return { stats, loading, error, refetch: fetchDashboardData }
}
```

---

## 🔄 Data Flow Between Frontend & Backend

### **Complete Data Journey Architecture:**
```
👤 User Interface (React Components)
           ↓
🎣 Custom Hooks (useBookings, useDashboardStats)
           ↓
🌐 API Client (Axios with interceptors)
           ↓
🛣️ HTTP Request (REST API)
           ↓
🔐 Middleware (Auth, Validation)
           ↓
🎮 Controllers (Business Logic)
           ↓
🏗️ Services (Data Operations)
           ↓
🗄️ Database (MongoDB/Mongoose)
```

### **Real Example: User Books a Hotel**

#### **Step 1: User Interaction (Frontend)**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const bookingData = {
    hotel: "507f1f77bcf86cd799439012",
    room: "507f1f77bcf86cd799439013", 
    checkIn: "2024-02-01",
    checkOut: "2024-02-03"
  }

  try {
    const response = await bookingsAPI.create(bookingData)
    toast.success("Booking created successfully!");
    router.push('/dashboard/bookings');
  } catch (error) {
    toast.error("Booking failed", { description: error.message });
  }
}
```

#### **Step 2: API Client Processing**
```typescript
export const bookingsAPI = {
  create: (bookingData: any) => apiClient.post('/api/bookings', bookingData)
}

// Request interceptor adds auth token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### **Step 3: HTTP Request to Backend**
```http
POST /api/bookings
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "hotel": "507f1f77bcf86cd799439012",
  "room": "507f1f77bcf86cd799439013",
  "checkIn": "2024-02-01", 
  "checkOut": "2024-02-03"
}
```

#### **Step 4: Backend Middleware Chain**
```typescript
// Route: router.post('/', authenticate, createBookingValidator, validate, createBooking);

// 1. Authentication middleware
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const user = await User.findById(decoded.id);
  req.user = user;
  next();
};

// 2. Validation middleware
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
```

#### **Step 5: Controller Logic**
```typescript
export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = {
      ...req.body,
      user: req.user._id,
      totalAmount: calculateTotal(req.body.checkIn, req.body.checkOut),
      status: "PENDING",
      paymentStatus: "PENDING"
    };

    const booking = await BookingService.createBooking(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

#### **Step 6: Database Operations**
```typescript
// MongoDB document creation
const booking = await Booking.create({
  user: "507f1f77bcf86cd799439011",
  hotel: "507f1f77bcf86cd799439012",
  room: "507f1f77bcf86cd799439013",
  checkIn: new Date("2024-02-01"),
  checkOut: new Date("2024-02-03"),
  totalAmount: 30000,
  status: "PENDING",
  paymentStatus: "PENDING"
});
```

#### **Step 7: Response Back to Frontend**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "507f1f77bcf86cd799439014",
  "user": "507f1f77bcf86cd799439011",
  "hotel": "507f1f77bcf86cd799439012",
  "room": "507f1f77bcf86cd799439013",
  "checkIn": "2024-02-01T00:00:00.000Z",
  "checkOut": "2024-02-03T00:00:00.000Z", 
  "totalAmount": 30000,
  "status": "PENDING",
  "paymentStatus": "PENDING",
  "createdAt": "2024-01-20T15:30:00.000Z",
  "updatedAt": "2024-01-20T15:30:00.000Z"
}
```

#### **Step 8: Frontend State Update**
```typescript
try {
  const response = await bookingsAPI.create(bookingData);
  
  // Update local state
  setBookings(prev => [...prev, response]);
  
  // Show success notification
  toast.success("Booking created successfully!");
  
  // Navigate to bookings page
  router.push('/dashboard/bookings');
} catch (error) {
  // Show error notification
  toast.error("Booking failed", { description: error.message });
}
```

### **Error Handling Flow:**

#### **Backend Error:**
```typescript
// Service layer throws error
if (!isAvailable) {
  throw new Error("Room not available for selected dates");
}

// Controller catches and returns error response
catch (error) {
  res.status(400).json({ error: error.message });
}
```

#### **Frontend Error Handling:**
```typescript
// API client response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Request failed');
  }
);

// Component handles error
try {
  await bookingsAPI.create(bookingData);
} catch (error) {
  toast.error("Booking failed", { description: error.message });
}
```

---

## 📚 Quick Reference

### **Common Commands:**
```bash
# Start development servers
cd HOTEL-2 && npm run dev
cd Hotel-Manage-Frontend-Fane && npm run dev

# Build for production
cd HOTEL-2 && npm run build
cd Hotel-Manage-Frontend-Fane && npm run build

# Run system test
node complete-system-test.js
```

### **Default Credentials:**
- **Super Admin:** superadmin@fane.com / SuperAdmin@123
- **Test Users:** Register new accounts via signup form

### **Key File Locations:**
- **Backend Config:** `HOTEL-2/.env`
- **Frontend Config:** `Hotel-Manage-Frontend-Fane/.env.local`
- **API Client:** `Hotel-Manage-Frontend-Fane/lib/api-axios.ts`
- **Auth Middleware:** `HOTEL-2/src/middleware/auth.middleware.ts`
- **Database Models:** `HOTEL-2/src/models/`

### **Useful URLs:**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **API Documentation:** Test with Postman/Insomnia

---

## 🎉 Conclusion

This FANE Hotel Management System demonstrates:

✅ **Modern Full-Stack Development** with best practices
✅ **Secure Authentication** with JWT and role-based access
✅ **Responsive UI Design** with Tailwind CSS and shadcn/ui
✅ **RESTful API Design** with proper validation
✅ **Database Modeling** with MongoDB relationships
✅ **Component Architecture** with React and TypeScript
✅ **Error Handling** at every layer
✅ **State Management** with custom hooks

### **Next Steps for Learning:**
1. **Practice:** Build similar features yourself
2. **Extend:** Add payment integration, reviews, etc.
3. **Deploy:** Learn Vercel, AWS, or other hosting
4. **Test:** Add unit and integration tests
5. **Optimize:** Implement caching, pagination

**Happy coding! 🚀**

---

*This guide covers the complete FANE Hotel Management System from setup to deployment. Use it as a reference for understanding modern web development patterns and best practices.*
