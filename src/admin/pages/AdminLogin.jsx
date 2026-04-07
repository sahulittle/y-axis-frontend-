import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../shared/api/auth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      if (data?.user?.role !== "admin") {
        throw new Error("You do not have admin access");
      }
      navigate("/admin/dashboard");
    } catch (apiError) {
      setError(apiError.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-200">
        <p className="text-xs uppercase tracking-[0.22em] text-orange-500 font-semibold">Y-Axis</p>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Admin Login</h1>
        <p className="text-sm text-slate-500 mt-2">Use your admin credentials to continue.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
              placeholder="admin@yaxis.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
              placeholder="Enter password"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 text-white font-semibold py-3 hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
