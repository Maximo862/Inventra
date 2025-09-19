import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext";

export function Login() {
  const { login } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    email,
    password,
  };

  async function hanldeSubmit(e) {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      await login(user);
    }
  }

  return (
    <div>
      <form onSubmit={hanldeSubmit()}>
        <input
          type="text"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
}
