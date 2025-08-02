// src/components/Navbar.jsx
export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="bg-[#14213d] text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Dashboard</h1>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <a href="/signup" className="hover:underline">Signup</a>
            <a href="/login" className="hover:underline">Login</a>
          </>
        ) : (
          <>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
            <button
              onClick={() => {
                localStorage.removeItem("userId");
                window.location.reload();
              }}
              className="hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
