import { createContext, useState } from "react";
import { loginRequest, logoutRequest } from "../api/request";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (body) => {
    try {
      const token = await loginRequest(body);
      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try{
        await logoutRequest();
        localStorage.removeItem("token");
        setToken("");
    } catch (err) {
        throw err
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
