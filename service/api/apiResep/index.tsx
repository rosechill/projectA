"use server";

import { DataResep } from "@/interfaces/ResepInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
import axios, { Axios } from "axios";

let resepPromise: Promise<any> | null = null;

const apiGetResep = () => {
  if (resepPromise) {
    return resepPromise;
  }
  resepPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/resep/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataResep }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        resepPromise = null;
      });
  });

  return resepPromise;
};

export default apiGetResep;

export const apiGetBahanBaku = () => {
  if (resepPromise) {
    return resepPromise;
  }
  resepPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/bahan-baku/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataResep }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        resepPromise = null;
      });
  });

  return resepPromise;
};

export const apiCreateResep = async (data: any) => {
 try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/resep/store`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    throw error.response.data;
  }
};

export const apiEditResep = async (
  id: number,
  body: { form:any }
) => {
  try {
    await satellite.post(
      `http://127.0.0.1:8000/api/resep/update/${id}`,
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

export const apiDeleteResep = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/resep/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeleteResep;
};
