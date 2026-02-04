














// UPDATE EXPORT BOTTON REMOVE ONLY



// // date 22-10
// import { useState } from "react";
// import { Save, X } from "lucide-react";
// import axios from "axios";
// import InvoicesTable from "./invoicesTable";

// export default function EmployeeUpload() {
//   const [file, setFile] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [parsedData, setParsedData] = useState({});
//   const [rawParsedData, setRawParsedData] = useState({});
//   const [imagePath, setImagePath] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // ---------------- File upload handlers ----------------
//   const handleFileChange = (e) => setFile(e.target.files[0]);
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };
//   const handleDragLeave = () => setIsDragging(false);
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
//   };

//   // ---------------- Flatten JSON ----------------
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

//   // ---------------- Upload file ----------------
//   const handleFileUpload = async () => {
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
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
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
//     } catch (err) {
//       setErrorMessage(
//         err.response?.data?.message || err.message || "Upload failed"
//       );
//     } finally {
//       setUploading(false);
//       setUploadMessage("");
//     }
//   };

//   // ---------------- Modal field changes ----------------
//   const handleFieldChange = (e, field) => {
//     setParsedData({ ...parsedData, [field]: e.target.value });
//   };

//   // ---------------- Save invoice ----------------
//   const handleSaveInvoice = async () => {
//     try {
//       setErrorMessage("");
//       const res = await axios.post(
//         "http://localhost:5000/api/files/save-invoice",
//         { parsedData: rawParsedData, imagePath },
//         { withCredentials: true }
//       );

//       if (!res.data.success) throw new Error(res.data.message || "Save failed");

//       alert("✅ Invoice saved!");
//       setModalOpen(false);
//       setFile(null);
//       setParsedData({});
//       setRawParsedData({});
//     } catch (err) {
//       setErrorMessage(
//         err.response?.data?.message || err.message || "Save failed"
//       );
//     }
//   };

//   // ---------------- (Optional) Export Logic for BusinessInfo ----------------
//   const handleExportInvoices = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/my-invoices/export",
//         { responseType: "blob", withCredentials: true }
//       );
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "my-invoices.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       alert(err.response?.data?.message || err.message || "Export failed");
//     }
//   };

//   // ---------------- Render ----------------
//   return (
//     <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100 w-full flex flex-col items-start">
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Invoice</h2>

//       {/* File Upload */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`relative border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer ${
//           isDragging
//             ? "border-green-500 bg-green-50"
//             : file
//             ? "border-green-400 bg-green-50"
//             : "border-gray-300 bg-gray-50"
//         }`}
//       >
//         {file ? (
//           <p className="text-green-700 font-semibold">{file.name}</p>
//         ) : (
//           <p className="text-gray-700">Drag & drop or click to select a file</p>
//         )}
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//       </div>

//       {/* Upload Button */}
//       <div className="flex justify-center w-full mt-4">
//         <button
//           onClick={handleFileUpload}
//           disabled={!file || uploading}
//           className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
//         >
//           {uploading ? uploadMessage || "Processing..." : "Upload & Process"}
//         </button>
//       </div>

//       {/* Modal */}
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
//               {Object.keys(parsedData || {}).map((field) => (
//                 <div key={field}>
//                   <label className="text-sm font-semibold">{field}</label>
//                   <textarea
//                     value={parsedData[field]}
//                     onChange={(e) => handleFieldChange(e, field)}
//                     className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
//                     rows={
//                       Array.isArray(parsedData[field]) ||
//                       parsedData[field]?.includes("\n")
//                         ? 4
//                         : 1
//                     }
//                   />
//                 </div>
//               ))}
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

//       {/* ✅ Separated Invoices Table Component */}
//       <div className="mt-6 w-full">
//         <InvoicesTable />
//       </div>
//     </div>
//   );
// }








// changes for to include uploaded by name field

// import { useState } from "react";
// import { Save, X } from "lucide-react";
// import axios from "axios";
// import InvoicesTable from "./invoicesTable";

// export default function EmployeeUpload() {
//   const [file, setFile] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [parsedData, setParsedData] = useState({});
//   const [rawParsedData, setRawParsedData] = useState({});
//   const [imagePath, setImagePath] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [uploadedByName, setUploadedByName] = useState(""); // ✅ New state

