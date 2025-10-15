import { useState } from "react";
import { Save, X } from "lucide-react";

export default function EmployeeUpload({ token }) {
  const [file, setFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  // Flatten nested objects for easy rendering
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

      const res = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setUploadMessage("Processing OCR...");
      const flattened = flattenData(data.parsedJson || data); // fallback to raw data if parsedJson missing
      setParsedData(flattened);
      setImagePath(data.file?.path || "");
      setModalOpen(true);
      setUploadMessage("✅ Done!");
    } catch (err) {
      setErrorMessage(err.message || "Upload failed");
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
      const res = await fetch("http://localhost:5000/api/files/save-invoice", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parsedData, imagePath }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("✅ Invoice saved!");
      setModalOpen(false);
      setFile(null);
      setParsedData({});
    } catch (err) {
      setErrorMessage(err.message || "Save failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100 w-full max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Invoice</h2>

      {/* File Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 w-full text-center cursor-pointer ${
          isDragging ? "border-green-500 bg-green-50" : file ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        {file ? <p className="text-green-700 font-semibold">{file.name}</p> : <p className="text-gray-700">Drag & drop or click to select a file</p>}
        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>

      <button
        onClick={handleFileUpload}
        disabled={!file || uploading}
        className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
      >
        {uploading ? uploadMessage || "Processing..." : "Upload & Process"}
      </button>

      {uploading && (
        <div className="w-full mt-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-green-500 rounded-full animate-pulse" style={{ width: "100%" }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">{uploadMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="w-full mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">{errorMessage}</div>
      )}

      {/* Modal */}
      {modalOpen && parsedData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="bg-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold">Review Invoice</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {Object.keys(parsedData).map(field => (
                <div key={field}>
                  <label className="text-sm font-semibold">{field}</label>
                  <textarea
                    value={parsedData[field]}
                    onChange={(e) => handleFieldChange(e, field)}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2"
                    rows={Array.isArray(parsedData[field]) || parsedData[field]?.includes("\n") ? 4 : 1}
                  />
                </div>
              ))}
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
