import { createContext } from "react";
import { loginReq, registerReq, verifyReq } from "../api/apirequest";
import { useState } from "react";
import { useEffect } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [isauthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function register(user) {
    try {
      const res = await registerReq(user);
      setisAuthenticated(true);
      console.log(res);
    } catch (error) {
      console.error(error);
      setisAuthenticated(false);
    }
  }

  async function login(user) {
    try {
      const res = await loginReq(user);
      setisAuthenticated(true);
      console.log(res);
    } catch (error) {
      console.error(error);
      setisAuthenticated(false);
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
        console.error(error);
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
    <authContext.Provider
      value={{
        register,
        login,
        loading,
        isauthenticated,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
