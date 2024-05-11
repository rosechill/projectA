"use server";

import { DataBahanBaku, DataBahanBakuForm } from "@/interfaces/BahanBakuInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
import axios, { Axios } from "axios";

let bahanBakuPromise: Promise<any> | null = null;

const apiGetBahanBaku = () => {
  if (bahanBakuPromise) {
    return bahanBakuPromise;
  }
  bahanBakuPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/bahan-baku/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataBahanBaku }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        bahanBakuPromise = null;
      });
  });

  return bahanBakuPromise;
};

export default apiGetBahanBaku;

export const apiCreateBahanBaku = async (form: any) => {
 try {
    const response = await axios.post(
      `https://jurwawe.sga.dom.my.id/api/bahan-baku/store`,
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

export const apiEditBahanBaku = async (
  id: number,
  body: { form:any }
) => {
  try {
    await satellite.post(
      `https://jurwawe.sga.dom.my.id/api/bahan-baku/update/${id}`,
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

export const apiDeleteBahanBaku = async (id: number) => {
  await satellite
    .delete(`https://jurwawe.sga.dom.my.id/api/bahan-baku/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeleteBahanBaku;
};
