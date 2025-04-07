"use client";
import { api } from "../api";
export function Postdata(apiEndPoint: string, values: any, token: string) {
  return api
    .post(`${apiEndPoint}`, values, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e.response.data);
    });
}
