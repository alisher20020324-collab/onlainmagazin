import { create } from "zustand";

export const useStore = create((set) => ({
  isLogin: false,
  setIsLogin: (value) => set(() => ({ isLogin: value })),
  role: "user",
  setRole: (value) => set(() => ({ role: value })),
}));
