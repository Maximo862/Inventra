import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/types";

export function useHandleForm(mode = "register") {
  const { register, login } = useContext(AuthContext)!;
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (mode === "register") {
      await register(user);
    } else {
      await login(user);
    }
  }

  return {
    handleSubmit,
    user,
    setUser,
  };
}
