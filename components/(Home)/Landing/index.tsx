import { Hero } from "@/assets/images";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Landing() {
  return (
    <section className="grid grid-cols-2">
      <div className="flex flex-col gap-4 justify-center ps-24 h-[70vh] tracking-wider">
        <div className="flex flex-col gap-4">
          <h1 className="flex gap-4">
            <span className="text-5xl text-[#B02525] font-semibold">
              Temukan 
            </span>{" "}
            <span className="text-5xl text-[#1E5494] font-semibold">
             Kebahagiaan
            </span>
          </h1>
          <h1 className="text-5xl">Dalam Setiap Sajian</h1>
        </div>
        <div className="text-xl">
          <h2>Atma Kitchen Menghadirkan Dessert Unik dengan</h2>
          <h2>Sentuhan Personal yang Menggugah Selera</h2>
        </div>
        <Link href={"/produk"} className="">
          <Button className="bg-[#B02525] w-[120px] text-white">Belanja</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Image src={Hero} alt="hero" width={500} height={500}/>
      </div>
    </section>
  );
}
