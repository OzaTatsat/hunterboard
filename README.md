# 🎯 HunterBoard

> A clean, modern dashboard for security researchers to track targets, vulnerabilities, and earnings.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

HunterBoard is a comprehensive dashboard solution designed for security researchers and bounty hunters. It streamlines the process of tracking targets, logging vulnerabilities with severity classifications, monitoring earnings, and maintaining detailed research notes—all in one intuitive interface.

Built with modern web technologies, HunterBoard provides a responsive, performant experience with persistent local storage for data management.

---

## ✨ Features

- 📊 **Live Dashboard** — Real-time statistics and analytics at a glance
- 🎯 **Target Tracking** — Manage and organize your security targets efficiently
- 🐛 **Vulnerability Logging** — Detailed vulnerability records with severity levels
- 💰 **Earnings Tracker** — Visual earnings analytics with charts and reports
- 📝 **Research Notes** — Master/detail view for comprehensive note management
- 💾 **Persistent Storage** — Automatic localStorage integration for data persistence
- 🎨 **Modern UI** — Clean, professional interface with smooth animations

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI Framework |
| **Vite** | 8.0.1 | Build Tool & Dev Server |
| **Tailwind CSS** | 4.2.2 | Utility-first CSS Framework |
| **React Router** | Latest | Client-side Routing |
| **Recharts** | 3.8.0 | Chart & Data Visualization |
| **Framer Motion** | Latest | Animation Library |
| **Lucide React** | 0.577.0 | Icon Library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hunterboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

---

## 📂 Project Structure

```
hunterboard/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── assets/           # Static assets (images, fonts)
│   ├── App.jsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── public/               # Public static files
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── README.md             # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for the security research community**