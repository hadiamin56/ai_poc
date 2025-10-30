// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/Authcontext";
// import Header from "../components/Header";
// import BusinessInfo from "../components/BusinessInfo";
// import AdminOptions from "../components/AdminOptions";
// import EmployeeUpload from "../components/EmployeeUpload";
// import SubUsersTable from "../components/SubUsersTable";
// import PendingUsers from "../components/PendingUsers";
// import SuperAdminAdminsTable from "../components/SuperAdminAdminsTable";
// import EditAdminModal from "../components/EditAdminModal";
// import UsersModal from "../components/UserModal";
// import axios from "axios";

// export default function Dashboard() {
//   const { user, logoutUser, refreshUser, loading } = useContext(AuthContext);

//   const [adminOption, setAdminOption] = useState("subuser");
//   const [form, setForm] = useState({
//     employeeName: "",
//     email: "",
//     contactNumber: "",
//     gstNumber: "",
//     pincode: "",
//     businessType: "",
//     businessUnitAddress: "",
//     password: "",
//   });
//   const [file, setFile] = useState(null);
//   const [subUsers, setSubUsers] = useState([]);
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [selectedAdminUsers, setSelectedAdminUsers] = useState([]);
//   const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

//   const token = localStorage.getItem("token");

//   // Fetch Users
//   const fetchUsers = async () => {
//     if (!user) return;
//     try {
//       if (user.role === "admin") {
//         const res = await axios.get("http://localhost:5000/api/auth/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSubUsers(res.data);
//       }
//       if (user.role === "super_admin") {
//         const res = await axios.get("http://localhost:5000/api/auth/pending-users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPendingUsers(res.data);
//         fetchAdmins();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/all-admins", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAdmins(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchUsers();
//   }, [user]);

//   // Handlers
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/create-user", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert(`Sub-user created!\nPassword: ${res.data.plainPassword}`);
//       setForm({
//         employeeName: "",
//         email: "",
//         contactNumber: "",
//         gstNumber: "",
//         pincode: "",
//         businessType: "",
//         businessUnitAddress: "",
//         password: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating user");
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/approve-user/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("User approved");
//       fetchUsers();
//       refreshUser();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   const openEditModalHandler = (admin) => {
//     setEditForm(admin);
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (e) =>
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/update-admin/${editForm._id}`,
//         editForm,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Admin updated");
//       setEditModalOpen(false);
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     }
//   };

//   const handleToggleStatus = async (id) => {
//     if (!window.confirm("Toggle status?")) return;
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/disable-admin/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Action failed");
//     }
//   };

// const handleDelete = async (id) => {
//   if (!window.confirm("Delete admin?")) return;
//   try {
//     await axios.delete(`http://localhost:5000/api/auth/delete-admin/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchAdmins();
//   } catch (err) {
//     alert(err.response?.data?.message || "Delete failed");
//   }
// };


//   const openUsersModal = (adminId) => {
//     const admin = admins.find((a) => a._id === adminId);
//     if (admin) {
//       setSelectedAdminUsers(admin.users || []);
//       setIsUsersModalOpen(true);
//     }
//   };

//   const closeUsersModal = () => {
//     setIsUsersModalOpen(false);
//     setSelectedAdminUsers([]);
//   };

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!user) return <div className="p-6">Please login</div>;

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <Header user={user} logoutUser={logoutUser} />
//       <BusinessInfo user={user} logoutUser={logoutUser} />

//       {user.role === "admin" && (
//         <AdminOptions
//           adminOption={adminOption}
//           setAdminOption={setAdminOption}
//           form={form}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           file={file}
//           handleFileChange={handleFileChange}
//           user={user}
//           token={token}
//         />
//       )}

//       {user.role === "employee" && <EmployeeUpload token={token} />}

//       {user.role === "super_admin" && (
//         <>
//           <PendingUsers pendingUsers={pendingUsers} handleApprove={handleApprove} />
//           <SuperAdminAdminsTable
//             admins={admins}
//             openEditModal={openEditModalHandler}
//             handleToggleStatus={handleToggleStatus}
//             handleDelete={handleDelete}
//             openUsersModal={openUsersModal}
//           />
//         </>
//       )}

