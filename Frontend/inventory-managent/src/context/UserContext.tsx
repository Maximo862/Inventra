import { createContext, useState, useEffect } from "react";
import {
  getAllUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../api/userRequests";
import { User } from "../types/types";

interface UserContextType {
  users: User[];
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User, id: number) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: any) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getAllUsersRequest();
        setUsers(res || []);
        console.log("UsersContext:", res);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  async function createUser(user: User) {
    try {
      const res = await createUserRequest(user);
      console.log("Nuevo usuario creado:", res);
      setUsers((prev) => [...prev, res]);
    } catch (error) {
      console.error(error);
    }
  }
console.log("Usuariosss2 :", users);
  async function updateUser(user: User, id: number) {
    try {
      const res = await updateUserRequest(user, id);
      setUsers((prev) => prev.map((u) => (u.id === id ? res : u)));
      console.log("Usuario actualizado:", res);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUser(id: number) {
    try {
      const res = await deleteUserRequest(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      console.log("Usuario eliminado:", res);
    } catch (error) {
      console.error(error);
    }
  }
console.log("Usuariosss :", users);
  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
