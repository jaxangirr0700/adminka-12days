import { message } from "antd";
import axios from "axios";
import { useState } from "react";

export const useDeleteData = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteData = async (apiEndPoint: string, token: string) => {
    setLoading(true);
    try {
      await axios.delete(`https://nt.softly.uz/api/${apiEndPoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Kategoriya muvaffaqiyatli o'chirildi!");
    } catch (error: any) {
      console.error(error);
      message.error(error.response?.data?.message || "Xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading };
};
