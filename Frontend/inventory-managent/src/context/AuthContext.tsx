import { createContext, useEffect, useState } from "react";
import { loginReq, registerReq, verifyReq } from "../api/apirequest";
import { User } from "../types/types";

interface AuthContextType {
  register: Function;
  login: Function;
  loading: boolean;
  isauthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
  const [isauthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function register(user: User) {
    try {
      const res = await registerReq(user);
      setisAuthenticated(true);
      console.log("register: ", res);
    } catch (error) {
      console.error("register: ", error);
      setisAuthenticated(false);
    }
  }

  async function login(user: User) {
    try {
      const res = await loginReq(user);
      setisAuthenticated(true);
      console.log("respuesta y se autentica: ", res);
    } catch (error) {
      console.error(error);
      setisAuthenticated(false);
      console.log("respuesta y NO autentica: ", error);
    }
  }

  useEffect(() => {
    async function verify() {
      try {
        const res = await verifyReq();
        if (res?.error) {
          setisAuthenticated(false);
          console.log("VALUE1 : ", isauthenticated);
        } else {
          setisAuthenticated(true);
          console.log("VALUE2 : ", isauthenticated);
        }
        console.log("verify: ", res);
      } catch (error) {
        console.log(error);
        setisAuthenticated(false);
        console.log("VALUE3 : ", isauthenticated);
      } finally {
        setLoading(false);
        console.log("VALUE4 : ", isauthenticated);
      }
    }
    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        loading,
        isauthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