//       {user.role === "admin" && <SubUsersTable subUsers={subUsers} />}

//       {editModalOpen && (
//         <EditAdminModal
//           editForm={editForm}
//           handleEditChange={handleEditChange}
//           handleEditSubmit={handleEditSubmit}
//           setEditModalOpen={setEditModalOpen}
//         />
//       )}

//       {isUsersModalOpen && (
//         <UsersModal users={selectedAdminUsers} onClose={closeUsersModal} />
//       )}
//     </div>
//   );
// }








// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/Authcontext";
// import Header from "../components/Header";
// import BusinessInfo from "../components/BusinessInfo";
// import AdminOptions from "../components/AdminOptions";
// import EmployeeUpload from "../components/EmployeeUpload";
// import SubUsersTable from "../components/SubUsersTable";
// import PendingUsers from "../components/PendingUsers";
// import SuperAdminAdminsTable from "../components/SuperAdminAdminsTable";
// import EditAdminModal from "../components/EditAdminModal";
// import UsersModal from "../components/UserModal";
// import axios from "axios";

// export default function Dashboard() {
//   const { user, logoutUser, refreshUser, loading } = useContext(AuthContext);

//   const [adminOption, setAdminOption] = useState("subuser");
//   const [form, setForm] = useState({
//     employeeName: "",
//     email: "",
//     contactNumber: "",
//     gstNumber: "",
//     pincode: "",
//     businessType: "",
//     businessUnitAddress: "",
//     password: "",
//   });
//   const [file, setFile] = useState(null);
//   const [subUsers, setSubUsers] = useState([]);
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [selectedAdminUsers, setSelectedAdminUsers] = useState([]);
//   const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

//   // ✅ Fetch Users (cookie-based)
//   const fetchUsers = async () => {
//     if (!user) return;
//     try {
//       if (user.role === "admin") {
//         const res = await axios.get("http://localhost:5000/api/auth/users", {
//           withCredentials: true,
//         });
//         setSubUsers(res.data);
//       }
//       if (user.role === "super_admin") {
//         const res = await axios.get("http://localhost:5000/api/auth/pending-users", {
//           withCredentials: true,
//         });
//         setPendingUsers(res.data);
//         fetchAdmins();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Fetch Admins (super admin only)
//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/all-admins", {
//         withCredentials: true,
//       });
//       setAdmins(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchUsers();
//   }, [user]);

//   // ✅ Handlers
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   // ✅ Create Sub-User
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/create-user", form, {
//         withCredentials: true,
//       });
//       alert(`Sub-user created!\nPassword: ${res.data.plainPassword}`);
//       setForm({
//         employeeName: "",
//         email: "",
//         contactNumber: "",
//         gstNumber: "",
//         pincode: "",
//         businessType: "",
//         businessUnitAddress: "",
//         password: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating user");
//     }
//   };

//   // ✅ Approve Pending User
//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/approve-user/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       alert("User approved");
//       fetchUsers();
//       refreshUser();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error approving user");
//     }
//   };


  
//   // ✅ Open Edit Modal
//   const openEditModalHandler = (admin) => {
//     setEditForm(admin);
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (e) =>
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });



