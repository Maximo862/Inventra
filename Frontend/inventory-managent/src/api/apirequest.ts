import { User } from "../types/types";

const URL = "http://localhost:4000";

export async function registerReq(user: User) {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Register error");
  return res.json();
}

export async function loginReq(user: User) {
  const res = await fetch(`${URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error at login");
  return res.json();
}

export async function verifyReq() {
  const res = await fetch(`${URL}/verify`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Verify error");
  return res.json();
}

export async function logoutReq() {
  const res = await fetch(`${URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout error");
  return res.json();
}
