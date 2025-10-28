# Ticket Web App - React Implementation

A full-featured ticket management system built with React, featuring authentication, CRUD operations, and a modern responsive UI.

## 🚀 Features

- **Landing Page** - Hero section with animated wavy background and decorative elements
- **Authentication System** - Login and Signup with form validation
- **Dashboard** - Overview of ticket statistics (Total, Open, In Progress, Closed)
- **Ticket Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Protected Routes** - Secure access to authenticated pages
- **Real-time Validation** - Inline error messages and toast notifications
- **Responsive Design** - Mobile-first design with max-width: 1440px on large screens
- **LocalStorage Persistence** - Data stored in browser localStorage

## 🛠️ Technologies Used

- **React 19.2.0** - Frontend framework
- **React Router DOM 7.9.4** - Client-side routing
- **Vite 7.1.12** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables
- **Font Awesome 6.0.0** - Icons
- **LocalStorage API** - Data persistence

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd ticket-app-react
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
   - The app will be available at `http://localhost:5173`
   - The terminal will display the exact URL

## 📖 Usage Guide

### Test User Credentials

The app comes with pre-configured test users:

- **Email:** admin@ticketapp.com  
  **Password:** admin123

- **Email:** user@test.com  
  **Password:** password123

Or create your own account using the Sign Up form.

### Creating Tickets

1. Log in to your account
2. Navigate to "Manage Tickets"
3. Click "Create New Ticket"
4. Fill in the required fields:
   - **Title** (required)
   - **Description** (optional)
   - **Status** (required: open, in_progress, closed)
   - **Priority** (low, medium, high)
5. Click "Create Ticket"

### Managing Tickets

- **View All Tickets** - See all tickets in card layout
- **Edit Ticket** - Click "Edit" button on any ticket card
- **Delete Ticket** - Click "Delete" button with confirmation dialog
- **Filter by Status** - Tickets are color-coded by status

## 🎨 Design Features

### Layout Specifications

- **Max Width:** 1440px (centered on large screens)
- **Hero Section:** Animated SVG wave background
- **Decorative Elements:** Floating circles with animations
- **Card Design:** Box shadows and rounded corners
- **Status Colors:**
  - Open: Green (#2ecc71)
  - In Progress: Amber (#f39c12)
  - Closed: Gray (#95a5a6)

### Responsive Breakpoints

- **Desktop:** > 768px (multi-column grid)
- **Tablet:** 481px - 768px (adjusted layout)
- **Mobile:** < 480px (single column, stacked)

## 🔒 Security & Authentication

### Session Management

- Sessions stored in `localStorage` with key: `ticketapp_session`
- Session includes: email, name, token, timestamp
- Automatic logout on session expiry

### Protected Routes

- Dashboard and Ticket Management pages require authentication
- Unauthorized users redirected to `/auth/login`
- Auth page redirects logged-in users to Dashboard

### Data Validation

#### Ticket Validation
- Title: Required, non-empty string
- Status: Required, must be one of: "open", "in_progress", "closed"
- Description: Optional, max 500 characters

#### Auth Validation
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Name: Required for signup

## 📁 Project Structure

```
ticket-app-react/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Toast.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/          # Page components
│   │   ├── Landing.jsx
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   └── Tickets.jsx
│   ├── styles/         # CSS files
│   │   └── App.css
│   ├── utils/          # Helper functions
│   │   └── helpers.js
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
└── README.md           # Documentation
```

## 🔄 State Management

- **Local Component State** - useState for component-level data
- **LocalStorage** - Persistent storage for:
  - User sessions (`ticketapp_session`)
  - Tickets (`ticketapp_tickets`)
  - Users database (`ticketapp_users`)

## ⚠️ Error Handling

### Types of Errors Handled

1. **Validation Errors**
   - Inline error messages beneath form fields
   - Real-time validation on input change

2. **Authentication Errors**
   - Invalid credentials
   - Duplicate email on signup
   - Toast notifications for errors

3. **Authorization Errors**
   - Session expiry detection
   - Automatic redirect to login
   - Clear error messages

4. **Data Errors**
   - Ticket not found
   - Failed CRUD operations
   - Graceful fallbacks

## 🌐 Routing Structure

- `/` - Landing page (public)
- `/auth` - Login/Signup page (public, redirects if authenticated)
- `/dashboard` - Dashboard overview (protected)
- `/tickets` - Ticket management (protected)

## 🎯 Accessibility Features

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Sufficient color contrast ratios
- Alt text for icons (via Font Awesome)

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🐛 Known Issues

- LocalStorage data persists across sessions (by design)
- No server-side validation (client-only app)
- Session tokens are base64 encoded, not cryptographically secure
- No pagination for large ticket lists

## 📝 Notes

- This is a frontend-only implementation using mock authentication
- Data is stored in browser localStorage and will persist until cleared
- No backend server required for development or deployment
- For production use, connect to a real backend API

## 🤝 Contributing

This project was built as part of a frontend development task. Feel free to extend or modify for your own use.

## 📄 License

ISC

## 👤 Author

Built with ❤️ for the Multi-Framework Ticket Web App Challenge

---

**Last Updated:** October 2025
# ticket-app-react
# ticket-app-react
