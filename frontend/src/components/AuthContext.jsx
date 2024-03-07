import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // You can perform your login logic here
    // For simplicity, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const logout = () => {
    // You can perform your logout logic here
    // For simplicity, we'll just set isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
