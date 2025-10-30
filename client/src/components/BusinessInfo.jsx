// import { useState, useEffect } from "react";
// import { CheckCircle, Edit2, Mail, Send, Shield, Building2, User, AlertCircle } from "lucide-react";

// export default function BusinessInfo({ user = {}, refreshUser }) {
//   const token = window.localStorage?.getItem("token");

//   const [email, setEmail] = useState(user.email || "");
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [verifyModalOpen, setVerifyModalOpen] = useState(false);
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [newEmail, setNewEmail] = useState("");

//   useEffect(() => setEmail(user.email || ""), [user.email]);

//   if (!user || !user.email) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//         <p className="text-gray-500">Loading user information...</p>
//       </div>
//     );
//   }

//   // --- Edit Email ---
//   const handleEditClick = () => {
//     setNewEmail(email);
//     setEditModalOpen(true);
//   };


// // for new code handle save email

// const handleSaveEmail = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/update-my-email", {
//       method: "PATCH",
//       credentials: "include", // ✅ send cookie session
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: newEmail }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to update email");

//     setEmail(newEmail);
//     setEditModalOpen(false);
//     setVerifyModalOpen(true);
//   } catch (err) {
//     alert(err.message || "Failed to update email");
//   }
// };


















// const handleSendOtp = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/send-otp", {
//       method: "POST",
//       credentials: "include", // ✅ important
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ newEmail: email }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to send OTP");

//     setOtpModalOpen(true);
//     setVerifyModalOpen(false);
//   } catch (err) {
//     alert(err.message || "Failed to send OTP");
//   }
// };











// const handleVerifyOtp = async () => {
//   setIsVerifying(true);
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
//       method: "POST",
//       credentials: "include", // ✅ include cookie session
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ otp, newEmail: email }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "OTP verification failed");

//     alert("Email verified successfully!");
//     await refreshUser();
//     setOtpModalOpen(false);
//   } catch (err) {
//     alert(err.message || "OTP verification failed");
//   } finally {
//     setIsVerifying(false);
//   }
// };

















//   return (
//     <div className="bg-white p-8 mb-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
//               <Building2 className="w-7 h-7 text-white" />
//             </div>
//             <h2 className="text-4xl font-bold text-gray-800">Business Information</h2>
//           </div>
//           <p className="text-gray-500 ml-14">Manage your business profile and settings</p>
//         </div>

//         {/* Info Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Business Name Card */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
//                   <Building2 className="w-5 h-5 text-purple-600" />
//                 </div>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Business Name</p>
//               </div>
//               <p className="text-xl font-bold text-gray-800 truncate">{user.businessName}</p>
//             </div>
//             <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
//           </div>

//           {/* Email Card */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <Mail className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
//                 </div>
//                 {!user.emailVerified && (
//                   <button 
//                     onClick={handleEditClick}
//                     className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <Edit2 className="w-4 h-4 text-blue-600" />
//                   </button>
//                 )}
//               </div>
              
//               <p className="text-sm font-semibold text-gray-800 mb-4 truncate">{email}</p>

//               {!user.emailVerified ? (
//                 <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
//                   <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
//                   <button
//                     onClick={() => setVerifyModalOpen(true)}
//                     className="text-xs font-semibold text-amber-700 hover:text-amber-800"
//                   >
//                     Click to Verify
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
//                   <span className="text-xs font-semibold text-green-700">Verified</span>
//                 </div>
//               )}
//             </div>
//             <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
//           </div>

//           {/* Role Card */}
//           {/* <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
//                   <User className="w-5 h-5 text-indigo-600" />
//                 </div>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role</p>
//               </div>
//               <p className="text-xl font-bold text-gray-800 capitalize">{user.role.replace('_', ' ')}</p>
//             </div>
//             <div className="h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
//           </div> */}

//           {/* Status Card */}
//           {user.role !== "super_admin" && (
//             <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//               <div className="p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
//                     <Shield className="w-5 h-5 text-green-600" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
//                 </div>
//                 <p className="text-xl font-bold text-gray-800 capitalize">{user.status}</p>
//               </div>
//               <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- Edit Email Modal --- */}
//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                   <Edit2 className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">Edit Email</h3>
//                   <p className="text-sm text-blue-100 mt-1">Update your email address</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 New Email Address
//               </label>
//               <input
//                 type="email"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
//                 placeholder="Enter new email"
//               />
//             </div>

