"use server";

import { dataGaji, dataGajiForm } from "@/interfaces/GajiInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
let gajiPromise: Promise<any> | null = null;

const apiGetGaji = () => {
  if (gajiPromise) {
    return gajiPromise;
  }
  gajiPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/bonus-gaji/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: dataGaji }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        gajiPromise = null;
      });
  });

  return gajiPromise;
};

export default apiGetGaji;

export const apiGetJabatanGaji = () => {
  if (gajiPromise) {
    return gajiPromise;
  }
  gajiPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/jabatan/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: any }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        gajiPromise = null;
      });
  });

  return gajiPromise;
};

export const apiEditGaji = async (id: number, body:dataGajiForm) => {
  try {
    await satellite.post(
      `https://jurwawe.sga.dom.my.id/api/bonus-gaji/update/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      }
    );
    return "Success";
  } catch (error: any) {
    throw error.response.data;
  }
};
