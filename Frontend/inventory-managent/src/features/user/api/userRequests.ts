import { User } from "@/types/types";
import { fetchAPI } from "@/utils/fetchHelper";


export const getAllUsersRequest = () =>
  fetchAPI("/user");

export const createUserRequest = (user: User) =>
  fetchAPI("/user", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const updateUserRequest = (user: User, id: number) =>
  fetchAPI(`/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

export const deleteUserRequest = (id: number) =>
  fetchAPI(`/user/${id}`, { method: "DELETE" });