"use server";

import { DataPromo, DataPromoForm } from "@/interfaces/PromoInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let promoPromise: Promise<any> | null = null;

const apiGetPromo = () => {
  if (promoPromise) {
    return promoPromise;
  }
  //   console.log(read('__TOKEN__'))
  promoPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/promo-poin/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataPromo }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        promoPromise = null;
      });
  });

  return promoPromise;
};

export default apiGetPromo;

export const apiCreatePromo = async (body: DataPromoForm) => {
  await satellite
    .post(`http://127.0.0.1:8000/api/promo-poin/store`, body, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiCreatePromo;
};

export const apiDeletePromo = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/promo-poin/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeletePromo;
};

export const apiEditPromo = async (
  id: number,
  body: { kelipatan: number; bonus_poin: number }
) => {
  try {
    await satellite.put(
      `http://127.0.0.1:8000/api/promo-poin/update/${id}`,
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
