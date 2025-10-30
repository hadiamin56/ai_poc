









// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function InvoicesTable({ apiEndpoint = "/api/my-invoices", title = "My Invoices", userId }) {
//   const [invoices, setInvoices] = useState([]);
//   const [loadingInvoices, setLoadingInvoices] = useState(true);
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch invoices
//   const fetchInvoices = async () => {
//     try {
//       setLoadingInvoices(true);
//       const res = await axios.get(apiEndpoint, { withCredentials: true });
      
//       // Support both { invoices: [] } or raw array
//       const data = res.data.invoices || res.data; 
      
//       console.log("Fetched invoices:", data); // ✅ Debug

//       // Optional: filter by current user (if backend returns all invoices)
//       const userInvoices = userId ? data.filter(inv => inv.uploadedBy === userId) : data;

//       const formatted = userInvoices.map(inv => ({
//         ...inv,
//         parsedData: {
//           invoiceNumber: inv.invoiceNumber || "",
//           invoiceDate: inv.invoiceDate ? new Date(inv.invoiceDate).toISOString().split("T")[0] : "",
//           vendorName: inv.vendorName || "",
//           totalAmount: inv.totalAmount || 0,
//           taxAmount: inv.taxAmount || 0,
//           items: inv.items || [],
//           imagePath: inv.imagePath || "",
//           createdAt: inv.createdAt ? new Date(inv.createdAt).toISOString().split("T")[0] : "",
//         }
//       }));

//       setInvoices(formatted);
//     } catch (err) {
//       console.error("Error fetching invoices:", err);
//       setInvoices([]);
//     } finally {
//       setLoadingInvoices(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, [apiEndpoint]);

//   const handleInvoiceChange = (e, index, field) => {
//     const newInvoices = [...invoices];
//     newInvoices[index].parsedData[field] = e.target.value;
//     setInvoices(newInvoices);
//   };

//   const handleInvoiceSave = async (invoice, index) => {
//     try {
//       const res = await axios.put(
//         `/api/files/update-invoice/${invoice._id}`,
//       // const res = await axios.put(
//       //   `/api/update-invoice/${invoice._id}`,
//         { parsedData: invoice.parsedData },
//         { withCredentials: true }
//       );

//       const updatedInvoices = [...invoices];
//       updatedInvoices[index].parsedData = { ...updatedInvoices[index].parsedData, ...res.data.updatedInvoice };
//       setInvoices(updatedInvoices);

//       alert("✅ Invoice updated successfully!");
//       setEditIndex(null);
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   if (loadingInvoices) return <p>Loading invoices...</p>;
//   if (invoices.length === 0) return <p>No invoices uploaded yet.</p>;

//   return (
//     <div className="mt-6 w-full">
//       <h3 className="text-2xl font-bold mb-4 text-gray-700">{title}</h3>
//       <div className="overflow-x-auto w-full">
//         <table className="w-full border border-gray-300 rounded-lg text-sm text-left shadow-md">
//           <thead className="bg-green-300 text-gray-900 sticky top-0">
//             <tr>
//               <th className="px-4 py-3 border">Invoice #</th>
//               <th className="px-4 py-3 border">Date</th>
//               <th className="px-4 py-3 border">Vendor Name</th>
//               <th className="px-4 py-3 border">Total Amount</th>
//               <th className="px-4 py-3 border">Tax Amount</th>
//               <th className="px-4 py-3 border">Items</th>
//               <th className="px-4 py-3 border">Image</th>
//               <th className="px-4 py-3 border">Created At</th>
//               <th className="px-4 py-3 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((invoice, index) => {
//               const isEditing = editIndex === index;
//               const data = invoice.parsedData;

