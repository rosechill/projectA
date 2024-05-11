"use server";

import { DataProduk, DataProdukForm } from "@/interfaces/ProdukInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
import axios, { Axios } from "axios";

let produkPromise: Promise<any> | null = null;

const apiGetProduk = () => {
  if (produkPromise) {
    return produkPromise;
  }
  produkPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/produk/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataProduk }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        produkPromise = null;
      });
  });

  return produkPromise;
};

export default apiGetProduk;

export const apiCreateProduk = async (form: any) => {
 try {
    const response = await axios.post(
      `https://jurwawe.sga.dom.my.id/api/produk/store`,
      form,
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

export const apiEditProduk = async (
  id: number,
  body: { form:any }
) => {
  try {
    await satellite.post(
      `https://jurwawe.sga.dom.my.id/api/produk/update/${id}`,
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

export const apiDeleteProduk = async (id: number) => {
  await satellite
    .delete(`https://jurwawe.sga.dom.my.id/api/produk/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeleteProduk;
};
