# Prime Auto Traders - Complete Project Specifications

---

## 1. Project Overview

- **Project Name:** Prime Auto Traders (Clone/Rebuild)
- **Type:** Automotive Dealership & Financial Services Platform
- **Reference:** https://primeautotraders.com/
- **Tech Stack:** React (Frontend) + Node.js/Express (Backend) + MongoDB (Database) + Tailwind CSS (Styling)

---

## 2. Frontend Specifications

### 2.1 Tech Stack

| Tool              | Purpose                        |
| ----------------- | ------------------------------ |
| React 18+         | UI framework (component-based) |
| Tailwind CSS 3+   | Utility-first styling          |
| React Router v6   | Page routing / navigation      |
| Swiper.js         | Carousels / sliders            |
| AOS.js            | Scroll animations              |
| React Icons       | Icon library (Font Awesome)    |
| Axios             | HTTP requests to backend API   |
| React Hook Form   | Form handling & validation     |
| Google Fonts      | Poppins + Helvetica            |

### 2.2 Pages

| Page         | Route          | Description                                   |
| ------------ | -------------- | --------------------------------------------- |
| Home         | `/`            | Hero, About, Services, Stats, Testimonials, Appointment Form |
| Services     | `/services`    | All services listing                          |
| Service Detail | `/services/:id` | Individual service detail page              |
| About Us     | `/about`       | Company story, team, mission                  |
| Contact      | `/contact`     | Contact form, map, phone, email               |
| Blog         | `/blog`        | Blog listing page                             |
| Blog Detail  | `/blog/:slug`  | Individual blog post                          |
| FAQ          | `/faq`         | Frequently asked questions (accordion)        |
| Privacy Policy | `/privacy`   | Legal / privacy page                          |
| Terms of Service | `/terms`   | Terms & conditions page                       |
| Admin Dashboard | `/admin`    | Protected admin panel (manage content)        |

### 2.3 Components Breakdown

#### Layout Components
- `Navbar` - Sticky header with logo, nav links, mobile hamburger menu, CTA button
- `Footer` - Multi-column: links, business hours, social icons, copyright
- `MobileMenu` - Slide-in drawer for mobile navigation

#### Home Page Sections
- `HeroSection` - Full-width banner, headline, subtext, 2 CTA buttons, background image/video
- `AboutSection` - Company intro, image, key highlights (10+ years, etc.)
- `ServicesGrid` - 4 service cards with icons, title, description, "Read More" link
- `StatsCounter` - Animated counters (years, workers, vehicles sold, satisfaction %)
- `TestimonialsSlider` - Swiper carousel with customer name, photo, rating (5 stars), review text
- `AppointmentForm` - Booking form (name, email, phone, date, time, service type, message)
- `CTABanner` - Call-to-action strip with heading + button

#### Reusable Components
- `Button` - Primary, secondary, outline variants
- `SectionHeading` - Title + subtitle for each section
- `ServiceCard` - Icon + title + description + link
- `TestimonialCard` - Avatar + name + rating + review
- `StatCard` - Icon + number + label
- `InputField` - Styled form input with validation
- `Loader` - Loading spinner/skeleton
- `ScrollToTop` - Floating button to scroll to top
- `WhatsAppFloat` - Floating WhatsApp chat button

### 2.4 Design System

#### Color Palette
| Color       | Hex       | Usage                    |
| ----------- | --------- | ------------------------ |
| Primary Red | `#E53E3E` | CTA buttons, highlights  |
| Dark Navy   | `#1A1A2E` | Header, footer, dark sections |
| White       | `#FFFFFF` | Backgrounds              |
| Light Gray  | `#F7F7F7` | Alternate section backgrounds |
| Text Dark   | `#333333` | Body text                |
| Text Light  | `#666666` | Secondary text           |
| Accent Gold | `#F6AD55` | Stars, badges            |

#### Typography
| Element    | Font     | Weight | Size       |
| ---------- | -------- | ------ | ---------- |
| Headings   | Poppins  | 700    | 32-48px    |
| Subheadings| Poppins  | 600    | 20-28px    |
| Body       | Poppins  | 400    | 14-16px    |
| Buttons    | Poppins  | 600    | 14-16px    |