//   // ✅ Update Admin
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/update-admin/${editForm._id}`,
//         editForm,
//         { withCredentials: true }
//       );
//       alert("Admin updated successfully");
//       setEditModalOpen(false);
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     }
//   };

//   // ✅ Toggle Admin Status
//   const handleToggleStatus = async (id) => {
//     if (!window.confirm("Toggle status?")) return;
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/disable-admin/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Status toggle failed");
//     }
//   };

//   // ✅ Delete Admin
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete admin?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/auth/delete-admin/${id}`, {
//         withCredentials: true,
//       });
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   // ✅ Open Modal to View Users of an Admin
//   const openUsersModal = (adminId) => {
//     const admin = admins.find((a) => a._id === adminId);
//     if (admin) {
//       setSelectedAdminUsers(admin.users || []);
//       setIsUsersModalOpen(true);
//     }
//   };

//   const closeUsersModal = () => {
//     setIsUsersModalOpen(false);
//     setSelectedAdminUsers([]);
//   };

//   // ✅ Conditional UI Rendering
//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!user) return <div className="p-6">Please login</div>;

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <Header user={user} logoutUser={logoutUser} />
//       <BusinessInfo user={user} logoutUser={logoutUser} />

//       {/* Admin Section */}
//       {user.role === "admin" && (
//         <AdminOptions
//           adminOption={adminOption}
//           setAdminOption={setAdminOption}
//           form={form}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           file={file}
//           handleFileChange={handleFileChange}
//           user={user}
//         />
//       )}

//       {/* Employee Section */}
//       {user.role === "employee" && <EmployeeUpload />}

//       {/* Super Admin Section */}
//       {user.role === "super_admin" && (
//         <>
//           <PendingUsers pendingUsers={pendingUsers} handleApprove={handleApprove} />
//           <SuperAdminAdminsTable
//             admins={admins}
//             openEditModal={openEditModalHandler}
//             handleToggleStatus={handleToggleStatus}
//             handleDelete={handleDelete}
//             openUsersModal={openUsersModal}
//           />
//         </>
//       )}

//       {/* Admin Sub Users */}
//       {user.role === "admin" && <SubUsersTable subUsers={subUsers} />}

//       {/* Edit Modal */}
//       {editModalOpen && (
//         <EditAdminModal
//           editForm={editForm}
//           handleEditChange={handleEditChange}
//           handleEditSubmit={handleEditSubmit}
//           setEditModalOpen={setEditModalOpen}
//         />
//       )}

//       {/* Users Modal */}
//       {isUsersModalOpen && (
//         <UsersModal users={selectedAdminUsers} onClose={closeUsersModal} />
//       )}
//     </div>
//   );
// }








// 24 ka purana code


// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/Authcontext";
// import Header from "../components/Header";
// import BusinessInfo from "../components/BusinessInfo";
// import AdminOptions from "../components/AdminOptions";
// import EmployeeUpload from "../components/EmployeeUpload";
// import SubUsersTable from "../components/SubUsersTable";
// import PendingUsers from "../components/PendingUsers";
// import SuperAdminAdminsTable from "../components/SuperAdminAdminsTable";
// import EditAdminModal from "../components/EditAdminModal";
// import UsersModal from "../components/UserModal";
// import axios from "axios";

// export default function Dashboard() {
//   const { user, logoutUser, refreshUser, loading } = useContext(AuthContext);

//   const [adminOption, setAdminOption] = useState("subuser");
//   const [form, setForm] = useState({
//     employeeName: "",
//     email: "",
//     contactNumber: "",
//     gstNumber: "",
//     pincode: "",
//     businessType: "",
//     businessUnitAddress: "",
//     password: "",
//   });
//   const [file, setFile] = useState(null);
//   const [subUsers, setSubUsers] = useState([]);
//   const [pendingUsers, setPendingUsers] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [selectedAdminUsers, setSelectedAdminUsers] = useState([]);
//   const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

//   // ✅ Fetch Users (cookie-based)
//   const fetchUsers = async () => {
//     if (!user) return;
//     try {
//       if (user.role === "admin") {
//         const res = await axios.get("http://localhost:5000/api/auth/users", {
//           withCredentials: true,
//         });
//         setSubUsers(res.data);
//       }
//       if (user.role === "super_admin") {
//         const res = await axios.get("http://localhost:5000/api/auth/pending-users", {
//           withCredentials: true,
//         });
//         setPendingUsers(res.data);
//         fetchAdmins();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Fetch Admins (super admin only)
//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/all-admins", {
//         withCredentials: true,
//       });
//       setAdmins(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchUsers();
//   }, [user]);

//   // ✅ Handlers
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   // ✅ Create Sub-User
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/create-user", form, {
//         withCredentials: true,
//       });
//       alert(`Sub-user created!\nPassword: ${res.data.plainPassword}`);
//       setForm({
//         employeeName: "",
//         email: "",
//         contactNumber: "",
//         gstNumber: "",
//         pincode: "",
//         businessType: "",
//         businessUnitAddress: "",
//         password: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating user");
//     }
//   };

//   // ✅ Approve Pending User
//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/approve-user/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       alert("User approved");
//       fetchUsers();
//       refreshUser();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error approving user");
//     }
//   };

//   // ✅ Open Edit Modal
//   const openEditModalHandler = (admin) => {
//     setEditForm(admin);
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (e) =>
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });

