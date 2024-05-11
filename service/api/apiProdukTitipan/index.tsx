"use server";

import { DataProduk } from "@/interfaces/ProdukInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
import axios, { Axios } from "axios";

let produkTitipanPromise: Promise<any> | null = null;

const apiGetProdukTitipan = () => {
  if (produkTitipanPromise) {
    return produkTitipanPromise;
  }
  produkTitipanPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/produk-titipan/index`, {
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
        produkTitipanPromise = null;
      });
  });

  return produkTitipanPromise;
};

export default apiGetProdukTitipan;

export const apiGetProdukTitipanPenitip = () => {
  if (produkTitipanPromise) {
    return produkTitipanPromise;
  }
  produkTitipanPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/produk-titipan/index`, {
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
        produkTitipanPromise = null;
      });
  });

  return produkTitipanPromise;
};

export const apiCreateProdukTitipan = async (form: any) => {
 try {
    const response = await axios.post(
      `https://jurwawe.sga.dom.my.id/api/produk-titipan/store`,
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