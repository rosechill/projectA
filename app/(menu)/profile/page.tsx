import {
  BgProfile,
  Favimage1,
  Favimage2,
  Favimage3,
  Favimage4,
  FotoProfile,
  IconProfile,
} from "@/assets/images";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Profile | Atma Kitchen",
};

export default function Profile() {
  return (
    <section className="flex flex-col gap-4 pb-8">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={BgProfile}
          alt="profile"
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
          unoptimized
          quality={100}
          layout="intrinsic"
          className="w-full h-auto object-cover"
        />
        <div className="flex flex-col gap-4 text-center -mt-24">
          <Image src={FotoProfile} alt="profile" width={200} height={200} />
          <h2 className="text-3xl font-medium">John Doe</h2>
          <h2 className="text-[#B02525]">Pembeli</h2>
        </div>
      </div>
      <div className="mx-24 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Image src={IconProfile} alt="profile" width={40} height={40} />
          <h2 className="text-3xl font-medium">My Profile</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <h2 className="w-[80px] font-semibold">Name</h2>
              <h2>:</h2>
              <h2>John Doe</h2>
            </div>
            <div className="flex gap-4">
              <h2 className="w-[80px] font-semibold">Username</h2>
              <h2>:</h2>
              <h2>John Doe</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <h2 className="w-[150px] font-semibold">Business Name</h2>
              <h2>:</h2>
              <h2>PisangHuy</h2>
            </div>
            <div className="flex gap-4">
              <h2 className="w-[150px] font-semibold">Email</h2>
              <h2>:</h2>
              <h2>Johnxdue@gmail.com</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <h2 className="w-[80px] font-semibold">No Hp</h2>
              <h2>:</h2>
              <h2>082381941224</h2>
            </div>
            <div className="flex gap-4">
              <h2 className="w-[80px] font-semibold">Location</h2>
              <h2>:</h2>
              <h2>Malang, Jawa Timur</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-24 flex flex-col gap-4 mt-4">
        <div className="flex gap-4 items-center">
          <Image src={IconProfile} alt="profile" width={40} height={40} />
          <h2 className="text-3xl font-medium">Favorite</h2>
        </div>
        <div className="flex justify-between">
          <Image src={Favimage1} alt="profile" width={310} height={40} />
          <Image src={Favimage2} alt="profile" width={310} height={40} />
          <Image src={Favimage3} alt="profile" width={310} height={40} />
          <Image src={Favimage4} alt="profile" width={310} height={40} />
        </div>
      </div>
    </section>
  );
}
