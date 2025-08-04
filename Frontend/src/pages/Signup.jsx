import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false); // 👈 Password toggle state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Registration Successfully");
        setFormData({
          username: "",
          email: "",
          password: "",
          contactNumber: "",
        });
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
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
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded bg-[#1f2a44] text-white"
          onChange={handleChange}
          value={formData.username}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-[#1f2a44] text-white"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-[#1f2a44] text-white pr-10"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-300"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <input
          type="number"
          name="contactNumber"
          placeholder="Contact No"
          className="w-full p-2 rounded bg-[#1f2a44] text-white"
          onChange={handleChange}
          value={formData.contactNumber}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
