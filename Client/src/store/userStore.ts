import type { User } from "@/types/types";
import { create } from "zustand";

type UserState = {
  token: string | null;
  user: User | null;
  setUser: (token: string | null, user: User | null) => void;
  loading: boolean;
  loadRole: () => void;
};

export const userStore = create<UserState>((set) => ({
  token: null,
  user: null,
  setUser: (token, user) => {
    set({ token, user });

    localStorage.setItem("token", token || "");
    localStorage.setItem("user", JSON.stringify(user) || "");
  },
  loading: true,
  loadRole: async () => {
    const storedToken = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    const storedUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : JSON.parse(sessionStorage.getItem("user") || "");
    set({ token: storedToken, user: storedUser, loading: false });
  },
}));
