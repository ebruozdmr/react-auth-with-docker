import { createContext } from "react";
import useAuth from "../hooks/useAuth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useAuth();
  console.log(auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
