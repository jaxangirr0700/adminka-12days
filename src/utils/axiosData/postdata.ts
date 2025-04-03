"use client";
import { UserType } from "@/app/users/page";
import axios from "axios";
export function Postdata(apiEndPoint: string, values: any, token: string) {
  return axios
    .post(`https://nt.softly.uz/api/${apiEndPoint}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((e) => {
      console.log(e.response.data);
    });
}