//             <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setEditModalOpen(false)}
//                 className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEmail}
//                 className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- Verify Email Modal --- */}
//       {verifyModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                   <Mail className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">Verify Email</h3>
//                   <p className="text-sm text-amber-100 mt-1">Confirm your email address</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
//                 <p className="text-gray-700">
//                   We'll send a verification code to:
//                 </p>
//                 <p className="text-amber-700 font-bold mt-2">{email}</p>
//               </div>
//               <p className="text-sm text-gray-500">
//                 Please check your inbox and enter the OTP code to verify your email.
//               </p>
//             </div>

//             <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setVerifyModalOpen(false)}
//                 className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendOtp}
//                 className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//               >
//                 <Send className="w-4 h-4" />
//                 Send OTP
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- OTP Verification Modal --- */}
//       {otpModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                   <Shield className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">Enter OTP</h3>
//                   <p className="text-sm text-green-100 mt-1">Verification code sent to your email</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 One-Time Password
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter 6-digit OTP"
//                 maxLength="6"
//                 className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
//               />
//               <p className="text-xs text-gray-500 mt-2 text-center">
//                 Check your email for the verification code
//               </p>
//             </div>

//             <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setOtpModalOpen(false)}
//                 className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={isVerifying}
//                 className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 {isVerifying ? "Verifying..." : "Verify OTP"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


















//this is sundays working code 

// import { useState, useEffect } from "react";
// import { CheckCircle, Edit2, Mail, Shield, Building2, AlertCircle, FileText } from "lucide-react";
// import axios from "axios";

// export default function BusinessInfo({ user = {}, refreshUser }) {
//   const [email, setEmail] = useState(user.email || "");
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [verifyModalOpen, setVerifyModalOpen] = useState(false);
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [newEmail, setNewEmail] = useState("");

//   useEffect(() => setEmail(user.email || ""), [user.email]);

//   if (!user || !user.email) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//         <p className="text-gray-500">Loading user information...</p>
//       </div>
//     );
//   }

//   // --- Edit Email ---
//   const handleEditClick = () => {
//     setNewEmail(email);
//     setEditModalOpen(true);
//   };









// const handleExportInvoices = async () => {
//   try {
//     let url = "";

//     if (user.role === "admin") {
//       // Admin exports all invoices of their created users
//       url = "http://localhost:5000/api/invoices/export";
//     } else {
//       // Normal user exports only their own invoices
//       url = "http://localhost:5000/api/my-invoices/export";
//     }

//     const res = await axios.get(url, {
//       responseType: "blob",
//       withCredentials: true,
//     });

//     const blob = new Blob([res.data]);
//     const downloadUrl = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = downloadUrl;

//     if (user.role === "admin") {
//       link.setAttribute("download", "all-outlets-invoices.xlsx");
//     } else {
//       link.setAttribute("download", "my-invoices.xlsx");
//     }

//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } catch (err) {
//     alert(err.response?.data?.message || err.message || "Export failed");
//   }
// };















//   return (
//     <div className="bg-white p-8 mb-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
//               <Building2 className="w-7 h-7 text-white" />
//             </div>
//             <h2 className="text-4xl font-bold text-gray-800">Business Information</h2>
//           </div>
//           <p className="text-gray-500 ml-14">Manage your business profile and settings</p>
//         </div>

//         {/* Info Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Business Name */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
//                   <Building2 className="w-5 h-5 text-purple-600" />
//                 </div>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Business Name</p>
//               </div>
//               <p className="text-xl font-bold text-gray-800 truncate">{user.businessName}</p>
//             </div>
//             <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
//           </div>

//           {/* Email */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <Mail className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
//                 </div>
//                 {!user.emailVerified && (
//                   <button onClick={handleEditClick} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
//                     <Edit2 className="w-4 h-4 text-blue-600" />
//                   </button>
//                 )}
//               </div>
//               <p className="text-sm font-semibold text-gray-800 mb-4 truncate">{email}</p>
//               {!user.emailVerified ? (
//                 <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
//                   <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
//                   <button onClick={() => setVerifyModalOpen(true)} className="text-xs font-semibold text-amber-700 hover:text-amber-800">
//                     Click to Verify
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
//                   <span className="text-xs font-semibold text-green-700">Verified</span>
//                 </div>
//               )}
//             </div>
//             <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
//           </div>

