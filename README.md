# 📚 MDAN Library - Book Management System

A modern, full-featured library management system built with Vue 3, Firebase, and beautiful UI design.

## ✨ Features

- 📖 **Book Management** - Add, edit, delete, and browse books
- 🔐 **Firebase Authentication** - Secure user registration and login
- 📊 **Statistics Dashboard** - Track your library collection
- 🌤️ **Weather Integration** - Check weather conditions
- 🔥 **Real-time Database** - Powered by Firebase Firestore
- 🎨 **Modern UI** - Beautiful blue/cyan design with orange accents
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v20.19.0 or >=22.12.0)
- npm or yarn
- A Firebase account

### Installation

1. Clone the repository:

```sh
git clone <your-repo-url>
cd mdan-library
```

2. Install dependencies:

```sh
npm install
```

3. Set up Firebase (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)):
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Update `src/firebase/init.js` with your config

4. Run development server:

```sh
npm run dev
```

5. Open http://localhost:5173 in your browser

## 📁 Project Structure

```
mdan-library/
├── src/
│   ├── components/     # Reusable Vue components
│   │   ├── BHeader.vue      # Navigation header
│   │   └── BookList.vue     # Book list component
│   ├── views/          # Page components
│   │   ├── HomeView.vue     # Home page with add book form
│   │   ├── FirebaseRegisterView.vue  # User registration
│   │   ├── FirebaseSigninView.vue    # User sign in
│   │   ├── GetBookCountView.vue      # Book statistics
│   │   ├── WeatherView.vue           # Weather dashboard
│   │   ├── CountBookAPI.vue          # API count endpoint
│   │   └── GetAllBookAPI.vue         # API books endpoint
│   ├── firebase/       # Firebase configuration
│   │   └── init.js          # Firebase initialization
│   ├── router/         # Vue Router configuration
│   │   └── index.js         # Route definitions
│   ├── assets/         # Static assets
│   │   ├── main.css         # Global styles
│   │   └── base.css         # Base styles
│   ├── App.vue         # Root component
│   └── main.js         # App entry point
├── public/             # Public static files
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## 🛠️ Available Scripts

### Development

```sh
npm run dev      # Start development server
```

### Production

```sh
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Quality

```sh
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🎨 Design System

### Color Palette

- **Primary:** Blue to Cyan gradient (#0ea5e9 → #06b6d4 → #14b8a6)
- **Accent:** Orange to Coral gradient (#f97316 → #fb923c)
- **Success:** Emerald green (#10b981)
- **Dark:** Slate gray (#1e293b)

### Tech Stack

- **Frontend:** Vue 3 (Composition API)
- **Routing:** Vue Router 4
- **Backend:** Firebase (Firestore + Authentication)
- **Build Tool:** Vite 7
- **Styling:** Custom CSS with modern features
- **HTTP Client:** Axios

## 📝 Firebase Setup

See detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

**Quick Steps:**

1. Create Firebase project at https://console.firebase.google.com/
2. Enable Email/Password authentication
3. Create Firestore database
4. Update `src/firebase/init.js` with your configuration

## 🔐 Authentication

The app includes complete authentication flow:

- User registration with email/password
- User sign-in
- Current user display
- Error handling for common auth issues

## 📚 Book Features

- Add books via Cloud Function
- List all books with filtering
- Edit book details
- Delete books
- Query books by ISBN, name, or limit

## 🌐 API Integration

- Weather API integration (OpenWeatherMap)
- Firebase Cloud Functions endpoints
- Real-time data synchronization

## 📱 Responsive Design

Fully responsive design that works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

This is a personal project. Feel free to fork and customize!

## 📄 License

Private project - All rights reserved

## 👤 Author

**Mandeep (MDAN)**

---

Built with ❤️ using Vue.js & Firebase
