import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    try {
      // const token = sessionStorage.getItem("token");
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const login = (user, token) => {
    setUser(user);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

//   const login = (user, token) => {
//   setUser(user);
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(user));
// };

// const logout = () => {
//   setUser(null);
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
// };


  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthProvider;
