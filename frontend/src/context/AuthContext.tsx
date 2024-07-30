import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login, register, logout } from "../services/auth";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(getCurrentUser());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(decoded);
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const response = await login({ email, password });
    localStorage.setItem("token", response.data.token);
    setUser(jwtDecode(response.data.token));
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await register({ username, email, password });
    localStorage.setItem("token", response.data.token);
    setUser(jwtDecode(response.data.token));
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
