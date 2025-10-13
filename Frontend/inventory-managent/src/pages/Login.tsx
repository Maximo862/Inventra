import { useContext, useState, useEffect, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login, isauthenticated } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    email,
    password,
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isauthenticated === true) navigate("/products");
  }, [isauthenticated]);

  async function hanldeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      await login(user);
    }
  }

  return (
    <div>
      <form onSubmit={hanldeSubmit}>
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
