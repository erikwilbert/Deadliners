"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  getUserById
} from "@/services/userServices";
import { User, UserUpdate } from "@/types/user";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // GET ALL
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const editUser = async (id: string, data: UserUpdate) => {
    try {
      await updateUser(id, data);
      await fetchUsers();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // GET BY ID
  const fetchUserById = async (id: string) => {
    setLoading(true);
    try {
      const data = await getUserById(id);
      setUsers([data]);
    } catch (err) {
      console.error("Fetch user error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    editUser,
    fetchUserById
  };
}