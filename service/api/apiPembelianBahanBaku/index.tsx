"use server";

import {
  DataPembelianBahanBaku,
  DataPembelianBahanBakuForm,
} from "@/interfaces/PembelianBahanBaku";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let pembelianBahanBakuAccountPromise: Promise<any> | null = null;

const apiGetPembelianBahanBaku = () => {
    if (pembelianBahanBakuAccountPromise) {
      return pembelianBahanBakuAccountPromise;
    }
  
    pembelianBahanBakuAccountPromise = new Promise((resolve, reject) => {
      satellite
        .get(`http://127.0.0.1:8000/api/pembelian-bahan-baku/index`, {
          headers: {
            Authorization: `Bearer ${read("__TOKEN__")}`,
          },
        })
        .then((response: { data: DataPembelianBahanBaku }) => {
          const storageData = response.data;
          resolve({ status: "success", data: storageData });
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          pembelianBahanBakuAccountPromise = null;
        });
    });
  
    return pembelianBahanBakuAccountPromise;
  };

export default apiGetPembelianBahanBaku;

export const apiCreatePembelianBahanBaku = async (
  body: DataPembelianBahanBakuForm
) => {
  await satellite
    .post(
      `http://127.0.0.1:8000/api/pembelian-bahan-baku/store`,
      body,
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
  return apiCreatePembelianBahanBaku;
};

export const apiDeletePembelianBahanBaku = async (id: number) => {
  await satellite
    .delete(
      `http://127.0.0.1:8000/api/pembelian-bahan-baku/destroy/${id}`,
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
  return apiDeletePembelianBahanBaku;
};

export const apiEditPembelianBahanBaku = async (
  id: number,
  body: { total_harga: number; jumlah: number; bahan_baku_id: number}
) => {
  try {
    await satellite.post(
      `http://127.0.0.1:8000/api/pembelian-bahan-baku/update/${id}`,
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
