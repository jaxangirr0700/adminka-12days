"use client";
import { message } from "antd";
import axios from "axios";

export const handleDelete = (id: number, token: string) => {
  axios
    .delete(`https://nt.softly.uz/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      message.success("Mahsulot muvaffaqiyatli o'chirildi!");
      window.location.reload()
    })
    .catch((error) => {
      message.error(error.response.data.message || "Xato yuz berdi");
    });
};
