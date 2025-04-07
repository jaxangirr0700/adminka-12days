"use client";
import useAuthStore from "@/store/MyAuthState";
import { useEffect, useState } from "react";
import { api } from "../api";

export function useFetchData<T>(apiEndPoint: string) {
  const MyAuthState = useAuthStore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = async () => {
    try {
      const res = await api.get(`${apiEndPoint}`, {
        headers: { Authorization: `Bearer ${MyAuthState.token}` },
      });
      setData(res.data);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("Noma'lum xatolik yuz berdi"));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, loading, error };
}