//   // ---------------- File upload handlers ----------------
//   const handleFileChange = (e) => setFile(e.target.files[0]);
//   const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = () => setIsDragging(false);
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
//   };

//   // ---------------- Flatten JSON ----------------
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

//   // ---------------- Upload file ----------------
//   const handleFileUpload = async () => {
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
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
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
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || err.message || "Upload failed");
//     } finally {
//       setUploading(false);
//       setUploadMessage("");
//     }
//   };

//   // ---------------- Modal field changes ----------------
//   const handleFieldChange = (e, field) => {
//     setParsedData({ ...parsedData, [field]: e.target.value });
//   };

//   // ---------------- Save invoice ----------------
//   const handleSaveInvoice = async () => {
//     try {
//       setErrorMessage("");
//       const res = await axios.post(
//         "http://localhost:5000/api/files/save-invoice",
//         // { parsedData: rawParsedData, imagePath, uploadedByName }, // ✅ send name
//          {  rawParsedData, imagePath, uploadedByName }, // ✅ send name
//         { withCredentials: true }
//       );

//       if (!res.data.success) throw new Error(res.data.message || "Save failed");

//       alert("✅ Invoice saved!");
//       setModalOpen(false);
//       setFile(null);
//       setParsedData({});
//       setRawParsedData({});
//       setUploadedByName(""); // ✅ reset name
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || err.message || "Save failed");
//     }
//   };

//   // ---------------- (Optional) Export Logic ----------------
//   const handleExportInvoices = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/my-invoices/export",
//         { responseType: "blob", withCredentials: true }
//       );
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "my-invoices.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       alert(err.response?.data?.message || err.message || "Export failed");
//     }
//   };

//   // ---------------- Render ----------------
//   return (
//     <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100 w-full flex flex-col items-start">
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Invoice</h2>

//       {/* File Upload */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`relative border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer ${
//           isDragging ? "border-green-500 bg-green-50" : file ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"
//         }`}
//       >
//         {file ? <p className="text-green-700 font-semibold">{file.name}</p> : <p className="text-gray-700">Drag & drop or click to select a file</p>}
//         <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
//       </div>

//       {/* Upload Button */}
//       <div className="flex justify-center w-full mt-4">
//         <button
//           onClick={handleFileUpload}
//           disabled={!file || uploading}
//           className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
//         >
//           {uploading ? uploadMessage || "Processing..." : "Upload & Process"}
//         </button>
//       </div>

//       {/* Modal */}
//       {modalOpen && parsedData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
//             <div className="bg-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
//               <h3 className="text-xl font-bold">Review Invoice</h3>
//               <button onClick={() => setModalOpen(false)}><X className="w-6 h-6" /></button>
//             </div>

//             <div className="p-6 flex flex-col gap-4">
//               {Object.keys(parsedData || {}).map((field) => (
//                 <div key={field}>
//                   <label className="text-sm font-semibold">{field}</label>
//                   <textarea
//                     value={parsedData[field]}
//                     onChange={(e) => handleFieldChange(e, field)}
//                     className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
//                     rows={Array.isArray(parsedData[field]) || parsedData[field]?.includes("\n") ? 4 : 1}
//                   />
//                 </div>
//               ))}

//               {/* ✅ New uploadedByName input */}
//               <div>
//                 <label className="text-sm font-semibold">Uploaded / Verified By</label>
//                 <input
//                   type="text"
//                   value={uploadedByName}
//                   onChange={(e) => setUploadedByName(e.target.value)}
//                   className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
//                   placeholder="Enter name"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 p-6 border-t-2 border-gray-200 bg-gray-50">
//               <button onClick={() => setModalOpen(false)} className="px-6 py-2 rounded-lg border-2 border-gray-300">Cancel</button>
//               <button onClick={handleSaveInvoice} className="px-6 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2">
//                 <Save className="w-5 h-5" /> Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Separated Invoices Table Component */}
//       <div className="mt-6 w-full">
//         <InvoicesTable />
//       </div>
//     </div>
//   );
// }






//last change of 24-10
import { useState } from "react";
import { Save, X } from "lucide-react";
import axios from "axios";
import InvoicesTable from "./invoicesTable";

