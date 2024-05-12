"use server";

import { DataAlamat, DataAlamatForm } from "@/interfaces/AlamatInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let alamatAccountPromise: Promise<any> | null = null;

const apiGetAlamat = () => {
  if (alamatAccountPromise) {
    return alamatAccountPromise;
  }

  alamatAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/alamat/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataAlamat }) => {
        const storageData = response.data;
        console.log(storageData);
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => {
        alamatAccountPromise = null;
      });
  });

  return alamatAccountPromise;
};

export default apiGetAlamat;

export const apiCreateAlamat = async (body: DataAlamatForm) => {
  await satellite
    .post(`http://127.0.0.1:8000/api/alamat/store`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiCreateAlamat;
};

export const apiEditAlamat = async (body: { id?: number; alamat: string }) => {
  try {
    await satellite.put(
      `http://127.0.0.1:8000/api/alamat/update/${body.id}`,
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

export const apiDeleteAlamat = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/alamat/destroy/${id}`, {
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
  return apiDeleteAlamat;
};
