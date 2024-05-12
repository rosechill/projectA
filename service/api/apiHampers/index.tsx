"use server";

import { DataHampers, DataHampersForm } from "@/interfaces/HampersInterfaces";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";
import axios, { Axios } from "axios";

let hampersPromise: Promise<any> | null = null;

const apiGetHampers = () => {
  if (hampersPromise) {
    return hampersPromise;
  }
  hampersPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/hampers/index`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataHampers }) => {
        const storageData = response.data;
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        hampersPromise = null;
      });
  });

  return hampersPromise;
};

export default apiGetHampers;

export const apiCreateHampers = async (form: any) => {
//   throw (form);
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/hampers/store`,
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

export const apiEditHampers = async (id: number, form: any) => {
  // throw body.form;
  try {
    await satellite.post(
      `http://127.0.0.1:8000/api/hampers/update/${id as number}`,
      form,
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

export const apiDeleteHampers = async (id: number) => {
  await satellite
    .delete(`http://127.0.0.1:8000/api/hampers/destroy/${id}`, {
      headers: {
        Authorization: `Bearer ${read("__TOKEN__")}`,
      },
    })
    .catch((err) => {
      throw err.response.data;
    })
    .then(() => {});
  return apiDeleteHampers;
};
