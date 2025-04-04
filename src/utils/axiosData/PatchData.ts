"use client";
import { message } from "antd";
import axios from "axios";

export function PatchtData(apiEndPoint: any, values: any, token: string) {
  return axios
    .patch(`https://nt.softly.uz/api/${apiEndPoint}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      message.success("Kategoriya muvaffaqiyatli o'zgartirildi!");
    })
    .catch((error) => {
      if (error.response) {
        console.error("Server xatosi:", error.response.data);
      } else {
        console.error("Xatolik:", error.message);
      }
    });
}