//           {/* Status */}
//           {user.role !== "super_admin" && (
//             <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//               <div className="p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
//                     <Shield className="w-5 h-5 text-green-600" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
//                 </div>
//                 <p className="text-xl font-bold text-gray-800 capitalize">{user.status}</p>
//               </div>
//               <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
//             </div>
//           )}



// {/* Export Invoices */}
// <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between">
//   <div className="p-6 flex flex-col items-center justify-center h-full gap-3">
//     <FileText className="w-7 h-7 text-green-600" />
//     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Export</p>
//     <button
//       onClick={handleExportInvoices}
//       className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
//     >
//       Export My Invoices
//     </button>
//   </div>
//   <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
// </div>








//         </div>
//       </div>
//     </div>
//   );
// }











// //this is for delete button changes
// import { useState, useEffect } from "react";
// import {
//   CheckCircle,
//   Edit2,
//   Mail,
//   Shield,
//   Building2,
//   AlertCircle,
//   FileText,
//   Trash2,
//   Send,
// } from "lucide-react";
// import axios from "axios";

// export default function BusinessInfo({ user = {}, refreshUser }) {
//   const [email, setEmail] = useState(user.email || "");
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [verifyModalOpen, setVerifyModalOpen] = useState(false);
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [newEmail, setNewEmail] = useState("");

//   useEffect(() => setEmail(user.email || ""), [user.email]);

//   if (!user || !user.email) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//         <p className="text-gray-500">Loading user information...</p>
//       </div>
//     );
//   }

//   // --- Edit Email ---
//   const handleEditClick = () => {
//     setNewEmail(email);
//     setEditModalOpen(true);
//   };

//   const handleSaveEmail = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/update-my-email", {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: newEmail }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to update email");

//       setEmail(newEmail);
//       setEditModalOpen(false);
//       setVerifyModalOpen(true);
//     } catch (err) {
//       alert(err.message || "Failed to update email");
//     }
//   };

//   // --- Send OTP ---
//   const handleSendOtp = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/send-otp", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ newEmail: email }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to send OTP");

//       setOtpModalOpen(true);
//       setVerifyModalOpen(false);
//     } catch (err) {
//       alert(err.message || "Failed to send OTP");
//     }
//   };

//   // --- Verify OTP ---
//   const handleVerifyOtp = async () => {
//     setIsVerifying(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp, newEmail: email }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "OTP verification failed");

//       alert("Email verified successfully!");
//       if (typeof refreshUser === "function") await refreshUser();
//       setOtpModalOpen(false);
//     } catch (err) {
//       alert(err.message || "OTP verification failed");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   // --- Export Invoices ---
//   const handleExportInvoices = async () => {
//     try {
//       let url = "";

//       if (user.role === "admin") {
//         url = "http://localhost:5000/api/invoices/export";
//       } else {
//         url = "http://localhost:5000/api/my-invoices/export";
//       }

//       const res = await axios.get(url, {
//         responseType: "blob",
//         withCredentials: true,
//       });

//       const blob = new Blob([res.data]);
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;

//       link.setAttribute(
//         "download",
//         user.role === "admin" ? "all-outlets-invoices.xlsx" : "my-invoices.xlsx"
//       );

//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       alert(err.response?.data?.message || err.message || "Export failed");
//     }
//   };

//   // --- Export Deleted Invoices (Admin only) ---
//   const handleExportDeletedInvoices = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/invoices/export?type=deleted",
//         {
//           responseType: "blob",
//           withCredentials: true,
//         }
//       );

//       const blob = new Blob([res.data]);
//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.setAttribute("download", "deleted-invoices.xlsx");

//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       alert(
//         err.response?.data?.message ||
//           err.message ||
//           "Export deleted invoices failed"
//       );
//     }
//   };

//   return (
//     <div className="bg-white p-8 mb-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
//               <Building2 className="w-7 h-7 text-white" />
//             </div>
//             <h2 className="text-4xl font-bold text-gray-800">
//               Business Information
//             </h2>
//           </div>
//           <p className="text-gray-500 ml-14">
//             Manage your business profile and settings
//           </p>
//         </div>

