"use client";

import { api } from "@/utils/api";
import { create } from "zustand";

type User = {
  email: string;
  id: number;
  name: string;
  role: string;
};

export type MyAuthStateType = {
  token: string;
  user: User | null;
  logout?: () => void;
};

const useAuthStore = create<MyAuthStateType>((set) => {
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return { token: "", user: null };
    }

    const storedAuth = localStorage.getItem("auth");

    if (!storedAuth) {
      return { token: "", user: null };
    }

    const ls = JSON.parse(storedAuth);
    api.defaults.headers.Authorization = `Bearer ${ls.token}`;

    return {
      token: ls.accessToken,
      user: ls.user,
      logout: () => {
        localStorage.removeItem("auth");
        set({ token: "", user: null });
      },
    };
  };

  return getInitialState();
});

export default useAuthStore;
