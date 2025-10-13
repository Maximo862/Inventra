import { User } from "../types/types";

const URL = "http://localhost:4000";

export async function registerReq(user: User) {
  try {
    const res = await fetch(`${URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error };
  }
}

export async function loginReq(user: User) {
  try {
    const res = await fetch(`${URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error };
  }
}

export async function verifyReq() {
  try {
    const res = await fetch(`${URL}/verify`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error };
  }
}
