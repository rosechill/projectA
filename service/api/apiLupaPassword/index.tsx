"use server";

import satellite from "@/service/satellite";

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
