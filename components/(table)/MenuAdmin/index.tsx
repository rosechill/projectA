"use client";

import {
  dataMenu,
  dataMenuAdmin,
  dataMenuCustomer,
  dataMenuMO,
  dataMenuOwner,
} from "@/utils/dataMenu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ListMenu from "../../ListMenu";
import { IconClose, IconHamburger } from "@/assets/icons";
import { AtmaKitchen } from "@/assets/images";
import { Button } from "@nextui-org/react";

export default function MenuAdmin({ role }: { readonly role: string }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1300) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pathName === "/login") {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    document.cookie =
      "__TOKEN__=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "__ROLE__=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  // const menuHeader = role === 'admin' ? dataMenuAdmin : dataMenuMO
  const menuHeader = () => {
    if (role === "admin") {
      return dataMenuAdmin;
    } else if (role === "mo") {
      return dataMenuMO;
    } else if (role === "owner") {
      return dataMenuOwner;
    } else return dataMenuCustomer;
  };
  return (
    <div
      className={`flex flex-col sticky top-0 bg-[#dcd9d9] will-change-transform h-screen  ${
        isOpen ? "open-animation" : "close-animation"
      }`}
    >
      <div className="">
        {isOpen && (
          <>
            <div className="w-[300px] min-w-[300px]  will-change-transform flex flex-col justify-between h-full ">
              <div className="">
                <div className="flex justify-center items-center h-[10vh] ">
                  <Image src={AtmaKitchen} alt="logo" width={200} height={50} />
                </div>
                <ul className="px-6 items-center flex-col">
                  {menuHeader().map((item, index) => (
                    <ListMenu
                      key={index}
                      item={item}
                      index={index}
                      pathName={pathName}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-12 w-full flex items-end h-full">
              <Button
                onClick={handleLogout}
                color="danger"
                size="lg"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
      <button onClick={toggleMenu} className="absolute top-8 -right-9 z-10 text-white">
        {isOpen ? <IconClose  /> : <IconHamburger />}
      </button>
    </div>
  );
}
