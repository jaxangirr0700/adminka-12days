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
  logout: () => void;
};

const useAuthStore = create<MyAuthStateType>((set) => {
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return { token: "", user: null, logout: () => {} };
    }

    const storedAuth = localStorage.getItem("auth");

    const ls = storedAuth ? JSON.parse(storedAuth) : undefined;
    console.log(ls);

    if (ls) {
      api.defaults.headers.Authorization = `Bearer ${ls.token}`;
    }

    return {
      token: ls?.accessToken || "",
      user: ls?.user || null,
      logout: () => {
        localStorage.removeItem("auth");
        set({ token: "", user: null });
      },
    };
  };

  return getInitialState();
});

export default useAuthStore;