//   // ✅ Update Admin
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/update-admin/${editForm._id}`,
//         editForm,
//         { withCredentials: true }
//       );
//       alert("Admin updated successfully");
//       setEditModalOpen(false);
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     }
//   };

//   // ✅ Toggle Admin Status
//   const handleToggleStatus = async (id) => {
//     if (!window.confirm("Toggle status?")) return;
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/auth/disable-admin/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Status toggle failed");
//     }
//   };

//   // ✅ Delete Admin
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete admin?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/auth/delete-admin/${id}`, {
//         withCredentials: true,
//       });
//       fetchAdmins();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   // ✅ Open Modal to View Users of an Admin
//   const openUsersModal = (adminId) => {
//     const admin = admins.find((a) => a._id === adminId);
//     if (admin) {
//       setSelectedAdminUsers(admin.users || []);
//       setIsUsersModalOpen(true);
//     }
//   };

//   const closeUsersModal = () => {
//     setIsUsersModalOpen(false);
//     setSelectedAdminUsers([]);
//   };

//   // ✅ Conditional UI Rendering
//   if (loading) return <div className="p-6">Loading...</div>;
//   if (!user) return <div className="p-6">Please login</div>;

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <Header user={user} logoutUser={logoutUser} />
//       <BusinessInfo user={user} logoutUser={logoutUser} />

//       {/* Admin Section */}
//       {user.role === "admin" && (
//         <AdminOptions
//           adminOption={adminOption}
//           setAdminOption={setAdminOption}
//           form={form}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           file={file}
//           handleFileChange={handleFileChange}
//           user={user}
//           subUsers={subUsers}
//         />
//       )}

//       {/* Employee Section */}
//       {user.role === "employee" && <EmployeeUpload />}

//       {/* Super Admin Section */}
//       {user.role === "super_admin" && (
//         <>
//           <PendingUsers pendingUsers={pendingUsers} handleApprove={handleApprove} />
//           <SuperAdminAdminsTable
//             admins={admins}
//             openEditModal={openEditModalHandler}
//             handleToggleStatus={handleToggleStatus}
//             handleDelete={handleDelete}
//             openUsersModal={openUsersModal}
//           />
//         </>
//       )}

//       {/* Admin Sub Users */}
//       {user.role === "admin" && adminOption === "createUser" && (
//         <SubUsersTable subUsers={subUsers} />
//       )}

//       {/* Edit Modal */}
//       {editModalOpen && (
//         <EditAdminModal
//           editForm={editForm}
//           handleEditChange={handleEditChange}
//           handleEditSubmit={handleEditSubmit}
//           setEditModalOpen={setEditModalOpen}
//         />
//       )}

//       {/* Users Modal */}
//       {isUsersModalOpen && (
//         <UsersModal users={selectedAdminUsers} onClose={closeUsersModal} />
//       )}
//     </div>
//   );
// }









// 24 ka bs invoices fetch krne k liye hai saare users ka










// temp
// 25 k subha yehi tha

import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/Authcontext";
import Header from "../components/Header";
import BusinessInfo from "../components/BusinessInfo";
import AdminOptions from "../components/AdminOptions";
import EmployeeUpload from "../components/EmployeeUpload";
import SubUsersTable from "../components/SubUsersTable";
import PendingUsers from "../components/PendingUsers";
import SuperAdminAdminsTable from "../components/SuperAdminAdminsTable";
import EditAdminModal from "../components/EditAdminModal";
import UsersModal from "../components/UserModal";
import axios from "axios";

export default function Dashboard() {
  const { user, logoutUser, refreshUser, loading } = useContext(AuthContext);

  const [adminOption, setAdminOption] = useState("subuser");
  const [form, setForm] = useState({
    employeeName: "",
    email: "",
    contactNumber: "",
    gstNumber: "",
    pincode: "",
    businessType: "",
    businessUnitAddress: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [subUsers, setSubUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [selectedAdminUsers, setSelectedAdminUsers] = useState([]);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

  // ✅ Fetch Admins (super admin only)
  const fetchAdmins = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/all-admins", {
        withCredentials: true,
      });
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ Fetch Users (cookie-based)
  const fetchUsers = useCallback(async () => {
    if (!user) return;
    try {
      if (user.role === "admin") {
        const res = await axios.get("http://localhost:5000/api/auth/users", {
          withCredentials: true,
        });
        setSubUsers(res.data);
      }
      if (user.role === "super_admin") {
        const res = await axios.get("http://localhost:5000/api/auth/pending-users", {
          withCredentials: true,
        });
        setPendingUsers(res.data);
        fetchAdmins();
      }
    } catch (err) {
      console.error(err);
    }
  }, [user, fetchAdmins]);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers]); // ✅ Warning gone

  // ✅ Handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ✅ Create Sub-User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/create-user", form, {
        withCredentials: true,
      });
      alert(`Sub-user created!\nPassword: ${res.data.plainPassword}`);
      setForm({
        employeeName: "",
        email: "",
        contactNumber: "",
        gstNumber: "",
        pincode: "",
        businessType: "",
        businessUnitAddress: "",
        password: "",
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  // ✅ Approve Pending User
  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/auth/approve-user/${id}`,
        {},
        { withCredentials: true }
      );
      alert("User approved");
      fetchUsers();
      refreshUser();
    } catch (err) {
      alert(err.response?.data?.message || "Error approving user");
    }
  };

  // ✅ Open Edit Modal
  const openEditModalHandler = (admin) => {
    setEditForm(admin);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // ✅ Update Admin
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/auth/update-admin/${editForm._id}`,
        editForm,
        { withCredentials: true }
      );
      alert("Admin updated successfully");
      setEditModalOpen(false);
      fetchAdmins();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // ✅ Toggle Admin Status
  const handleToggleStatus = async (id) => {
    if (!window.confirm("Toggle status?")) return;
    try {
      await axios.patch(
        `http://localhost:5000/api/auth/disable-admin/${id}`,
        {},
        { withCredentials: true }
      );
      fetchAdmins();
    } catch (err) {
      alert(err.response?.data?.message || "Status toggle failed");
    }
  };

  // ✅ Delete Admin
  const handleDelete = async (id) => {
    if (!window.confirm("Delete admin?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/delete-admin/${id}`, {
        withCredentials: true,
      });
      fetchAdmins();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  // ✅ Open Modal to View Users of an Admin
  const openUsersModal = (adminId) => {
    const admin = admins.find((a) => a._id === adminId);
    if (admin) {
      setSelectedAdminUsers(admin.users || []);
      setIsUsersModalOpen(true);
    }
  };

  const closeUsersModal = () => {
    setIsUsersModalOpen(false);
    setSelectedAdminUsers([]);
  };

  // ✅ Conditional UI Rendering
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">Please login</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <Header user={user} logoutUser={logoutUser} />
      <BusinessInfo user={user} logoutUser={logoutUser} />

      {/* Admin Section */}
      {user.role === "admin" && (
        <AdminOptions
          adminOption={adminOption}
          setAdminOption={setAdminOption}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          file={file}
          handleFileChange={handleFileChange}
          user={user}
          subUsers={subUsers}
        />
      )}

      {/* Employee Section */}
      {user.role === "employee" && <EmployeeUpload />}

      {/* Super Admin Section */}
      {user.role === "super_admin" && (
        <>
          <PendingUsers pendingUsers={pendingUsers} handleApprove={handleApprove} />
          <SuperAdminAdminsTable
            admins={admins}
            openEditModal={openEditModalHandler}
            handleToggleStatus={handleToggleStatus}
            handleDelete={handleDelete}
            openUsersModal={openUsersModal}
          />
        </>
      )}

      {/* Admin Sub Users */}
      {user.role === "admin" && adminOption === "createUser" && (
        <SubUsersTable subUsers={subUsers} />
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <EditAdminModal
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          setEditModalOpen={setEditModalOpen}
        />
      )}

      {/* Users Modal */}
      {isUsersModalOpen && (
        <UsersModal users={selectedAdminUsers} onClose={closeUsersModal} />
      )}
    </div>
  );
}















// experiment


