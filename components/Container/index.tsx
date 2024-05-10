"use client";
import { usePathname } from "next/navigation";
import ContainerProvider from "../ContainerProvider";
import Navigation from "../Navigation";
import Footer from "../Footer";
import MenuAdmin from "../(table)/MenuAdmin";
import Header from "../(table)/Header";
import {
  dataMenuAdmin,
  dataMenuCustomer,
  dataMenuMO,
  dataMenuOwner,
} from "@/utils/dataMenu";
import { read } from "@/store/cookies";

export default function Container({
  children,
  role,
}: Readonly<{
  children: React.ReactNode;
  role: string;
}>) {
  const pathname = usePathname();

  if (pathname !== "/login" && pathname !== "/daftar") {
    let matchedMenu = null;

    if (dataMenuAdmin.some((menu) => menu.path === pathname)) {
      matchedMenu = "admin";
    } else if (dataMenuMO.some((menu) => menu.path === pathname)) {
      matchedMenu = "MO";
    } else if (dataMenuOwner.some((menu) => menu.path === pathname)) {
      matchedMenu = "owner";
    } else if (dataMenuCustomer.some((menu) => menu.path === pathname)) {
      matchedMenu = "customer";
    }

    if (matchedMenu) {
      return (
        <div className="overflow-x-hidden">
          <ContainerProvider>
            <div className="flex">
              {matchedMenu === "admin" && <MenuAdmin role={role} />}
              {matchedMenu === "MO" && <MenuAdmin role={role} />}
              {matchedMenu === "customer" && <MenuAdmin role={role} />}
              {matchedMenu === "owner" && <MenuAdmin role={role} />}
              <div className="flex-1">
                <Header role={role} />
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </ContainerProvider>
        </div>
      );
    } else {
      return (
        <div className="overflow-x-hidden">
          <ContainerProvider>
            <Navigation />
            <div className="pt-[10vh]">{children}</div>
            <Footer />
          </ContainerProvider>
        </div>
      );
    }
  } else {
    return (
      <div className="overflow-x-hidden">
        <ContainerProvider>
          <div className="">{children}</div>
        </ContainerProvider>
      </div>
    );
  }
}
