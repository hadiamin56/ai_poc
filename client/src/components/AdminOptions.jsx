import { UserPlus, Upload, AlertCircle, User, Mail, Phone, FileText, MapPin, Briefcase, Lock, Building2 } from "lucide-react";

export default function AdminOptions({
  user,
  adminOption,
  setAdminOption,
  form,
  handleChange,
  handleSubmit,
  file,
  handleFileChange,
  handleFileUpload
}) {
  const fieldConfig = {
    employeeName: { icon: User, label: "Employee Name" },
    email: { icon: Mail, label: "Email", type: "email" },
    contactNumber: { icon: Phone, label: "Contact Number" },
    gstNumber: { icon: FileText, label: "GST Number" },
    pincode: { icon: MapPin, label: "Pincode" },
    businessType: { icon: Briefcase, label: "Business Type" },
    businessUnitAddress: { icon: Building2, label: "Business Unit Address" },
    password: { icon: Lock, label: "Password", type: "password" }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Options</h2>
        <p className="text-center text-gray-500 text-sm">Manage sub-users and invoices</p>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setAdminOption("subuser")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
            adminOption === "subuser" 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
              : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
          }`}
        >
          <UserPlus className="w-5 h-5" />
          Create Sub-User
        </button>
        <button
          onClick={() => setAdminOption("invoice")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
            adminOption === "invoice" 
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" 
              : "bg-white border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600"
          }`}
        >
          <Upload className="w-5 h-5" />
          Upload Invoice
        </button>
      </div>

      {/* Sub-User Section */}
      {adminOption === "subuser" && (
        <div className="max-w-3xl mx-auto">
          {user.status !== "approved" ? (
            <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-6 rounded-xl flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-lg mb-1">Account Under Review</p>
                <p className="text-sm">Your account is pending approval. You cannot create sub-users yet.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Create New Sub-User</p>
                  <p className="text-sm text-blue-700">Add a new team member to your account</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(fieldConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    const isRequired = key !== "gstNumber" && key !== "pincode";
                    
                    return (
                      <div key={key} className={key === "businessUnitAddress" ? "md:col-span-2" : ""}>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          {config.label} {isRequired && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Icon className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            name={key}
                            type={config.type || "text"}
                            placeholder={`Enter ${config.label.toLowerCase()}`}
                            value={form[key]}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required={isRequired}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all mt-6 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Sub-User
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Invoice Upload Section */}
      {adminOption === "invoice" && (
        <div className="max-w-2xl mx-auto">
          {user.status !== "approved" ? (
            <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-6 rounded-xl flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-lg mb-1">Account Not Approved</p>
                <p className="text-sm">Your account is not approved yet. You cannot upload invoices.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-900">Upload Invoice</p>
                  <p className="text-sm text-green-700">Upload and process your invoice documents</p>
                </div>
              </div>

              <form onSubmit={handleFileUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Select Invoice File
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-green-400 transition-colors">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FileText className="w-8 h-8 text-green-600" />
                      </div>
                      {file ? (
                        <div className="text-center">
                          <p className="font-semibold text-green-700">{file.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="font-semibold text-gray-700">Click to select file</p>
                          <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Invoice
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}