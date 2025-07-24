import { create } from "zustand";

type UserState = {
  subs: string | null;
  userId: string | null;
  setUser: (
    subs: string | null,
    userId: string | null,
    rememberMe: boolean
  ) => void;
  loading: boolean;
  loadRole: () => void;
};

export const userStore = create<UserState>((set) => ({
  subs: null,
  userId: null,
  setUser: (subs, userId, rememberMe) => {
    set({ subs, userId });

    // Simpan role sesuai rememberMe
    localStorage.setItem("subs", subs || "");
    localStorage.setItem("userId", userId || "");
  },
  loading: true,
  loadRole: async () => {
    const storedSubs = localStorage.getItem("subs")
      ? localStorage.getItem("subs")
      : sessionStorage.getItem("subs");
    const storedUserId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : sessionStorage.getItem("userId");
    set({ subs: storedSubs, userId: storedUserId, loading: false });
  },
}));
