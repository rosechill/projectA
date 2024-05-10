'use client'
import { usePathname } from "next/navigation";
import ContainerProvider from "../ContainerProvider";
import Navigation from "../Navigation";
import Footer from "../Footer";
import MenuAdmin from "../(table)/MenuAdmin";
import Header from "../(table)/Header";
import { dataMenuAdmin } from "@/utils/dataMenu";
import { read } from "@/store/cookies";

export default function Container({
  children, role
}: Readonly<{
  children: React.ReactNode; role: string
}>) {
  const pathname = usePathname();

  if (pathname !== "/login" && pathname !== "/daftar") {
    if (pathname === "/admin") {
      return (
        <div className="overflow-x-hidden">
          <ContainerProvider>
            <div className="flex">
              <MenuAdmin role={role} />
              <div className="flex-1">
                <Header />
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </ContainerProvider>
        </div>
      );
    }
    return (
      <div className="overflow-x-hidden">
        <ContainerProvider>
          <Navigation />
          <div className="pt-[10vh]">{children}</div>
          <Footer />
        </ContainerProvider>
      </div>
    );
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
