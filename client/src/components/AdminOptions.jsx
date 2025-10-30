
//ye working code h till sunday





// import { useState, useEffect, useRef } from "react";
// import {
//   UserPlus, Upload, AlertCircle, User, Mail, Phone, FileText,
//   MapPin, Briefcase, Lock, Building2, Save, X
// } from "lucide-react";
// import axios from "axios";
// import SubUsersTable from "./SubUsersTable";

// export default function AdminOptions({
//   user,
//   adminOption,
//   setAdminOption,
//   form,
//   handleChange,
//   handleSubmit,
//   file,
//   handleFileChange,
//   subUsers
// }) {
//   const [uploading, setUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [parsedData, setParsedData] = useState({});
//   const [rawParsedData, setRawParsedData] = useState({});
//   const [imagePath, setImagePath] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadedByName, setuploadedByName] = useState("");
//   const [userInvoices, setUserInvoices] = useState([]); // Footer invoices

//   const fileInputRef = useRef(null); // NEW: ref for file input

//   const fieldConfig = {
//     employeeName: { icon: User, label: "Employee Name" },
//     email: { icon: Mail, label: "Email", type: "email" },
//     contactNumber: { icon: Phone, label: "Contact Number" },
//     gstNumber: { icon: FileText, label: "GST Number" },
//     pincode: { icon: MapPin, label: "Pincode" },
//     businessType: { icon: Briefcase, label: "Business Type" },
//     businessUnitAddress: { icon: Building2, label: "Business Unit Address" },
//     password: { icon: Lock, label: "Password", type: "password" }
//   };

//   const flattenData = (obj, prefix = "") => {
//     let result = {};
//     for (let key in obj) {
//       if (typeof obj[key] === "object" && obj[key] !== null) {
//         if (Array.isArray(obj[key])) {
//           result[`${prefix}${key}`] = JSON.stringify(obj[key], null, 2);
//         } else {
//           Object.assign(result, flattenData(obj[key], `${prefix}${key}.`));
//         }
//       } else {
//         result[`${prefix}${key}`] = obj[key];
//       }
//     }
//     return result;
//   };

//   const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = () => setIsDragging(false);
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files?.[0]) handleFileChange({ target: { files: e.dataTransfer.files } });
//   };

//   const handleAdminFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setErrorMessage("⚠️ Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);
//       setUploadMessage("Uploading file...");
//       setErrorMessage("");

//       const res = await axios.post(
//         "http://localhost:5000/api/files/upload",
//         formData,
//         { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const data = res.data;
//       if (!data.success) throw new Error(data.message || "Upload failed");

//       setUploadMessage("Processing OCR...");
//       const raw = data.parsedJson || data;
//       setRawParsedData(raw);
//       setParsedData(flattenData(raw));
//       setImagePath(data.file?.path || "");
//       setModalOpen(true);
//       setUploadMessage("✅ Done!");
//       fetchUserInvoices(); // Refresh footer invoices after upload
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || err.message || "Upload failed");
//     } finally {
//       setUploading(false);
//       setUploadMessage("");
//     }
//   };

//   const handleFieldChange = (e, field) => {
//     setParsedData({ ...parsedData, [field]: e.target.value });
//   };

//   const handleSaveInvoice = async () => {
//     try {
//       setErrorMessage("");
//       const res = await axios.post(
//         "http://localhost:5000/api/files/save-invoice",
//         {
//           parsedData: rawParsedData,
//           imagePath,
//           uploadedByName,
//           uploadedBy: user.role === "admin" ? null : user._id
//         },
//         { withCredentials: true }
//       );

//       if (!res.data.success) throw new Error(res.data.message || "Save failed");

//       alert("✅ Invoice saved!");
//       setModalOpen(false);
//       handleFileChange({ target: { files: [] } });
//       setParsedData({});
//       setRawParsedData({});
//       setImagePath("");
//       setuploadedByName("");
//       // NEW: reset actual input value
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       fetchUserInvoices();
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || err.message || "Save failed");
//     }
//   };

//   const fetchUserInvoices = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/files/all-invoices", { withCredentials: true });
//       if (res.data.success) {
//         const invoices = res.data.invoices.map(inv => ({
//           ...inv,
//           uploadedBy: inv.uploadedByName || inv.employeeName || "Admin",
//           fileName: inv.imagePath?.split("/").pop() || "Invoice"
//         }));
//         setUserInvoices(invoices);
//       }
//     } catch (err) {
//       console.error("Error fetching invoices:", err);
//     }
//   };

