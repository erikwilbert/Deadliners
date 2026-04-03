import { User, UserUpdate } from "@/types/user";

// GET ALL
export const getUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users");

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// GET BY ID
export const getUserById = async (id: string): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

// UPDATE
export const updateUser = async (id: string, data: UserUpdate) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as
      | { message?: string; error?: string }
      | null;

    throw new Error(
      payload?.message || payload?.error || "Failed to update user",
    );
  }

  return res.json();
};

// DELETE
export const deleteUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");
};
