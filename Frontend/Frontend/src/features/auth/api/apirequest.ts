import { User } from "@/types/types";
import { fetchAPI } from "@/utils/fetchHelper";


export const registerReq = (user: User) =>
  fetchAPI("/register", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const loginReq = (user: User) =>
  fetchAPI("/login", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const verifyReq = () =>
  fetchAPI("/verify");

export const logoutReq = () =>
  fetchAPI("/logout", { method: "POST" });