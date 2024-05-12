"use server";

import {
  DataPengeluaranLain,
  DataPengeluaranLainForm,
} from "@/interfaces/PengeluaranLainInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let pengeluaranLainAccountPromise: Promise<any> | null = null;

const apiGetPengeluaranLain = () => {
  if (pengeluaranLainAccountPromise) {
    return pengeluaranLainAccountPromise;
  }

  pengeluaranLainAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/pengeluaran-lainnya/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataPengeluaranLain }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        pengeluaranLainAccountPromise = null;
      });
  });

  return pengeluaranLainAccountPromise;
};

export default apiGetPengeluaranLain;

export const apiCreatePengeluaranLain = async (
  body: DataPengeluaranLainForm
) => {
  await satellite
    .post(`http://127.0.0.1:8000/api/pengeluaran-lainnya/store`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiCreatePengeluaranLain;
};

export const apiDeletePengeluaranLain = async (id: number) => {
  await satellite
    .delete(
      `http://127.0.0.1:8000/api/pengeluaran-lainnya/destroy/${id}`,
      {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      }
    )
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeletePengeluaranLain;
};

export const apiEditPengeluaranLain = async (
  id: number,
  body: { name: string; total_harga: number }
) => {
  try {
    await satellite.put(
      `http://127.0.0.1:8000/api/pengeluaran-lainnya/update/${id}`,
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
