import { createContext, useEffect, useState } from "react";
import { loginReq, registerReq, verifyReq , logoutReq} from "../api/apirequest";
import { User } from "../types/types";

interface AuthContextType {
 register: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isauthenticated: boolean;
  errors : string 
  user : User | null
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null)
  const [isauthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<any | null>(null)

  async function register(user: User) {
    try {
      const res = await registerReq(user);
      setisAuthenticated(true);
      console.log(res)
      setUser(res.user)
    } catch (error:any) {
      console.error("register: ", error);
      setisAuthenticated(false);
      setErrors(error.error)
      setUser(null)
    }
  }

  async function login(user: User) {
    try {
      const res = await loginReq(user);
      setisAuthenticated(true);
      console.log(res)
      setUser(res.user)
    } catch (error:any) {
      console.error(error);
      setisAuthenticated(false);
       setErrors(error.error)
       setUser(null)
    }
  }

  useEffect(() => {
    async function verify() {
      try {
        const res = await verifyReq();
        if (res?.error) {
          setisAuthenticated(false);
          setUser(null)
        } else {
          setisAuthenticated(true);
          setUser(res.user)
        }
      } catch (error) {
        console.log(error);
        setisAuthenticated(false);
        setUser(null)
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, []);

  async function logout() {
  try {
    await logoutReq(); 
    setisAuthenticated(false);
    setUser(null);
  } catch (error) {
    console.error("logout:", error);
  }
}

console.log("user: ", user)
  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        loading,
        isauthenticated,
        errors,
        user,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
