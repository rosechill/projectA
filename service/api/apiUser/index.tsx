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
      .get(`http://127.0.0.1:8000/api/admin/indexCustomer`, {
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

export const apiGetHistoryPesanan = async ({
  id,
}: {
  id: number | null | string | undefined;
}) => {
  if (userAccountPromise) {
    return userAccountPromise;
  }

  if (id == null) {
    const getToken = await read("__USERID__");
    id = getToken;
  }

  userAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/user/historyPesanan/${id}`, {
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

export const apiGetUserProfile = () => {
  if (userAccountPromise) {
    return userAccountPromise;
  }

  userAccountPromise = new Promise((resolve, reject) => {
    satellite
      .get(`http://127.0.0.1:8000/api/user/profile/`, {
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


export const apiEditCustomerName = async ( form: FormData ) => {
  try {
    await satellite.put(
      `http://127.0.0.1:8000/api/user/update/`,
      {
        name: form.get("name"),
      },
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
