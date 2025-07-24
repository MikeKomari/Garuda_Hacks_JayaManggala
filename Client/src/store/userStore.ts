// zustand store
import { create } from "zustand";

type RoleState = {
  role: string | null;
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
  role: null,
  roleId: null,
  setRole: (role, id, rememberMe) => {
    set({ role, roleId: id });

    // Simpan role sesuai rememberMe
    localStorage.setItem("role", role || "");
    localStorage.setItem("roleId", id || "");
  },
  loading: true,
  loadRole: async () => {
    const storedRole = localStorage.getItem("role")
      ? localStorage.getItem("role")
      : sessionStorage.getItem("role");
    const storedRoleId = localStorage.getItem("roleId")
      ? localStorage.getItem("roleId")
      : sessionStorage.getItem("roleId");
    set({ role: storedRole, roleId: storedRoleId, loading: false });
  },
}));
