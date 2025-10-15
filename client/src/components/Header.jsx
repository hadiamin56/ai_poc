import { LayoutDashboard, LogOut } from "lucide-react";

export default function Header({ user, logoutUser }) {
  // Determine what to display
  const getDisplayName = () => {
    if (!user) return "";
    if (user.role === "employee") return user.employeeName || "Employee";
    if (user.role === "admin") return user.ownerName || "Admin";
    return user.ownerName || "Super Admin";
  };

  const getSubInfo = () => {
    if (user.role === "employee")
      return user.businessName ? `${user.businessName}` : "Employee";
    return user.role?.replace("_", " ") || "Admin";
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
      <div className="flex justify-between items-center">
        {/* Left Side - Dashboard Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Welcome back!</p>
          </div>
        </div>

        {/* Right Side - User Info & Logout */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {getDisplayName()?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">
                {getDisplayName()}
              </p>
              <p className="text-xs text-gray-500">{getSubInfo()}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutUser}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