export default function EmployeeUpload() {
  const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [rawParsedData, setRawParsedData] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedByName, setUploadedByName] = useState("");

  // ---------------- File Upload Handlers ----------------
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  // ---------------- Flatten JSON ----------------
  const flattenData = (obj, prefix = "") => {
    let result = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          result[`${prefix}${key}`] = JSON.stringify(obj[key], null, 2);
        } else {
          Object.assign(result, flattenData(obj[key], `${prefix}${key}.`));
        }
      } else {
        result[`${prefix}${key}`] = obj[key];
      }
    }
    return result;
  };

  // ---------------- Merge flat data back to raw (Fixed) ----------------
  const mergeFlatToRaw = (raw, flat) => {
    let updatedRaw = JSON.parse(JSON.stringify(raw)); // deep copy

    Object.keys(flat).forEach((key) => {
      let value = flat[key];
      const path = key.split(".");
      let current = updatedRaw;

      // ✅ Fix: parse array-like strings (e.g. "items")
      if (typeof value === "string" && value.trim().startsWith("[") && value.trim().endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.warn("Failed to parse array JSON for key:", key);
        }
      }

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
    });

    return updatedRaw;
  };

  // ---------------- Upload File ----------------
  const handleFileUpload = async () => {
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

      const res = await axios.post("https://ai-poc-3.onrender.com/api/files/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      if (!data.success) throw new Error(data.message || "Upload failed");

      setUploadMessage("Processing OCR...");
      const raw = data.parsedJson || data;
      setRawParsedData(raw);
      setParsedData(flattenData(raw));
      setImagePath(data.file?.path || "");
      setModalOpen(true);
      setUploadMessage("✅ Done!");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || "Upload failed");
    } finally {
      setUploading(false);
      setUploadMessage("");
    }
  };

  // ---------------- Handle Field Changes ----------------
  const handleFieldChange = (e, field) => {
    setParsedData({ ...parsedData, [field]: e.target.value });
  };

  // ---------------- Save Invoice ----------------
  const handleSaveInvoice = async () => {
    try {
      setErrorMessage("");
      const mergedData = mergeFlatToRaw(rawParsedData, parsedData);

      const res = await axios.post(
        "https://ai-poc-3.onrender.com/api/files/save-invoice",
        { parsedData: mergedData, imagePath, uploadedByName },
        { withCredentials: true }
      );

      if (!res.data.success) throw new Error(res.data.message || "Save failed");

      alert("✅ Invoice saved!");
      setModalOpen(false);
      setFile(null);
      setParsedData({});
      setRawParsedData({});
      setUploadedByName("");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || "Save failed");
    }
  };

  // ---------------- Export Invoices ----------------
  const handleExportInvoices = async () => {
    try {
      const res = await axios.get("https://ai-poc-3.onrender.com/api/my-invoices/export", {
        responseType: "blob",
        withCredentials: true,
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "my-invoices.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Export failed");
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100 w-full flex flex-col items-start">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Invoice</h2>

      {/* File Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer ${
          isDragging
            ? "border-green-500 bg-green-50"
            : file
            ? "border-green-400 bg-green-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        {file ? (
          <p className="text-green-700 font-semibold">{file.name}</p>
        ) : (
          <p className="text-gray-700">Drag & drop or click to select a file</p>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Upload Button */}
      <div className="flex justify-center w-full mt-4">
        <button
          onClick={handleFileUpload}
          disabled={!file || uploading}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
        >
          {uploading ? uploadMessage || "Processing..." : "Upload & Process"}
        </button>
      </div>

      {/* Modal */}
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
              {Object.keys(parsedData || {}).map((field) => (
                <div key={field}>
                  <label className="text-sm font-semibold">{field}</label>
                  <textarea
                    value={parsedData[field]}
                    onChange={(e) => handleFieldChange(e, field)}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
                    rows={
                      Array.isArray(parsedData[field]) ||
                      parsedData[field]?.includes("\n")
                        ? 4
                        : 1
                    }
                  />
                </div>
              ))}

              {/* Uploaded By */}
              <div>
                <label className="text-sm font-semibold">
                  Uploaded / Verified By
                </label>
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
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 rounded-lg border-2 border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveInvoice}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2"
              >
                <Save className="w-5 h-5" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Table */}
      <div className="mt-6 w-full">
        <InvoicesTable />
      </div>
    </div>
  );
}
