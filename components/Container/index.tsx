"use client";
import { usePathname } from "next/navigation";
import ContainerProvider from "../ContainerProvider";
import Navigation from "../Navigation";
import Footer from "../Footer";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname !== "/login" && pathname !== "/daftar") {
    return (
      <div className="overflow-x-hidden">
        <ContainerProvider>
          <Navigation />
          <div className="pt-[10vh]">{children}</div>
          <Footer/>
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