#### Breakpoints (Responsive)
| Device  | Breakpoint  |
| ------- | ----------- |
| Mobile  | < 768px     |
| Tablet  | 768-1024px  |
| Desktop | > 1024px    |

### 2.5 Animations & Interactions
- Scroll reveal animations (AOS.js) on all sections
- Hover effects on buttons (scale + color shift)
- Hover effects on service cards (shadow + lift)
- Smooth scrolling for anchor links
- Counter animation on stats section (count up on scroll)
- Testimonial auto-play carousel with swipe support
- Mobile menu slide-in/out transition
- Page transition fade effect

---

## 3. Backend Specifications

### 3.1 Tech Stack

| Tool           | Purpose                       |
| -------------- | ----------------------------- |
| Node.js 18+    | Runtime                       |
| Express.js     | REST API framework            |
| MongoDB        | NoSQL database                |
| Mongoose       | MongoDB ODM                   |
| JWT            | Authentication tokens         |
| bcrypt         | Password hashing              |
| Multer         | File/image upload handling     |
| Nodemailer     | Sending emails (appointment confirmations) |
| express-validator | Input validation & sanitization |
| cors           | Cross-origin resource sharing  |
| dotenv         | Environment variables          |
| helmet         | Security headers               |
| morgan         | HTTP request logging           |

### 3.2 API Endpoints

#### Auth Routes (`/api/auth`)
| Method | Endpoint         | Description          | Access  |
| ------ | ---------------- | -------------------- | ------- |
| POST   | `/register`      | Register admin user  | Public  |
| POST   | `/login`         | Login & get JWT      | Public  |
| GET    | `/me`            | Get current user     | Private |

#### Services Routes (`/api/services`)
| Method | Endpoint         | Description            | Access  |
| ------ | ---------------- | ---------------------- | ------- |
| GET    | `/`              | Get all services       | Public  |
| GET    | `/:id`           | Get single service     | Public  |
| POST   | `/`              | Create service         | Admin   |
| PUT    | `/:id`           | Update service         | Admin   |
| DELETE | `/:id`           | Delete service         | Admin   |

#### Appointments Routes (`/api/appointments`)
| Method | Endpoint         | Description            | Access  |
| ------ | ---------------- | ---------------------- | ------- |
| GET    | `/`              | Get all appointments   | Admin   |
| GET    | `/:id`           | Get single appointment | Admin   |
| POST   | `/`              | Book new appointment   | Public  |
| PUT    | `/:id`           | Update appointment status | Admin |
| DELETE | `/:id`           | Delete appointment     | Admin   |

#### Testimonials Routes (`/api/testimonials`)
| Method | Endpoint         | Description            | Access  |
| ------ | ---------------- | ---------------------- | ------- |
| GET    | `/`              | Get all testimonials   | Public  |
| POST   | `/`              | Add testimonial        | Admin   |
| PUT    | `/:id`           | Update testimonial     | Admin   |
| DELETE | `/:id`           | Delete testimonial     | Admin   |

#### Blog Routes (`/api/blogs`)
| Method | Endpoint         | Description            | Access  |
| ------ | ---------------- | ---------------------- | ------- |
| GET    | `/`              | Get all blogs          | Public  |
| GET    | `/:slug`         | Get single blog        | Public  |
| POST   | `/`              | Create blog post       | Admin   |
| PUT    | `/:id`           | Update blog post       | Admin   |
| DELETE | `/:id`           | Delete blog post       | Admin   |

#### Contact Routes (`/api/contact`)
| Method | Endpoint         | Description            | Access  |
| ------ | ---------------- | ---------------------- | ------- |
| POST   | `/`              | Submit contact form    | Public  |
| GET    | `/`              | Get all messages       | Admin   |

#### Stats Routes (`/api/stats`)
| Method | Endpoint         | Description            | Access  |
| ------ | ---------------- | ---------------------- | ------- |
| GET    | `/`              | Get site stats         | Public  |
| PUT    | `/`              | Update site stats      | Admin   |

### 3.3 Middleware
- `authMiddleware` - Verify JWT token, attach user to request
- `adminMiddleware` - Check if user has admin role
- `errorHandler` - Global error handling
- `rateLimiter` - Rate limiting on public routes (prevent spam)
- `uploadMiddleware` - Handle image uploads via Multer

