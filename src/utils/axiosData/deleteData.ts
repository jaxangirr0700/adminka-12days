import { message } from "antd";
import axios from "axios";

export const Deletedata = (apiEndPoint: string, token: string) => {
  return axios
    .delete(`https://nt.softly.uz/api/${apiEndPoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      message.success("Kategoriya muvaffaqiyatli o'chirildi!");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      message.error(error.response.data.message || "Xato yuz berdi");
    });
};
