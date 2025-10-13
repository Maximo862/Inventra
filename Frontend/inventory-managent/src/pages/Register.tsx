import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const { register, isauthenticated } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isauthenticated === true) navigate("/products");
  }, [isauthenticated]);

  const user = {
    username,
    email,
    password,
  };

  async function hanldeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username.trim() && email.trim() && password.trim()) {
      await register(user);
    }
  }

  return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <input
          type="text"
          placeholder="enter your user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
