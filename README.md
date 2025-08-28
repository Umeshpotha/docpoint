# 🏥 Docpoint – Doctor Appointment Made Easy

[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/Auth-NextAuth.js-blueviolet)](https://next-auth.js.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Docpoint** is a modern web application for booking doctor appointments seamlessly.  
Built with **Next.js 13 App Router**, **NextAuth**, and **Tailwind CSS**, it provides a secure, responsive, and user-friendly platform for patients to connect with doctors and hospitals.

---

## ✨ Features

- 🔐 **Authentication & Authorization**  
  - Secure login and signup via **NextAuth**  
  - Username verification during signup  

- 📅 **Appointment Booking**  
  - Search hospitals and doctors  
  - Check doctor availability  
  - Book appointments in real-time  
  - View scheduled appointments  

- 🏥 **Hospital & Doctor Directory**  
  - Explore hospitals (`/hospital/[name]`)  
  - Fetch doctor and hospital details via API  

- 📩 **Messaging & Notifications**  
  - API for accepting messages (`/api/accept-messages`)  
  - Success page after booking/registration  

- 📄 **Informational Pages**  
  - About, Contact, Privacy Policy  

- 📊 **Dashboard**  
  - Personalized dashboard for managing appointments  

---

## 🛠️ Tech Stack

- **Frontend & Framework**: [Next.js 13+ (App Router)](https://nextjs.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)  
- **Database**: (MongoDB  – configure via `DATABASE_URL`)  
- **Deployment**: [Vercel](https://vercel.com/)  

---
## 📂 Project Structure (simplified)
```
src/
├─ app/
│ ├─ (app)/ # Core pages (about, contact, dashboard, hospital, schedule, success)
│ ├─ (auth)/ # Authentication (sign-in, sign-up, verify)
│ ├─ api/ # API routes for booking, doctors, hospitals, auth, etc.
│ ├─ globals.css # Global styles
│ └─ layout.tsx # Root layout
├─ middleware.ts # Middleware for auth/session handling
```
---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Umeshpotha/docpoint.git
cd docpoint
npm install
```