//   useEffect(() => {
//     if (adminOption === "invoice") {
//       fetchUserInvoices();
//     }
//   }, [adminOption]);

//   return (
//     <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Options</h2>
//         <p className="text-center text-gray-500 text-sm">Manage sub-users and invoices</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         <button
//           onClick={() => setAdminOption("subuser")}
//           className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//             adminOption === "subuser"
//               ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
//               : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
//           }`}
//         >
//           <UserPlus className="w-5 h-5" />
//           Create Sub-User
//         </button>
//         <button
//           onClick={() => setAdminOption("invoice")}
//           className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//             adminOption === "invoice"
//               ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
//               : "bg-white border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600"
//           }`}
//         >
//           <Upload className="w-5 h-5" />
//           Upload Invoice
//         </button>
//       </div>

//       {/* Subuser Section */}
//       {adminOption === "subuser" && (
//         <>
//           {user.status !== "approved" ? (
//             <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-6 rounded-xl flex items-start gap-3 shadow-sm">
//               <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
//               <div>
//                 <p className="font-semibold text-lg mb-1">Account Under Review</p>
//                 <p className="text-sm">Your account is pending approval. You cannot create sub-users yet.</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="max-w-3xl mx-auto">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {Object.entries(fieldConfig).map(([key, config]) => {
//                       const Icon = config.icon;
//                       const isRequired = key !== "gstNumber" && key !== "pincode";
//                       return (
//                         <div key={key} className={key === "businessUnitAddress" ? "md:col-span-2" : ""}>
//                           <label className="block text-sm font-semibold text-gray-600 mb-2">
//                             {config.label} {isRequired && <span className="text-red-500">*</span>}
//                           </label>
//                           <div className="relative">
//                             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                               <Icon className="w-5 h-5 text-gray-400" />
//                             </div>
//                             <input
//                               name={key}
//                               type={config.type || "text"}
//                               placeholder={`Enter ${config.label.toLowerCase()}`}
//                               value={form[key]}
//                               onChange={handleChange}
//                               className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                               required={isRequired}
//                             />
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all mt-6 flex items-center justify-center gap-2"
//                   >
//                     <UserPlus className="w-5 h-5" /> Create Sub-User
//                   </button>
//                 </form>
//               </div>

//               {subUsers && subUsers.length > 0 && (
//                 <div className="mt-8 w-full px-2 md:px-4">
//                   <SubUsersTable subUsers={subUsers} />
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}

//       {/* Invoice Section */}
//       {adminOption === "invoice" && (
//         <>
//           {/* Centered Upload Form */}
//           <div className="max-w-3xl mx-auto">
//             {user.status !== "approved" ? (
//               <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-6 rounded-xl flex items-start gap-3 shadow-sm">
//                 <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="font-semibold text-lg mb-1">Account Not Approved</p>
//                   <p className="text-sm">Your account is not approved yet. You cannot upload invoices.</p>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <form onSubmit={handleAdminFileUpload} className="space-y-4">
//                   <div
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                     className={`relative border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer ${
//                       isDragging
//                         ? "border-green-500 bg-green-50"
//                         : file
//                         ? "border-green-400 bg-green-50"
//                         : "border-gray-300 bg-gray-50"
//                     }`}
//                   >
//                     {file ? (
//                       <p className="text-green-700 font-semibold">{file.name}</p>
//                     ) : (
//                       <p className="text-gray-700">Drag & drop or click to select a file</p>
//                     )}
//                     <input
//                       type="file"
//                       ref={fileInputRef} // NEW
//                       onChange={(e) => {
//                         handleFileChange(e);
//                         if (e.target.files.length > 0) setErrorMessage("");
//                       }}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                   </div>

//                   {errorMessage && (
//                     <div className="w-full mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
//                       {errorMessage}
//                     </div>
//                   )}

//                   <button
//                     type="submit"
//                     disabled={uploading}
//                     className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
//                   >
//                     <Upload className="w-5 h-5" />
//                     {uploading ? uploadMessage || "Processing..." : "Upload & Process"}
//                   </button>
//                 </form>
//               </>
//             )}
//           </div>

