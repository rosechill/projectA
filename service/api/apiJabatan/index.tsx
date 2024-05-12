"use server";

import { DataJabatan, DataJabatanForm } from "@/interfaces/JabatanInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let jabatanAccountPromise: Promise<any> | null = null;

const apiGetJabatan = () => {
  if (jabatanAccountPromise) {
    return jabatanAccountPromise;
  }

  jabatanAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/jabatan/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataJabatan }) => {
        const storageData = response.data;
        console.log(storageData);
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => {
        jabatanAccountPromise = null;
      });
  });

  return jabatanAccountPromise;
};

export default apiGetJabatan;

export const apiCreateJabatan = async (body: DataJabatanForm) => {
  await satellite
    .post(`http://127.0.0.1:8000/api/jabatan/store`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiCreateJabatan;
};

export const apiEditJabatan = async (body: { id?: number; name: string }) => {
  try {
    await satellite.post(
      `http://127.0.0.1:8000/api/jabatan/update/${body.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      }
    );
    return "success";
  } catch (err: any) {
    console.log(err);
    throw err.response.data;
  }
};

export const apiDeleteJabatan = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/jabatan/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
      data: {
        id: id,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeleteJabatan;
};
