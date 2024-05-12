"use server";

import { DataKaryawan, DataKaryawanForm } from "@/interfaces/KaryawanInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let karyawanAccountPromise: Promise<any> | null = null;

const apiGetKaryawan = () => {
  if (karyawanAccountPromise) {
    return karyawanAccountPromise;
  }

  karyawanAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/karyawan/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataKaryawan }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        karyawanAccountPromise = null;
      });
  });

  return karyawanAccountPromise;
};

export default apiGetKaryawan;

export const apiCreateKaryawan = async (body: DataKaryawanForm) => {
  await satellite
    .post(`http://127.0.0.1:8000/api/karyawan/store`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiCreateKaryawan;
};

export const apiDeleteKaryawan = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/karyawan/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeleteKaryawan;
};

export const apiEditKaryawan = async (
  id: number,
  body: { name: string; jabatan_id: number }
) => {
  try {
    await satellite.put(
      `http://127.0.0.1:8000/api/karyawan/update/${id}`,
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
