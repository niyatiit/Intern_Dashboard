import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("userId", data.userId);
        alert("Login Successful!");
        window.location.href = "/";
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a192f] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#14213d] p-8 rounded-xl w-full max-w-md shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-[#1f2a44] text-white"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-[#1f2a44] text-white"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
