"use server";

import { DataUbahPassword } from "@/components/UbahPasswordBiasaForm";
import satellite from "@/service/satellite";
import { create, read } from "@/store/cookies";

const apiLogin = async (body: { email: string; password: string }) =>
  await satellite
    .post("http://127.0.0.1:8000/api/auth/login", body, {})
    .then((response) => {
      create("__TOKEN__", response.data.data.token);
      create("__ROLE__", response.data.data.role);
      create("__USERID__", response.data.data.id);
      const storageData = response.data;
      delete storageData.tokenSession;
      return { status: "status", data: storageData };
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });

export default apiLogin;
