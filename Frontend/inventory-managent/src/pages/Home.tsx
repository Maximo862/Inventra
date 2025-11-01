import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h2>WELCOME</h2>
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
    </div>
  );
}
