"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { dataMenu } from "@/utils/dataMenu";
import Image from "next/image";
import { Button, Navbar } from "@nextui-org/react";
import { AtmaKitchen, BgProfile, FotoProfile } from "@/assets/images";
import ListMenu from "../ListMenu";
import NavigationProfile from "../NavigationProfile";

export default function Navigation({ role }: { readonly role: string }) {
  const pathName = usePathname();

  return (
    <Navbar
      shouldHideOnScroll
      className="bg-white lg:w-full fixed top-0 z-50 h-[10vh] shadow-lg "
    >
      {/* lg navbar */}
      <div className="flex w-full justify-between items-center max-desktop:hidden h-80px px-16">
        <Link href={"/"} className="w-[250px]">
          <Image
            className=""
            src={AtmaKitchen}
            alt="logo"
            width={200}
            height={180}
          />
        </Link>
        <ul className="flex">
          {dataMenu.map((item, index) => (
            <ListMenu
              key={index}
              index={index}
              item={item}
              pathName={pathName}
            />
          ))}
        </ul>
        {role !== "customer" && (
          <div className="flex gap-4 ">
            <Link href={"/login"} className="">
              <Button className="bg-white border-2 border-[#B02525] w-[120px] text-[#1E5494]">
                Masuk
              </Button>
            </Link>
            <Link href={"/daftar"} className="">
              <Button className="bg-white border-2 border-[#1E5494] w-[120px] text-[#B02525]">
                Daftar
              </Button>
            </Link>
          </div>
        )}
        {role === "customer" && (
          <div className="flex items-center gap-4 ">
            <NavigationProfile />
          </div>
        )}
      </div>
    </Navbar>
  );
}
