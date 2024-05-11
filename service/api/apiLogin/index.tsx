"use server";

import { DataUbahPassword } from "@/components/UbahPasswordBiasaForm";
import satellite from "@/service/satellite";
import { create, read } from "@/store/cookies";

const apiLogin = async (body: { email: string; password: string }) =>
  await satellite
    .post("https://jurwawe.sga.dom.my.id/api/auth/login", body, {})
    .then((response) => {
      create("__TOKEN__", response.data.data.token);
      create("__ROLE__", response.data.data.role);
      const storageData = response.data;
      delete storageData.tokenSession;
      return { status: "status", data: storageData };
    })
    .catch((error) => {
      throw error.response.data;
    });

export default apiLogin;

