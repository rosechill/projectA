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
      .get(`https://jurwawe.sga.dom.my.id/api/jabatan/index`, {
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
    .post(`https://jurwawe.sga.dom.my.id/api/jabatan/store`, body, {
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
  await satellite
    .put(`https://jurwawe.sga.dom.my.id/api/jabatan/update/${body.id}`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiEditJabatan;
};

export const apiDeleteJabatan = async (id: number) => {
  await satellite
    .delete(`https://jurwawe.sga.dom.my.id/api/jabatan/update/${id}`, {
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
