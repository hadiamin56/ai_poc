import { useState } from "react";
import { 
  Shield, Building2, UserCircle, Mail, Phone, FileText, 
  Users, Edit2, Power, Trash2, Eye, X, Info
} from "lucide-react";

export default function SuperAdminAdminsTable({ admins, openEditModal, handleToggleStatus, handleDelete, openUsersModal }) {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const openDetailsModal = (admin) => {
    setSelectedAdmin(admin);
  };

  const closeDetailsModal = () => {
    setSelectedAdmin(null);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All Admins</h2>
          <p className="text-sm text-gray-500 mt-1">
            {admins.length === 0 ? "No admins registered" : `${admins.length} admin${admins.length > 1 ? 's' : ''} registered`}
          </p>
        </div>
      </div>

      {admins.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <Shield className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-2">No Admins Yet</p>
          <p className="text-sm text-gray-500">Admins will appear here once registered</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Business Name
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    Status
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    Users
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {admins.map((admin) => (
                <tr 
                  key={admin._id} 
                  className="hover:bg-indigo-50 transition-colors border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-700 font-semibold text-sm">
                          {admin.businessName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800">{admin.businessName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      admin.status === "approved" 
                        ? "bg-green-100 text-green-700" 
                        : admin.status === "disabled"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      <Shield className="w-3 h-3" />
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                      {admin.userCount || 0}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 flex-wrap justify-center">
                      <button
                        onClick={() => openDetailsModal(admin)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                        title="View Details"
                      >
                        <Info className="w-4 h-4" />
                        Details
                      </button>
                      <button
                        onClick={() => openEditModal(admin)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                        title="Edit Admin"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(admin._id)}
                        className={`px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 ${
                          admin.status === "disabled"
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                            : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                        }`}
                        title={admin.status === "disabled" ? "Enable Admin" : "Disable Admin"}
                      >
                        <Power className="w-4 h-4" />
                        {admin.status === "disabled" ? "Enable" : "Disable"}
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                        title="Delete Admin"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                      <button
                        onClick={() => openUsersModal(admin._id)}
                        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                        title="View Admin's Users"
                      >
                        <Eye className="w-4 h-4" />
                        View Users
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Admin Details</h2>
                    <p className="text-sm text-indigo-100 mt-1">{selectedAdmin.businessName}</p>
                  </div>
                </div>
                <button
                  onClick={closeDetailsModal}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Business Name
                  </label>
                  <p className="text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg">
                    {selectedAdmin.businessName}
                  </p>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    Owner Name
                  </label>
                  <p className="text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg">
                    {selectedAdmin.ownerName}
                  </p>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </label>
                  <p className="text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg break-all">
                    {selectedAdmin.email}
                  </p>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Phone
                  </label>
                  <p className="text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg">
                    {selectedAdmin.phone}
                  </p>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    GST Number
                  </label>
                  <p className="text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg">
                    {selectedAdmin.gstNumber}
                  </p>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    Status
                  </label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedAdmin.status === "approved" 
                        ? "bg-green-100 text-green-700" 
                        : selectedAdmin.status === "disabled"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      <Shield className="w-3 h-3" />
                      {selectedAdmin.status}
                    </span>
                  </div>
                </div>

                <div className="group md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    User Count
                  </label>
                  <p className="text-gray-800 font-medium bg-gray-50 px-4 py-3 rounded-lg">
                    {selectedAdmin.userCount || 0} user{selectedAdmin.userCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t-2 border-gray-200 p-6 bg-gray-50 flex justify-end">
              <button
                onClick={closeDetailsModal}
                className="px-6 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}