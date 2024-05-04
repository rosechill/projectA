import { ProdukBg } from "@/assets/images";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LandingProduk() {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <Image src={ProdukBg} alt="bg" className="w-full h-[400px]" />
      <div className="absolute w-full flex flex-col gap-8">
        <div className="text-white text-3xl text-center font-semibold">
          <h1>Coba Kue Terenak</h1>
          <h1>dan Termurah Kami</h1>
        </div>
        <div className="flex justify-center gap-8">
          {dataKategori.map((item, index) => (
            <Link
              key={index}
              href={`/kategori/${encodeURIComponent(item.category)}`}
              className="flex flex-col gap-2 justify-center items-center text-center p-4 rounded-[50px] bg-white h-[200px] w-[150px] border-3 hover:border-[#B02525] hover:text-[#B02525]"
            >
              <Image src={item.image} alt={`icon-${index}`} />
              <h2 className="font-semibold text-[#1E5494]">{item.category}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
