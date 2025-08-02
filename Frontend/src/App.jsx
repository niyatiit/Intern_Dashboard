// src/App.jsx
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import './index.css'

export default function App() {
  const currentPath = window.location.pathname;
  const isLoggedIn = !!localStorage.getItem("userId");

  let content;
  if (currentPath === "/signup") content = <Signup />;
  else if (currentPath === "/login") content = <Login />;
  else content = <Dashboard />;

  return (
     <div className="font-sans overflow-hidden">
      <Navbar isLoggedIn={isLoggedIn} />
      {content}
    </div>
  );
}
