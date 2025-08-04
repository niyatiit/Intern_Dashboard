// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <div className="font-sans overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 🛡️ Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer/>
    </div>
  );
}
