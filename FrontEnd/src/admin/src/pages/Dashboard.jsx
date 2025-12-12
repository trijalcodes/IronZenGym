import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // 🔥 Ensure axios ALWAYS sends cookies across domains
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://ironzengym-1.onrender.com";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/dashboard");

        // If backend says unauthorized, redirect
        if (!res.data?.stats) {
          navigate("/login");
          return;
        }

        setStats(res.data.stats);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);

        // If session expired, redirect to login
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          navigate("/login");
          return;
        }
      }
    };

    fetchDashboard();
  }, []);

  if (!stats)
    return (
      <div className="text-white text-center mt-10">
        ACCESS DENIED (LOG IN FIRST USING LOGIN PAGE)
      </div>
    );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card title="📥 Total Messages" value={stats.totalContacts} />
          <Card title="🧑‍🤝‍🧑 Total Members" value={stats.totalMembers} />
          <Card title="🪪 Active Plans" value={stats.totalPlans} />
          <Card title="💰 Total Revenue" value={`₹${stats.totalRevenue}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentList
            title="Latest Members"
            list={stats.latestMembers}
            fields={["name", "mobile", "plan"]}
          />
          <RecentList
            title="Recent Messages"
            list={stats.latestContacts}
            fields={["name", "email", "message"]}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-600/30">
      <h3 className="text-lg text-gray-400">{title}</h3>
      <p className="text-3xl font-bold text-emerald-400 mt-2">{value}</p>
    </div>
  );
}

function RecentList({ title, list, fields }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-600/20">
      <h3 className="text-xl text-purple-400 mb-4 font-semibold">{title}</h3>
      <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {list.map((item, i) => (
          <li key={i} className="bg-gray-800 p-3 rounded-md text-sm">
            {fields.map((f, idx) => (
              <div key={idx}>
                <span className="text-gray-400">{f}:</span> {item[f]}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
