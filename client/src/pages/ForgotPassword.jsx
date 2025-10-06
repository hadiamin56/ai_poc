import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSending(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage({ type: "success", text: res.data.message });
      setEmail(""); // clear input on success
    } catch (err) {
      // If email doesn't exist, backend returns 404 with message "User not found"
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to send reset link",
      });
    } finally {
      setSending(false);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={sending}
            className={`w-full py-3 rounded text-white ${
              sending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {sending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
         <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
      </div>
    </div>
  );
}
