# Task Manager Frontend

A modern React frontend for the Task Manager application. Features a clean UI with authentication, task management and real-time updates.

## 🔗 Live Links

- **Live App:** https://taskmanager-fronte.netlify.app
- **Backend API:** https://task-manager-api-production-6b48.up.railway.app
- **Backend Repository:** https://github.com/DAYAL-HARSH/task-manager-api

## ✨ Features

- User registration and login with JWT authentication
- Protected dashboard route with auth loading state
- Create, complete and delete tasks
- AI-powered task suggestions using Groq + Llama 3
- Paginated task list with Previous/Next navigation
- Filter tasks by All, Active, Completed
- Accurate task statistics fetched from backend
- Persistent login with localStorage
- Responsive design with Tailwind CSS
- Error handling with user feedback
- Loading states throughout

## 🛠️ Technologies Used

- **Library:** React.js
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Deployment:** Netlify with CI/CD via GitHub

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Task Manager API running

### Installation

1. Clone the repository git clone https://github.com/DAYAL-HARSH/task-manager-frontend

2. Install dependencies 
- npm install

3. Update API URL in src/api/axios.js
```javascript
  const API = axios.create({
  baseURL: 'your-api-url'
})
```
4. Start development server
- npm start

5. App will open at
- http://localhost:3000

## 📁 Project Structure
task-manager-frontend/
├── public/
│   ├── index.html          # main HTML file
│   └── _redirects          # Netlify routing fix
├── src/
│   ├── api/
│   │   └── axios.js        # API configuration
│   ├── context/
│   │   └── AuthContext.js  # global auth state
│   ├── pages/
│   │   ├── Landing.js      # landing page
│   │   ├── Login.js        # login page
│   │   ├── Register.js     # register page
│   │   └── Dashboard.js    # main dashboard
│   ├── App.js              # routing setup
│   └── index.js            # entry point
└── package.json

## 🎨 Pages

### Landing Page
- Hero section with gradient background
- Feature highlights
- Navigation to login and register

### Login Page
- Email and password form
- Error handling
- Link to register page

### Register Page
- Name, email and password form
- Client side validation
- Link to login page

### Dashboard
- Paginated task list with Prev/Next controls
- AI suggest button — type a goal, get subtasks instantly
- Add task form with title and description
- Filter buttons (All/Active/Completed)
- Accurate task statistics from backend
- Logout button

## 👤 Author

**Harsh Dayal**
- GitHub: https://github.com/DAYAL-HARSH
- LinkedIn: https://www.linkedin.com/in/harsh-dayal-770862363
- Email: harshdayal149@gmail.com