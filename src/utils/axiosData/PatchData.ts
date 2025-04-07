"use client";
import { message } from "antd";
import { api } from "../api";

export function PatchtData(
  apiEndPoint: any,
  values: any,
  token: string,
  fetchData: () => void
) {
  return api
    .patch(`${apiEndPoint}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      message.success("Kategoriya muvaffaqiyatli o'zgartirildi!");
      console.log(res);
      fetchData();
    })
    .catch((error) => {
      if (error.response) {
        console.error("Server xatosi:", error.response.data);
      } else {
        console.error("Xatolik:", error.message);
      }
    });
}