---

## 4. Database Specifications (MongoDB)

### 4.1 Collections & Schemas

#### Users Collection
```
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["admin", "superadmin"], default: "admin"),
  createdAt: Date,
  updatedAt: Date
}
```

#### Services Collection
```
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique),
  description: String (required),
  shortDescription: String,
  icon: String (icon class name),
  image: String (image URL),
  isActive: Boolean (default: true),
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Appointments Collection
```
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  date: Date (required),
  time: String (required),
  serviceType: String (ref: Services),
  message: String,
  status: String (enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending"),
  createdAt: Date,
  updatedAt: Date
}
```

#### Testimonials Collection
```
{
  _id: ObjectId,
  name: String (required),
  avatar: String (image URL),
  rating: Number (1-5, required),
  review: String (required),
  designation: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

#### Blogs Collection
```
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique),
  content: String (required, rich text),
  excerpt: String,
  coverImage: String (image URL),
  author: ObjectId (ref: Users),
  tags: [String],
  isPublished: Boolean (default: false),
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### ContactMessages Collection
```
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String,
  subject: String,
  message: String (required),
  isRead: Boolean (default: false),
  createdAt: Date
}
```

#### SiteStats Collection
```
{
  _id: ObjectId,
  yearsExperience: Number,
  totalWorkers: Number,
  vehiclesSold: Number,
  customerSatisfaction: Number,
  updatedAt: Date
}
```

---

## 5. Folder Structure

```
prime-auto-traders/
├── client/                     # React Frontend
│   ├── public/
│   │   ├── images/             # Static images
│   │   └── index.html
│   ├── src/
│   │   ├── assets/             # Fonts, icons, static assets
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer, MobileMenu
│   │   │   ├── home/           # Hero, About, Services, Stats, Testimonials, Appointment
│   │   │   ├── ui/             # Button, Input, Card, Loader, SectionHeading
│   │   │   └── common/         # ScrollToTop, WhatsAppFloat
│   │   ├── pages/              # Home, About, Services, Contact, Blog, FAQ, Admin
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # Auth context, Theme context
│   │   ├── services/           # API call functions (axios)
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css           # Tailwind imports
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/            # Route handler logic
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express route definitions
│   ├── middleware/              # Auth, error handler, upload
│   ├── utils/                  # Email sender, token generator
│   ├── uploads/                # Uploaded images
│   ├── .env                    # Environment variables
│   ├── server.js               # Entry point
│   └── package.json
│
└── README.md
```

---

## 6. Environment Variables

### Server `.env`
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/prime-auto-traders
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
CLIENT_URL=http://localhost:3000
```

---

## 7. Third-Party Integrations

| Integration      | Purpose                              |
| ---------------- | ------------------------------------ |
| Google Maps API  | Embed map on contact page            |
| WhatsApp API     | Floating chat button                 |
| Nodemailer/SMTP  | Email notifications for appointments |
| Cloudinary (opt) | Cloud image storage                  |

---

## 8. Deployment Plan

| Layer    | Platform        |
| -------- | --------------- |
| Frontend | Vercel / Netlify |
| Backend  | Railway / Render |
| Database | MongoDB Atlas (free tier) |
| Domain   | Custom domain via Namecheap / GoDaddy |

---

## 9. Development Phases

| Phase | Tasks                                           | Priority |
| ----- | ----------------------------------------------- | -------- |
| 1     | Project setup (React + Tailwind + Express + MongoDB) | High |
| 2     | Frontend - Layout (Navbar, Footer)              | High     |
| 3     | Frontend - Home page (all sections)             | High     |
| 4     | Backend - Auth + Services + Appointments APIs   | High     |
| 5     | Frontend - Services, About, Contact pages       | Medium   |
| 6     | Backend - Blog, Testimonials, Contact APIs      | Medium   |
| 7     | Frontend - Blog, FAQ pages                      | Medium   |
| 8     | Admin Dashboard                                 | Medium   |
| 9     | Testing, Responsive fixes, Animations polish    | High     |
| 10    | Deployment                                      | High     |

---

**Document Version:** 1.0
**Created:** 2026-04-04
**Reference Site:** https://primeautotraders.com/
