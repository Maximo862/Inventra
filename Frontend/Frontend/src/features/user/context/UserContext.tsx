import { createContext, useState, useEffect } from "react";
import {
  getAllUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../api/userRequests";
import { User } from "../../../types/types";
import toast from "react-hot-toast";
import { handleError } from "@/utils/errorHandler";

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
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  async function createUser(user: User) {
    try {
      const res = await createUserRequest(user);
      setUsers((prev) => [...prev, res]);
      toast.success("Usuario creado exitosamente");
    } catch (error) {
      handleError(error, "crear");
      throw error;
    }
  }

  async function updateUser(user: User, id: number) {
    try {
      const res = await updateUserRequest(user, id);
      setUsers((prev) => prev.map((u) => (u.id === id ? res : u)));
      toast.success("Usuario actualizado exitosamente");
    } catch (error) {
      handleError(error, "actualizar");
      throw error;
    }
  }

  async function deleteUser(id: number) {
    try {
      await deleteUserRequest(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("Usuario eliminado exitosamente");
    } catch (error) {
      handleError(error, "eliminar");
      throw error;
    }
  }

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