//           {/* Full Width Footer Table */}
//           {userInvoices && userInvoices.length > 0 && (
//             <div className="mt-10 w-full overflow-x-auto px-4">
//               <h3 className="text-xl font-semibold mb-3 text-gray-700">All Employee Invoices</h3>
//               <table className="w-full bg-white border border-gray-200 rounded-lg">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="py-2 px-4 border-b">Invoice Number</th>
//                     <th className="py-2 px-4 border-b">Vendor Name</th>
//                     <th className="py-2 px-4 border-b">Total Amount</th>
//                     <th className="py-2 px-4 border-b">Uploaded By</th>
//                     <th className="py-2 px-4 border-b">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userInvoices.map((inv, idx) => (
//                     <tr key={idx} className="text-center">
//                       <td className="py-2 px-4 border-b">{inv.invoiceNumber}</td>
//                       <td className="py-2 px-4 border-b">{inv.vendorName}</td>
//                       <td className="py-2 px-4 border-b">{inv.totalAmount}</td>
//                       <td className="py-2 px-4 border-b">{inv.uploadedBy}</td>
//                       <td className="py-2 px-4 border-b">
//                         {new Date(inv.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}

//       {/* Review Modal */}
//       {modalOpen && parsedData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
//             <div className="bg-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
//               <h3 className="text-xl font-bold">Review Invoice</h3>
//               <button onClick={() => setModalOpen(false)}>
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="p-6 flex flex-col gap-4">
//               {Object.keys(parsedData).map((field) => (
//                 <div key={field}>
//                   <label className="text-sm font-semibold">{field}</label>
//                   <textarea
//                     value={parsedData[field]}
//                     onChange={(e) => handleFieldChange(e, field)}
//                     className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
//                     rows={
//                       Array.isArray(parsedData[field]) ||
//                       (parsedData[field] && String(parsedData[field]).includes("\n"))
//                         ? 4
//                         : 1
//                     }
//                   />
//                 </div>
//               ))}
//               <div>
//                 <label className="text-sm font-semibold">Uploaded / Verified By</label>
//                 <input
//                   type="text"
//                   value={uploadedByName}
//                   onChange={(e) => setuploadedByName(e.target.value)}
//                   className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
//                   placeholder="Enter name"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 p-6 border-t-2 border-gray-200 bg-gray-50">
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="px-6 py-2 rounded-lg border-2 border-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveInvoice}
//                 className="px-6 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2"
//               >
//                 <Save className="w-5 h-5" /> Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// above is working code till sunday





// now delete botton k liye chnages


import { useState, useEffect, useRef } from "react";
import {
  UserPlus, Upload, AlertCircle, User, Mail, Phone, FileText,
  MapPin, Briefcase, Lock, Building2, Save, X, Trash2
} from "lucide-react";
import axios from "axios";
import SubUsersTable from "./SubUsersTable";