//         {/* Info Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Business Name */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
//                   <Building2 className="w-5 h-5 text-purple-600" />
//                 </div>
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
//                   Business Name
//                 </p>
//               </div>
//               <p className="text-xl font-bold text-gray-800 truncate">
//                 {user.businessName}
//               </p>
//             </div>
//             <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
//           </div>

//           {/* Email */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <Mail className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
//                     Email
//                   </p>
//                 </div>
//                 {!user.emailVerified && (
//                   <button
//                     onClick={handleEditClick}
//                     className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <Edit2 className="w-4 h-4 text-blue-600" />
//                   </button>
//                 )}
//               </div>
//               <p className="text-sm font-semibold text-gray-800 mb-4 truncate">
//                 {email}
//               </p>
//               {!user.emailVerified ? (
//                 <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
//                   <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
//                   <button
//                     onClick={() => setVerifyModalOpen(true)}
//                     className="text-xs font-semibold text-amber-700 hover:text-amber-800"
//                   >
//                     Click to Verify
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
//                   <span className="text-xs font-semibold text-green-700">
//                     Verified
//                   </span>
//                 </div>
//               )}
//             </div>
//             <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
//           </div>

//           {/* Status */}
//           {user.role !== "super_admin" && (
//             <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
//               <div className="p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
//                     <Shield className="w-5 h-5 text-green-600" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
//                     Status
//                   </p>
//                 </div>
//                 <p className="text-xl font-bold text-gray-800 capitalize">
//                   {user.status}
//                 </p>
//               </div>
//               <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
//             </div>
//           )}

//           {/* Export Invoices */}
//           <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between">
//             <div className="p-6 flex flex-col items-center justify-center h-full gap-3">
//               <FileText className="w-7 h-7 text-green-600" />
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
//                 Export
//               </p>

//               <button
//                 onClick={handleExportInvoices}
//                 className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
//               >
//                 Export My Invoices
//               </button>

//               {user.role === "admin" && (
//                 <button
//                   onClick={handleExportDeletedInvoices}
//                   className="mt-2 px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 text-xs flex items-center gap-1"
//                 >
//                   <Trash2 className="w-4 h-4" /> Export Deleted
//                 </button>
//               )}
//             </div>
//             <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
//           </div>
//         </div>
//       </div>

//       {/* --- Edit Email Modal --- */}
//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                   <Edit2 className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">Edit Email</h3>
//                   <p className="text-sm text-blue-100 mt-1">Update your email address</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 New Email Address
//               </label>
//               <input
//                 type="email"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
//                 placeholder="Enter new email"
//               />
//             </div>

//             <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setEditModalOpen(false)}
//                 className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEmail}
//                 className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- Verify Email Modal --- */}
//       {verifyModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                   <Mail className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">Verify Email</h3>
//                   <p className="text-sm text-amber-100 mt-1">Confirm your email address</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
//                 <p className="text-gray-700">We'll send a verification code to:</p>
//                 <p className="text-amber-700 font-bold mt-2">{email}</p>
//               </div>
//               <p className="text-sm text-gray-500">
//                 Please check your inbox and enter the OTP code to verify your email.
//               </p>
//             </div>

//             <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setVerifyModalOpen(false)}
//                 className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendOtp}
//                 className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//               >
//                 <Send className="w-4 h-4" />
//                 Send OTP
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- OTP Verification Modal --- */}
//       {otpModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//             <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                   <Shield className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold">Enter OTP</h3>
//                   <p className="text-sm text-green-100 mt-1">Verification code sent to your email</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <label className="block text-sm font-semibold text-gray-600 mb-2">
//                 One-Time Password
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter 6-digit OTP"
//                 maxLength="6"
//                 className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
//               />
//               <p className="text-xs text-gray-500 mt-2 text-center">
//                 Check your email for the verification code
//               </p>
//             </div>

//             <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setOtpModalOpen(false)}
//                 className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleVerifyOtp}
//                 disabled={isVerifying}
//                 className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 {isVerifying ? "Verifying..." : "Verify OTP"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }














//above code is last change of 28-10

// ✅ Full Restored + Super Admin Restriction Added

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Edit2,
  Mail,
  Shield,
  Building2,
  AlertCircle,
  FileText,
  Trash2,
  Send,
} from "lucide-react";
import axios from "axios";

