"use server";

import { DataPenitip, DataPenitipForm } from "@/interfaces/PenitipInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
let penitipPromise: Promise<any> | null = null;

const apiGetPenitip = () => {
  if (penitipPromise) {
    return penitipPromise;
  }
  //   console.log(read('__TOKEN__'))
  penitipPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/penitip/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataPenitip }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        penitipPromise = null;
      });
  });

  return penitipPromise;
};

export default apiGetPenitip;

export const apiCreatePenitip = async (body: DataPenitipForm) => {
  await satellite
    .post(`http://127.0.0.1:8000/api/penitip/store`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiCreatePenitip;
};

export const apiDeletePenitip = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/penitip/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeletePenitip;
};

export const apiEditPenitip = async (id: number, body: { name: string }) => {
  try {
    await satellite.post(
      `http://127.0.0.1:8000/api/penitip/update/${id}`,
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
