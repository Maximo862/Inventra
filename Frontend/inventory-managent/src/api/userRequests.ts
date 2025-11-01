import { User } from "../types/types";

const URL = "http://localhost:4000";

export async function getAllUsersRequest() {
  const res = await fetch(`${URL}/user`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("GetAllUsers Error");
  return res.json();
}

export async function createUserRequest(user: User) {
  const res = await fetch(`${URL}/user`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("CreateUser Error");
  return res.json();
}

export async function updateUserRequest(user: User, id: number) {
  const res = await fetch(`${URL}/user/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("UpdateUser Error");
  return res.json();
}

export async function deleteUserRequest(id: number) {
  const res = await fetch(`${URL}/user/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("DeleteUser Error");
  return res.json();
}
