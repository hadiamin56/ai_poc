import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Building2, User, Mail, Phone, FileText, Briefcase, 
  MapPin, Globe, Lock, CheckCircle, AlertCircle, ArrowRight 
} from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    gstNumber: "",
    businessType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    website: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);

      setMessage({ type: "success", text: "Signup successful! Redirecting to login..." });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Signup failed" });
    }
  };

  const fields = [
    { name: "businessName", label: "Business Name", icon: Building2 },
    { name: "ownerName", label: "Owner Name", icon: User },
    { name: "email", label: "Email", type: "email", icon: Mail },
    { name: "phone", label: "Phone", icon: Phone },
    { name: "gstNumber", label: "GST Number", icon: FileText },
    { name: "businessType", label: "Business Type", icon: Briefcase },
    { name: "address", label: "Address", icon: MapPin },
    { name: "city", label: "City", icon: MapPin },
    { name: "state", label: "State", icon: MapPin },
    { name: "pincode", label: "Pincode", icon: MapPin },
    { name: "website", label: "Website", icon: Globe },
    { name: "password", label: "Password", type: "password", icon: Lock },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <Building2 className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center">Business Registration</h2>
          <p className="text-center text-blue-100 mt-2">Create your business account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                message.type === "success" 
                  ? "bg-green-50 border-2 border-green-200 text-green-800" 
                  : "bg-red-50 border-2 border-red-200 text-red-800"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-semibold">{message.text}</span>
            </div>
          )}

          {/* Business Information Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.slice(0, 6).map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location & Account Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              Location & Account Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.slice(6).map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Login Link */}
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
        </form>
      </div>
    </div>
  );
}