import { Clock, UserCircle, Mail, Shield, CheckCircle } from "lucide-react";

export default function PendingUsers({ pendingUsers, handleApprove }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Pending Users</h2>
          <p className="text-sm text-gray-500 mt-1">
            {pendingUsers.length === 0 ? "All users approved" : `${pendingUsers.length} user${pendingUsers.length > 1 ? 's' : ''} awaiting approval`}
          </p>
        </div>
      </div>

      {pendingUsers.length === 0 ? (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <p className="text-lg font-semibold text-green-800 mb-2">All Caught Up!</p>
          <p className="text-sm text-green-600">No pending users to approve at the moment</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    Owner Name
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    Status
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pendingUsers.map((u) => (
                <tr 
                  key={u._id} 
                  className="hover:bg-amber-50 transition-colors border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-700 font-semibold text-sm">
                          {u.ownerName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800">{u.ownerName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">{u.email}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                      <Clock className="w-3 h-3" />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => handleApprove(u._id)} 
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}