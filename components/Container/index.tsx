"use client";
import { usePathname } from "next/navigation";
import ContainerProvider from "../ContainerProvider";
import Navigation from "../Navigation";
import Footer from "../Footer";
import MenuAdmin from "../(table)/MenuAdmin";
import Header from "../(table)/Header";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname !== "/login" && pathname !== "/daftar") {
    if (pathname === "/admin") {
      return (
        <div className="overflow-x-hidden">
          <ContainerProvider>
            <div className="flex">
              <MenuAdmin role="1" />
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
