import { Users, UserCircle, Mail, Phone, FileText, MapPin, Briefcase, Building2 } from "lucide-react";

export default function SubUsersTable({ subUsers }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Sub-Users</h2>
          <p className="text-sm text-gray-500 mt-1">
            {subUsers.length === 0 ? "No sub-users yet" : `${subUsers.length} team member${subUsers.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {subUsers.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-2">No Sub-Users Yet</p>
          <p className="text-sm text-gray-500">Create your first sub-user to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    Employee Name
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
                    <Phone className="w-4 h-4 text-gray-500" />
                    Contact
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    GST Number
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Pincode
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    Business Type
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Business Address
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {subUsers.map((u, idx) => (
                <tr 
                  key={u._id} 
                  className="hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-700 font-semibold text-sm">
                          {u.employeeName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800">{u.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">{u.email}</td>
                  <td className="px-4 py-4 text-gray-700">{u.contactNumber}</td>
                  <td className="px-4 py-4 text-gray-700">
                    {u.gstNumber || <span className="text-gray-400 italic">N/A</span>}
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {u.pincode || <span className="text-gray-400 italic">N/A</span>}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{u.businessType}</td>
                  <td className="px-4 py-4 text-gray-700">{u.businessUnitAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}