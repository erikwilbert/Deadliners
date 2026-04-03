"use client";

import { useEffect, useState } from "react";

import { getUsers, updateUser } from "@/services/userServices";
import type { User, UserUpdate } from "@/types/user";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const data = await getUsers();
      setUsers(data);
      return data;
    } catch (err) {
      console.error("Fetch users error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (id: string, data: UserUpdate) => {
    await updateUser(id, data);
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers().catch(() => undefined);
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    editUser,
  };
}
