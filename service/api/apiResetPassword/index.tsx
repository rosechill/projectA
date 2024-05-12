"use server";

import satellite from "@/service/satellite";

const apiLogin = async (body: {
  token: string;
  email: string;
  password: string;
  confirm_password: string;
}) =>
  await satellite
    .post("http://127.0.0.1:8000/api/auth/resetPassword", body)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });

export default apiLogin;
