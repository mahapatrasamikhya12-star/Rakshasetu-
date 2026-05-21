import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await axios.post("http://localhost:5000/api/auth/register", form)
      setSuccess("Account created! Redirecting to login...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-1 text-center">Create Account</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Join Rakshasetu. Safety in your hands.</p>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-50 py-2 rounded-lg">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center bg-green-50 py-2 rounded-lg">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password min 6 characters"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