//               return (
//                 <tr
//                   key={invoice._id}
//                   className={`transition ${index % 2 === 0 ? "bg-green-50" : "bg-green-100"} hover:bg-green-200`}
//                 >
//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         value={data.invoiceNumber}
//                         onChange={(e) => handleInvoiceChange(e, index, "invoiceNumber")}
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : data.invoiceNumber}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         type="date"
//                         value={data.invoiceDate}
//                         onChange={(e) => handleInvoiceChange(e, index, "invoiceDate")}
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : data.invoiceDate}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         value={data.vendorName}
//                         onChange={(e) => handleInvoiceChange(e, index, "vendorName")}
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : data.vendorName}
//                   </td>
//                   <td className="px-4 py-2 border text-right">
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={data.totalAmount}
//                         onChange={(e) => handleInvoiceChange(e, index, "totalAmount")}
//                         className="w-full border rounded px-2 py-1 text-right"
//                       />
//                     ) : data.totalAmount}
//                   </td>
//                   <td className="px-4 py-2 border text-right">
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={data.taxAmount}
//                         onChange={(e) => handleInvoiceChange(e, index, "taxAmount")}
//                         className="w-full border rounded px-2 py-1 text-right"
//                       />
//                     ) : data.taxAmount}
//                   </td>
//                   <td className="px-4 py-2 border">{Array.isArray(data.items) ? data.items.join(", ") : data.items}</td>
//                   <td className="px-4 py-2 border text-blue-600">
//                     {data.imagePath ? (
//                       <a href={data.imagePath} target="_blank" rel="noreferrer" className="underline">
//                         View
//                       </a>
//                     ) : "No Image"}
//                   </td>
//                   <td className="px-4 py-2 border text-gray-600">{data.createdAt}</td>
//                   <td className="px-4 py-2 border text-center">
//                     {isEditing ? (
//                       <button
//                         onClick={() => handleInvoiceSave(invoice, index)}
//                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => setEditIndex(index)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }










// temp

// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// export default function InvoicesTable({ apiEndpoint = "/api/my-invoices", title = "My Invoices" }) {
//   const [invoices, setInvoices] = useState([]);
//   const [loadingInvoices, setLoadingInvoices] = useState(true);
//   const [editIndex, setEditIndex] = useState(null);

//   // ✅ Old-style base URL (no vite env)
//   const BASE_URL = "http://localhost:5000";

//   // ✅ useCallback to fix ESLint warning
//   const fetchInvoices = useCallback(async () => {
//     try {
//       setLoadingInvoices(true);
//       const res = await axios.get(`${BASE_URL}${apiEndpoint}`, {
//         withCredentials: true,
//       });

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.invoices || [];

//       console.log("Fetched invoices:", data);

//       const formatted = data.map((inv) => ({
//         ...inv,
//         parsedData: {
//           invoiceNumber: inv.invoiceNumber || "",
//           invoiceDate: inv.invoiceDate
//             ? new Date(inv.invoiceDate).toISOString().split("T")[0]
//             : "",
//           vendorName: inv.vendorName || "",
//           totalAmount: inv.totalAmount || 0,
//           taxAmount: inv.taxAmount || 0,
//           items: inv.items || [],
//           imagePath: inv.imagePath || "",
//           createdAt: inv.createdAt
//             ? new Date(inv.createdAt).toISOString().split("T")[0]
//             : "",
//         },
//       }));

//       setInvoices(formatted);
//     } catch (err) {
//       console.error("Error fetching invoices:", err);
//       setInvoices([]);
//     } finally {
//       setLoadingInvoices(false);
//     }
//   }, [apiEndpoint]); // ✅ only dependent on endpoint

//   useEffect(() => {
//     fetchInvoices();
//   }, [fetchInvoices]); // ✅ fixed warning

//   const handleInvoiceChange = (e, index, field) => {
//     const newInvoices = [...invoices];
//     newInvoices[index].parsedData[field] = e.target.value;
//     setInvoices(newInvoices);
//   };

//   const handleInvoiceSave = async (invoice, index) => {
//     try {
//       const res = await axios.put(
//         `${BASE_URL}/api/files/update-invoice/${invoice._id}`,
//         { parsedData: invoice.parsedData },
//         { withCredentials: true }
//       );

//       const updatedInvoices = [...invoices];
//       updatedInvoices[index].parsedData = {
//         ...updatedInvoices[index].parsedData,
//         ...res.data.updatedInvoice,
//       };
//       setInvoices(updatedInvoices);

//       alert("✅ Invoice updated successfully!");
//       setEditIndex(null);
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   if (loadingInvoices) return <p>Loading invoices...</p>;
//   if (invoices.length === 0) return <p>No invoices uploaded yet.</p>;

