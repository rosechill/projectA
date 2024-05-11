"use client";

import { FotoProfile } from "@/assets/images";
import { DataUser } from "@/interfaces/UserInterface";
import apiGetUser, { apiGetUserProfile } from "@/service/api/apiUser";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const NavigationProfile = () => {
  const [user, setUser] = useState<DataUser | null>(null);

  const handleLogout = () => {
    document.cookie =
      "__TOKEN__=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "__ROLE__=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

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
    <div>
      {user && (
        <div className="flex gap-2 items-center">
          <Link href="/customer" >
            <div className="flex gap-2 items-center">
              <div className="rounded-full border border-[#B02525]">
                <Image src={FotoProfile} alt="profile" width={60} height={60} />
              </div>
            </div>
          </Link>
          <Button
            onClick={handleLogout}
            color="danger"
            size="lg"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavigationProfile;
