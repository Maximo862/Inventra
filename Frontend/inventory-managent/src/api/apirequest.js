const URL = "http://localhost:4000";

export async function registerReq(user) {
  try {
    const res = await fetch(`${URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function loginReq(user) {
  try {
    const res = await fetch(`${URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
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
    return { error: error || "Unauthorized" };
  }
}
