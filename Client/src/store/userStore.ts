// zustand store
import { create } from "zustand";

type RoleState = {
  roleId: string | null;
  setRole: (
    role: string | null,
    id: string | null,
    rememberMe: boolean
  ) => void;
  loading: boolean;
  loadRole: () => void;
};

export const roleStore = create<RoleState>((set) => ({
  roleId: null,
  setRole: (id, rememberMe) => {
    set({ roleId: id });

    // Simpan role sesuai rememberMe
    localStorage.setItem("roleId", id || "");
  },
  loading: true,
  loadRole: async () => {
    const storedRoleId = localStorage.getItem("roleId")
      ? localStorage.getItem("roleId")
      : sessionStorage.getItem("roleId");
    set({ roleId: storedRoleId, loading: false });
  },
}));