export default function BusinessInfo({ user = {}, refreshUser }) {
  const [email, setEmail] = useState(user.email || "");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => setEmail(user.email || ""), [user.email]);

  if (!user || !user.email) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-500">Loading user information...</p>
      </div>
    );
  }

  // --- Edit Email ---
  const handleEditClick = () => {
    setNewEmail(email);
    setEditModalOpen(true);
  };

  const handleSaveEmail = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/update-my-email", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update email");

      setEmail(newEmail);
      setEditModalOpen(false);
      setVerifyModalOpen(true);
    } catch (err) {
      alert(err.message || "Failed to update email");
    }
  };

  // --- Send OTP ---
  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setOtpModalOpen(true);
      setVerifyModalOpen(false);
    } catch (err) {
      alert(err.message || "Failed to send OTP");
    }
  };

  // --- Verify OTP ---
  const handleVerifyOtp = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, newEmail: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      alert("Email verified successfully!");
      if (typeof refreshUser === "function") await refreshUser();
      setOtpModalOpen(false);
    } catch (err) {
      alert(err.message || "OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  // --- Export Invoices (🔒 Restricted for Super Admin) ---
  const handleExportInvoices = async () => {
    try {
      if (user.role === "super_admin") {
        alert("Super Admin cannot export invoices.");
        return;
      }

      let url = "";

      if (user.role === "admin") {
        url = "http://localhost:5000/api/invoices/export";
      } else {
        url = "http://localhost:5000/api/my-invoices/export";
      }

      const res = await axios.get(url, {
        responseType: "blob",
        withCredentials: true,
      });

      const blob = new Blob([res.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      link.setAttribute(
        "download",
        user.role === "admin" ? "all-outlets-invoices.xlsx" : "my-invoices.xlsx"
      );

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Export failed");
    }
  };

  // --- Export Deleted Invoices (Admin only) ---
  const handleExportDeletedInvoices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/invoices/export?type=deleted",
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const blob = new Blob([res.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "deleted-invoices.xlsx");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message ||
          "Export deleted invoices failed"
      );
    }
  };

  return (
    <div className="bg-white p-8 mb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">
              Business Information
            </h2>
          </div>
          <p className="text-gray-500 ml-14">
            Manage your business profile and settings
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Business Name */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Business Name
                </p>
              </div>
              <p className="text-xl font-bold text-gray-800 truncate">
                {user.businessName}
              </p>
            </div>
            <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Email
                  </p>
                </div>
                {!user.emailVerified && (
                  <button
                    onClick={handleEditClick}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-4 truncate">
                {email}
              </p>
              {!user.emailVerified ? (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <button
                    onClick={() => setVerifyModalOpen(true)}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    Click to Verify
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-green-700">
                    Verified
                  </span>
                </div>
              )}
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </div>

          {/* Status (not for super admin) */}
          {user.role !== "super_admin" && (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </p>
                </div>
                <p className="text-xl font-bold text-gray-800 capitalize">
                  {user.status}
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
            </div>
          )}

          {/* Export Invoices */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between">
            <div className="p-6 flex flex-col items-center justify-center h-full gap-3">
              <FileText className="w-7 h-7 text-green-600" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Export
              </p>

              <button
                onClick={handleExportInvoices}
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
              >
                Export My Invoices
              </button>

              {user.role === "admin" && (
                <button
                  onClick={handleExportDeletedInvoices}
                  className="mt-2 px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Export Deleted
                </button>
              )}
            </div>
            <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
          </div>
        </div>
      </div>

      {/* --- Edit Email Modal --- */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Edit2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Edit Email</h3>
                  <p className="text-sm text-blue-100 mt-1">
                    Update your email address
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                New Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                placeholder="Enter new email"
              />
            </div>

            <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmail}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Verify Email Modal --- */}
      {verifyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Verify Email</h3>
                  <p className="text-sm text-amber-100 mt-1">
                    Confirm your email address
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-gray-700">
                  We'll send a verification code to:
                </p>
                <p className="text-amber-700 font-bold mt-2">{email}</p>
              </div>
              <p className="text-sm text-gray-500">
                Please check your inbox and enter the OTP code to verify your
                email.
              </p>
            </div>

            <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setVerifyModalOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendOtp}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- OTP Verification Modal --- */}
      {otpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Enter OTP</h3>
                  <p className="text-sm text-green-100 mt-1">
                    Verification code sent to your email
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                One-Time Password
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Check your email for the verification code
              </p>
            </div>

            <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setOtpModalOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
