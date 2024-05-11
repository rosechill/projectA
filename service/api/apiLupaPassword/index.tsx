"use server";

import { DataUbahPassword } from "@/components/UbahPasswordBiasaForm";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

const apiLogin = async (body: { email: string }) =>
  await satellite
    .post("https://jurwawe.sga.dom.my.id/api/auth/forgotPassword", body)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });

export default apiLogin;


export const apiUbahPasswordBiasa = async (body: DataUbahPassword) => {
  await satellite
    .put(`https://jurwawe.sga.dom.my.id/api/auth/changePassword`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiUbahPasswordBiasa;
};

// export const apiLogout = async () => {
//   await satellite
//     .get(`https://jurwawe.sga.dom.my.id/api/auth/logout`, {
//       headers: {
//         Authorization: `Bearer ${read("__TOKEN__")}`,
//       },
//     })
//     .then((response) => {
      
//     })
//     .catch((err) => {
//       throw err.response.data;
//     })
//     .then(() => {});
//   return apiLogout;
// }