//   return (
//     <div className="mt-6 w-full">
//       <h3 className="text-2xl font-bold mb-4 text-gray-700">{title}</h3>
//       <div className="overflow-x-auto w-full">
//         <table className="w-full border border-gray-300 rounded-lg text-sm text-left shadow-md">
//           <thead className="bg-green-300 text-gray-900 sticky top-0">
//             <tr>
//               <th className="px-4 py-3 border">Invoice #</th>
//               <th className="px-4 py-3 border">Date</th>
//               <th className="px-4 py-3 border">Vendor Name</th>
//               <th className="px-4 py-3 border">Total Amount</th>
//               <th className="px-4 py-3 border">Tax Amount</th>
//               <th className="px-4 py-3 border">Items</th>
//               <th className="px-4 py-3 border">Image</th>
//               <th className="px-4 py-3 border">Created At</th>
//               <th className="px-4 py-3 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((invoice, index) => {
//               const isEditing = editIndex === index;
//               const data = invoice.parsedData;
//               return (
//                 <tr
//                   key={invoice._id}
//                   className={`transition ${
//                     index % 2 === 0 ? "bg-green-50" : "bg-green-100"
//                   } hover:bg-green-200`}
//                 >
//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         value={data.invoiceNumber}
//                         onChange={(e) =>
//                           handleInvoiceChange(e, index, "invoiceNumber")
//                         }
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : (
//                       data.invoiceNumber
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         type="date"
//                         value={data.invoiceDate}
//                         onChange={(e) =>
//                           handleInvoiceChange(e, index, "invoiceDate")
//                         }
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : (
//                       data.invoiceDate
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         value={data.vendorName}
//                         onChange={(e) =>
//                           handleInvoiceChange(e, index, "vendorName")
//                         }
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : (
//                       data.vendorName
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border text-right">
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={data.totalAmount}
//                         onChange={(e) =>
//                           handleInvoiceChange(e, index, "totalAmount")
//                         }
//                         className="w-full border rounded px-2 py-1 text-right"
//                       />
//                     ) : (
//                       data.totalAmount
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border text-right">
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={data.taxAmount}
//                         onChange={(e) =>
//                           handleInvoiceChange(e, index, "taxAmount")
//                         }
//                         className="w-full border rounded px-2 py-1 text-right"
//                       />
//                     ) : (
//                       data.taxAmount
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border">
//                     {Array.isArray(data.items)
//                       ? data.items.join(", ")
//                       : data.items}
//                   </td>

//                   <td className="px-4 py-2 border text-blue-600">
//                     {data.imagePath ? (
//                       <a
//                         href={data.imagePath}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="underline"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>

//                   <td className="px-4 py-2 border text-gray-600">
//                     {data.createdAt}
//                   </td>

//                   <td className="px-4 py-2 border text-center">
//                     {isEditing ? (
//                       <button
//                         onClick={() => handleInvoiceSave(invoice, index)}
//                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => setEditIndex(index)}
//                         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




//above version works fine til sunday






// //this is for the dfelted botton changes
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// export default function InvoicesTable({ apiEndpoint = "/api/my-invoices", title = "My Invoices" }) {
//   const [invoices, setInvoices] = useState([]);
//   const [loadingInvoices, setLoadingInvoices] = useState(true);
//   const [editIndex, setEditIndex] = useState(null);

//   const BASE_URL = "http://localhost:5000";

//   const fetchInvoices = useCallback(async () => {
//     try {
//       setLoadingInvoices(true);
//       const res = await axios.get(`${BASE_URL}${apiEndpoint}`, { withCredentials: true });

//       const data = Array.isArray(res.data) ? res.data : res.data.invoices || [];

//       const formatted = data.map((inv) => ({
//         ...inv,
//         parsedData: {
//           invoiceNumber: inv.invoiceNumber || "",
//           invoiceDate: inv.invoiceDate
//             ? new Date(inv.invoiceDate).toISOString().split("T")[0]
//             : "",
//           vendorName: inv.vendorName || "",
//           totalAmount: inv.totalAmount || 0,
//           taxAmount: inv.taxAmount || 0,
//           items: inv.items || [],
//           imagePath: inv.imagePath || "",
//           createdAt: inv.createdAt
//             ? new Date(inv.createdAt).toISOString().split("T")[0]
//             : "",
//         },
//       }));

//       setInvoices(formatted);
//     } catch (err) {
//       console.error("Error fetching invoices:", err);
//       setInvoices([]);
//     } finally {
//       setLoadingInvoices(false);
//     }
//   }, [apiEndpoint]);

//   useEffect(() => {
//     fetchInvoices();
//   }, [fetchInvoices]);

//   const handleInvoiceChange = (e, index, field) => {
//     const newInvoices = [...invoices];
//     newInvoices[index].parsedData[field] = e.target.value;
//     setInvoices(newInvoices);
//   };

//   const handleInvoiceSave = async (invoice, index) => {
//     try {
//       const res = await axios.put(
//         `${BASE_URL}/api/files/update-invoice/${invoice._id}`,
//         { parsedData: invoice.parsedData },
//         { withCredentials: true }
//       );

//       const updatedInvoices = [...invoices];
//       updatedInvoices[index].parsedData = {
//         ...updatedInvoices[index].parsedData,
//         ...res.data.updatedInvoice,
//       };
//       setInvoices(updatedInvoices);

//       alert("✅ Invoice updated successfully!");
//       setEditIndex(null);
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   const handleDelete = async (invoiceId) => {
//     if (!window.confirm("Are you sure you want to delete this invoice?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/files/delete-invoice/${invoiceId}`, { withCredentials: true });
//       setInvoices(invoices.filter(inv => inv._id !== invoiceId));
//       alert("✅ Invoice deleted successfully!");
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   if (loadingInvoices) return <p>Loading invoices...</p>;
//   if (invoices.length === 0) return <p>No invoices uploaded yet.</p>;

//   return (
//     <div className="mt-6 w-full">
//       <h3 className="text-2xl font-bold mb-4 text-gray-700">{title}</h3>
//       <div className="overflow-x-auto w-full">
//         <table className="w-full border border-gray-300 rounded-lg text-sm text-left shadow-md">
//           <thead className="bg-green-300 text-gray-900 sticky top-0">
//             <tr>
//               <th className="px-4 py-3 border">Invoice #</th>
//               <th className="px-4 py-3 border">Date</th>
//               <th className="px-4 py-3 border">Vendor Name</th>
//               <th className="px-4 py-3 border">Total Amount</th>
//               <th className="px-4 py-3 border">Tax Amount</th>
//               <th className="px-4 py-3 border">Items</th>
//               <th className="px-4 py-3 border">Image</th>
//               <th className="px-4 py-3 border">Created At</th>
//               <th className="px-4 py-3 border text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((invoice, index) => {
//               const isEditing = editIndex === index;
//               const data = invoice.parsedData;
//               return (
//                 <tr
//                   key={invoice._id}
//                   className={`transition ${
//                     index % 2 === 0 ? "bg-green-50" : "bg-green-100"
//                   } hover:bg-green-200`}
//                 >
//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         value={data.invoiceNumber}
//                         onChange={(e) => handleInvoiceChange(e, index, "invoiceNumber")}
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : data.invoiceNumber}
//                   </td>

//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         type="date"
//                         value={data.invoiceDate}
//                         onChange={(e) => handleInvoiceChange(e, index, "invoiceDate")}
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : data.invoiceDate}
//                   </td>

//                   <td className="px-4 py-2 border">
//                     {isEditing ? (
//                       <input
//                         value={data.vendorName}
//                         onChange={(e) => handleInvoiceChange(e, index, "vendorName")}
//                         className="w-full border rounded px-2 py-1"
//                       />
//                     ) : data.vendorName}
//                   </td>

//                   <td className="px-4 py-2 border text-right">
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={data.totalAmount}
//                         onChange={(e) => handleInvoiceChange(e, index, "totalAmount")}
//                         className="w-full border rounded px-2 py-1 text-right"
//                       />
//                     ) : data.totalAmount}
//                   </td>

//                   <td className="px-4 py-2 border text-right">
//                     {isEditing ? (
//                       <input
//                         type="number"
//                         value={data.taxAmount}
//                         onChange={(e) => handleInvoiceChange(e, index, "taxAmount")}
//                         className="w-full border rounded px-2 py-1 text-right"
//                       />
//                     ) : data.taxAmount}
//                   </td>

//                   <td className="px-4 py-2 border">
//                     {Array.isArray(data.items) ? data.items.join(", ") : data.items}
//                   </td>

//                   <td className="px-4 py-2 border text-blue-600">
//                     {data.imagePath ? (
//                       <a href={data.imagePath} target="_blank" rel="noreferrer" className="underline">
//                         View
//                       </a>
//                     ) : "No Image"}
//                   </td>

//                   <td className="px-4 py-2 border text-gray-600">{data.createdAt}</td>

//                   <td className="px-4 py-2 border text-center flex justify-center gap-2">
//                     {isEditing ? (
//                       <button
//                         onClick={() => handleInvoiceSave(invoice, index)}
//                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                       >
//                         Save
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => setEditIndex(index)}
//                           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(invoice._id)}
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






//sec version for deleted botton logic


import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function InvoicesTable({ apiEndpoint = "/api/files/my-invoices", title = "My Invoices" }) {
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  // const BASE_URL = "http://localhost:5000";
   const BASE_URL = "https://ai-poc-3.onrender.com";

  // 🔄 Fetch Invoices
  const fetchInvoices = useCallback(async () => {
    try {
      setLoadingInvoices(true);
      const res = await axios.get(`${BASE_URL}${apiEndpoint}`, { withCredentials: true });

      const data = Array.isArray(res.data) ? res.data : res.data.invoices || [];

      const formatted = data.map((inv) => ({
        ...inv,
        parsedData: {
          invoiceNumber: inv.invoiceNumber || "",
          invoiceDate: inv.invoiceDate
            ? new Date(inv.invoiceDate).toISOString().split("T")[0]
            : "",
          vendorName: inv.vendorName || "",
          totalAmount: inv.totalAmount || 0,
          taxAmount: inv.taxAmount || 0,
          items: inv.items || [],
          imagePath: inv.imagePath || "",
          createdAt: inv.createdAt
            ? new Date(inv.createdAt).toISOString().split("T")[0]
            : "",
        },
      }));

      setInvoices(formatted);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setInvoices([]);
    } finally {
      setLoadingInvoices(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // ✏️ Update field locally while editing
  const handleInvoiceChange = (e, index, field) => {
    const newInvoices = [...invoices];
    newInvoices[index].parsedData[field] = e.target.value;
    setInvoices(newInvoices);
  };

  // 💾 Save edited invoice
  const handleInvoiceSave = async (invoice, index) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/files/update-invoice/${invoice._id}`,
        { parsedData: invoice.parsedData },
        { withCredentials: true }
      );

      const updatedInvoices = [...invoices];
      updatedInvoices[index].parsedData = {
        ...updatedInvoices[index].parsedData,
        ...res.data.updatedInvoice,
      };
      setInvoices(updatedInvoices);

      alert("✅ Invoice updated successfully!");
      setEditIndex(null);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // 🗑️ Soft Delete invoice
  const handleDelete = async (invoiceId) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await axios.delete(
  `${BASE_URL}/api/files/soft-delete-invoice/${invoiceId}`,
  { withCredentials: true }
);

      // Remove from visible list (but not from DB)
      setInvoices(invoices.filter((inv) => inv._id !== invoiceId));
      alert("✅ Invoice deleted (soft delete) successfully!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loadingInvoices) return <p>Loading invoices...</p>;
  if (invoices.length === 0) return <p>No invoices uploaded yet.</p>;

  return (
    <div className="mt-6 w-full">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">{title}</h3>
      <div className="overflow-x-auto w-full">
        <table className="w-full border border-gray-300 rounded-lg text-sm text-left shadow-md">
          <thead className="bg-green-300 text-gray-900 sticky top-0">
            <tr>
              <th className="px-4 py-3 border">Invoice #</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Vendor Name</th>
              <th className="px-4 py-3 border">Total Amount</th>
              <th className="px-4 py-3 border">Tax Amount</th>
              <th className="px-4 py-3 border">Items</th>
              <th className="px-4 py-3 border">Image</th>
              <th className="px-4 py-3 border">Created At</th>
              <th className="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => {
              const isEditing = editIndex === index;
              const data = invoice.parsedData;

              return (
                <tr
                  key={invoice._id}
                  className={`transition ${
                    index % 2 === 0 ? "bg-green-50" : "bg-green-100"
                  } hover:bg-green-200`}
                >
                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        value={data.invoiceNumber}
                        onChange={(e) => handleInvoiceChange(e, index, "invoiceNumber")}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      data.invoiceNumber
                    )}
                  </td>

                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        type="date"
                        value={data.invoiceDate}
                        onChange={(e) => handleInvoiceChange(e, index, "invoiceDate")}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      data.invoiceDate
                    )}
                  </td>

                  <td className="px-4 py-2 border">
                    {isEditing ? (
                      <input
                        value={data.vendorName}
                        onChange={(e) => handleInvoiceChange(e, index, "vendorName")}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      data.vendorName
                    )}
                  </td>

                  <td className="px-4 py-2 border text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={data.totalAmount}
                        onChange={(e) => handleInvoiceChange(e, index, "totalAmount")}
                        className="w-full border rounded px-2 py-1 text-right"
                      />
                    ) : (
                      data.totalAmount
                    )}
                  </td>

                  <td className="px-4 py-2 border text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={data.taxAmount}
                        onChange={(e) => handleInvoiceChange(e, index, "taxAmount")}
                        className="w-full border rounded px-2 py-1 text-right"
                      />
                    ) : (
                      data.taxAmount
                    )}
                  </td>

                  <td className="px-4 py-2 border">
                    {Array.isArray(data.items) ? data.items.join(", ") : data.items}
                  </td>

                  <td className="px-4 py-2 border text-blue-600">
                    {data.imagePath ? (
                      <a
                        href={`${BASE_URL}${data.imagePath.startsWith("/") ? data.imagePath : `/${data.imagePath}`}`}                             //{data.imagePath}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        View
                      </a>
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td className="px-4 py-2 border text-gray-600">{data.createdAt}</td>

                  <td className="px-4 py-2 border text-center flex justify-center gap-2">
                    {isEditing ? (
                      <button
                        onClick={() => handleInvoiceSave(invoice, index)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditIndex(index)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(invoice._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
