"use client";
import { UserType } from "@/app/users/page";
import axios from "axios";
export function PatchtData(
  apiEndPoint: string,
  values: UserType,
  token: string
) {
  return axios
    .patch(`https://nt.softly.uz/api/${apiEndPoint}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((e) => {
      console.log(e);
    });
}
