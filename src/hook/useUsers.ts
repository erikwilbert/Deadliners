import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/userServices";
import { User, UserUpdate } from "@/types/user";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const addUser = async (data: User) => {
    await createUser(data);
    fetchUsers();
  };

  const editUser = async (id: string, data: UserUpdate) => {
    await updateUser(id, data);
    fetchUsers();
  };

  const removeUser = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    selectedUser,
    setSelectedUser,
    addUser,
    editUser,
    removeUser,
    fetchUsers,
  };
}