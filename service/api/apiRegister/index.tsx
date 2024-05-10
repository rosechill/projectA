"use server";

import satellite from "@/service/satellite";

const apiRegister = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await satellite.post(
      "http://127.0.0.1:8000/api/auth/register",
      body,
      {
        headers: {},
      }
    );
    console.log(response.data.message);
    return response.data.message;
  } catch (error: any) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw "An error occurred during registration.";
    }
  }
};
export default apiRegister;
