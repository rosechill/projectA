"use server";

import { DataUser } from "@/interfaces/UserInterface";
import satellite from "@/service/satellite";
import { read } from "@/store/cookies";

let userAccountPromise: Promise<any> | null = null;

const apiGetUser = () => {
  if (userAccountPromise) {
    return userAccountPromise;
  }

  userAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/admin/indexCustomer`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response: { data: DataUser }) => {
        const storageData = response.data;
        console.log(storageData);
        resolve({ status: "success", data: storageData });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => {
        userAccountPromise = null;
      });
  });

  return userAccountPromise;
};

export default apiGetUser;

export const apiGetHistoryPesanan = ({ id }: { id: number | undefined }) => {
  if (userAccountPromise) {
    return userAccountPromise;
  }

  userAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`https://jurwawe.sga.dom.my.id/api/user/historyPesanan/${id}`, {
        headers: {
          Authorization: `Bearer ${read("__TOKEN__")}`,
        },
      })
      .then((response) => {
        const storageData = response.data.data;
        console.log(storageData);
        resolve(storageData);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => {
        userAccountPromise = null;
      });
  });

  return userAccountPromise;
};
