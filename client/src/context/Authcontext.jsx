// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }

//     if (token) {
//       axios
//         .get("http://localhost:5000/api/auth/dashboard", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           if (res.data?.user) {
//             setUser(res.data.user);
//             localStorage.setItem("user", JSON.stringify(res.data.user));
//           } else {
//             logoutUser();
//           }
//         })
//         .catch(() => logoutUser())
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const loginUser = (token, userData) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     setUser(userData);
//   };

//   const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     delete axios.defaults.headers.common["Authorization"];
//     setUser(null);
//   };

//   const refreshUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data?.user) {
//         setUser(res.data.user);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loginUser, logoutUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };














// changes for session cookies instead of local storage



// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch current user from backend using cookie
//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/dashboard", { withCredentials: true });
//       if (res.data?.user) {
//         setUser(res.data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const loginUser = async () => {
//     // No need to store token manually, backend sets HTTP-only cookie
//     await fetchUser();
//   };

//   const logoutUser = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true }); // backend should clear cookie
//     } catch (err) {
//       console.error(err);
//     }
//     setUser(null);
//   };

//   const refreshUser = async () => {
//     await fetchUser();
//   };

//   return (
//     <AuthContext.Provider value={{ user, loginUser, logoutUser, loading, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

























import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from backend using cookie
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/dashboard", {
        withCredentials: true, // ✅ send cookie
      });

      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // loginUser just refreshes user info, cookie is handled by backend
  const loginUser = async () => {
    await fetchUser();
  };

  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null);
  };

  // Call this after any action that changes user-related data
  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
