"use client";
import useAuthStore from "@/store/MyAuthState";
import { useEffect, useState } from "react";
import { api } from "../api";

export function useFetchData<T>(apiEndPoint: string) {
  const MyAuthState = useAuthStore();
  const [data, setData] = useState<T | null>(null);
  const fetchData = async () => {
    try {
      const res = await api.get(`https://nt.softly.uz/api${apiEndPoint}`, {
        headers: { Authorization: `Bearer ${MyAuthState.token}` },
      });
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData };
}
