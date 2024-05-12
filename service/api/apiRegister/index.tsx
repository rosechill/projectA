import satellite from "@/service/satellite";
import ax from "axios";

const axios = ax.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
  // withCredentials: true,
  // withXSRFToken: true,
});

export const apiRegister = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  console.log(body);
  return axios.post("/auth/register", body);
};
