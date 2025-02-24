import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const login = token => {
    setUser({ token });
    setCookie("token", token, { path: "/" });
  };
  const logout = () => {
    setUser(null);
    removeCookie("token", { path: "/" });
  };

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  return loading ? null : (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
