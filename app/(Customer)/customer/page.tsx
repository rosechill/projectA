"use client"

import { FotoProfile } from "@/assets/images";
import { DataUser } from "@/interfaces/UserInterface";
import { apiGetUserProfile } from "@/service/api/apiUser";
import Image from "next/image";
import React, { useState, useEffect }from "react";

export default function mstCustomer() {
  const [user, setUser] = useState<DataUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetUserProfile();
        console.log(response.data.data);
        setUser(response.data.data);
        console.log(user);
      } catch (error) {
        // console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-auto p-4 ">
      <div className="flex justify-between gap-4">
        <div className="p-4 w-1/3 shadow-xl bg-gray-100">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="rounded-full border w-24 border-[#B02525]">
              <Image src={FotoProfile} alt="profile" className="" width={100} height={100} />
            </div>
            <p className="text-xl font-semibold">
              {user?.name}
            </p>
            <div className="px-3 py-2 bg-blue-300 rounded-lg border-gray-100">
              {user?.email}
            </div>
          </div>
        </div>
        <div className="w-3/5">asd</div>
      </div>
    </div>
  );
}
