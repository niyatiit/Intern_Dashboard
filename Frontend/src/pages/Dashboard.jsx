import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/dashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const result = await res.json();
        if (result.success === false) {
          alert(result.message);
        } else {
          setData(result);
        }
      } catch (err) {
        alert("Error fetching dashboard data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex flex-col justify-center items-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#64ffda] border-opacity-50"></div>
        <p className="mt-4 text-lg text-gray-300">Fetching your data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex justify-center items-center text-white">
        <p className="text-xl">No data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#112240] p-8 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-[#64ffda]">
          Welcome{data.username ? `, ${data.username}` : ""}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {data.email && (
            <div className="bg-[#0f172a] p-4 rounded-xl">
              <p className="text-gray-400">Email:</p>
              <p className="text-lg font-semibold">{data.email}</p>
            </div>
          )}

          {data.contactNo && (
            <div className="bg-[#0f172a] p-4 rounded-xl">
              <p className="text-gray-400">Contact No:</p>
              <p className="text-lg font-semibold">{data.contactNo}</p>
            </div>
          )}

          {data.referralCode && (
            <div className="bg-[#0f172a] p-4 rounded-xl">
              <p className="text-gray-400">Referral Code:</p>
              <p className="text-lg font-semibold">{data.referralCode}</p>
            </div>
          )}

          <div className="bg-[#0f172a] p-4 rounded-xl">
            <p className="text-gray-400">Total Donations:</p>
            <p className="text-lg font-semibold">₹{data.totalDonations || 0}</p>
          </div>
        </div>

        <div className="bg-[#0f172a] p-4 rounded-xl mt-6">
          <p className="text-xl font-semibold mb-2 text-[#64ffda]">
            Your Rewards
          </p>
          <ul className="list-disc list-inside space-y-1">
            {data.rewards && data.rewards.length > 0 ? (
              data.rewards.map((reward, index) => (
                <li key={index} className="text-white">
                  {reward}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No rewards yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