export default function AdminOptions({
  user,
  adminOption,
  setAdminOption,
  form,
  handleChange,
  handleSubmit,
  file,
  handleFileChange,
  subUsers
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [rawParsedData, setRawParsedData] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedByName, setUploadedByName] = useState("");
  const [userInvoices, setUserInvoices] = useState([]);

  const fileInputRef = useRef(null);

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

  // Flatten nested JSON
  const flattenData = (obj, prefix = "") => {
    let result = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          result[`${prefix}${key}`] = obj[key].join(", ");
        } else {
          Object.assign(result, flattenData(obj[key], `${prefix}${key}.`));
        }
      } else {
        result[`${prefix}${key}`] = obj[key];
      }
    }
    return result;
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const handleAdminFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("⚠️ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadMessage("Uploading file...");
      setErrorMessage("");

      const res = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = res.data;
      if (!data.success) throw new Error(data.message || "Upload failed");

      setUploadMessage("Processing OCR...");
      const raw = data.parsedJson || data;
      setRawParsedData(raw);
      setParsedData(flattenData(raw));
      setImagePath(data.file?.path || "");
      setModalOpen(true);
      setUploadMessage("✅ Done!");
      fetchUserInvoices();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || "Upload failed");
    } finally {
      setUploading(false);
      setUploadMessage("");
    }
  };

  const handleFieldChange = (e, field) => {
    setParsedData({ ...parsedData, [field]: e.target.value });
  };

  const handleSaveInvoice = async () => {
    try {
      setErrorMessage("");
      const res = await axios.post(
        "http://localhost:5000/api/files/save-invoice",
        {
          parsedData: rawParsedData,
          imagePath,
          uploadedByName,
          uploadedBy: user._id
        },
        { withCredentials: true }
      );

      if (!res.data.success) throw new Error(res.data.message || "Save failed");

      alert("✅ Invoice saved!");
      setModalOpen(false);
      handleFileChange({ target: { files: [] } });
      setParsedData({});
      setRawParsedData({});
      setImagePath("");
      setUploadedByName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchUserInvoices();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || "Save failed");
    }
  };

  const fetchUserInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/files/all-invoices", { withCredentials: true });
      if (res.data.success) {
        const invoices = res.data.invoices.map(inv => ({
          ...inv,
          uploadedBy: inv.uploadedByName || inv.employeeName || "Admin",
          fileName: inv.imagePath?.split("/").pop() || "Invoice"
        }));
        setUserInvoices(invoices);
      }
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  const handleDeleteInvoice = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/files/delete-invoice/${id}`, { withCredentials: true });
      fetchUserInvoices();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Delete failed");
    }
  };

  useEffect(() => {
    if (adminOption === "invoice") fetchUserInvoices();
  }, [adminOption]);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
      {/* Tabs */}
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

      {/* Subuser Section */}
      {adminOption === "subuser" && (
        <>
          {user.status !== "approved" ? (
            <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-6 rounded-xl flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-lg mb-1">Account Under Review</p>
                <p className="text-sm">Your account is pending approval. You cannot create sub-users yet.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-3xl mx-auto">
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
                    <UserPlus className="w-5 h-5" /> Create Sub-User
                  </button>
                </form>
              </div>
              {subUsers && subUsers.length > 0 && (
                <div className="mt-8 w-full px-2 md:px-4">
                  <SubUsersTable subUsers={subUsers} />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Invoice Section */}
      {adminOption === "invoice" && (
        <>
          {/* Upload Form */}
          <div className="max-w-3xl mx-auto">
            {user.status !== "approved" ? (
              <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-6 rounded-xl flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-lg mb-1">Account Not Approved</p>
                  <p className="text-sm">Your account is not approved yet. You cannot upload invoices.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAdminFileUpload} className="space-y-4">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer transition-colors ${
                    isDragging ? "border-green-500 bg-green-50" : file ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"
                  }`}
                >
                  {file ? (
                    <p className="text-green-700 font-semibold">{file.name}</p>
                  ) : (
                    <p className="text-gray-700">Drag & drop or click to select a file</p>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      handleFileChange(e);
                      if (e.target.files.length > 0) setErrorMessage("");
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {errorMessage && (
                  <div className="w-full mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  {uploading ? uploadMessage || "Processing..." : "Upload & Process"}
                </button>
              </form>
            )}
          </div>

          {/* Footer Table */}
          {userInvoices && userInvoices.length > 0 && (
            <div className="mt-10 w-full overflow-x-auto px-4">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">All Employee Invoices</h3>
              <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr className="text-center">
                    <th className="py-2 px-4 border-b">Invoice Number</th>
                    <th className="py-2 px-4 border-b">Vendor Name</th>
                    <th className="py-2 px-4 border-b">Total Amount</th>
                    <th className="py-2 px-4 border-b">Uploaded By</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Image</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userInvoices.map((inv, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50 transition">
                      <td className="py-2 px-4 border-b">{inv.invoiceNumber}</td>
                      <td className="py-2 px-4 border-b">{inv.vendorName}</td>
                      <td className="py-2 px-4 border-b">{inv.totalAmount}</td>
                      <td className="py-2 px-4 border-b">{inv.uploadedBy}</td>
                      <td className="py-2 px-4 border-b">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">
                        {inv.imagePath ? (
                          <a href={inv.imagePath} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            View
                          </a>
                        ) : "No Image"}
                      </td>
                      <td className="py-2 px-4 border-b flex justify-center gap-2">
                        <button
                          onClick={() => handleDeleteInvoice(inv._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Review Modal */}
      {modalOpen && parsedData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="bg-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold">Review Invoice</h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {Object.keys(parsedData).map((field) => (
                <div key={field}>
                  <label className="text-sm font-semibold">{field}</label>
                  <textarea
                    value={parsedData[field]}
                    onChange={(e) => handleFieldChange(e, field)}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
                    rows={Array.isArray(parsedData[field]) || (parsedData[field] && String(parsedData[field]).includes("\n")) ? 4 : 1}
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold">Uploaded / Verified By</label>
                <input
                  type="text"
                  value={uploadedByName}
                  onChange={(e) => setUploadedByName(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Enter name"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t-2 border-gray-200 bg-gray-50">
              <button onClick={() => setModalOpen(false)} className="px-6 py-2 rounded-lg border-2 border-gray-300">Cancel</button>
              <button onClick={handleSaveInvoice} className="px-6 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2">
                <Save className="w-5 h-5" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
