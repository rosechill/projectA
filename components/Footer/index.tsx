import { AtmaKitchen } from "@/assets/images";
import { dataFooter } from "@/utils/dataFooter";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <section className="flex flex-col">
      <div className="flex">
        <div className="bg-[#F8F4EC] w-2/4 h-[300px] py-4 px-24 flex flex-col gap-8 justify-center">
          <Image src={AtmaKitchen} alt="logo" width={250} height={250} />
          <h2 className="text-[#1E5494]">
            Pesan kue jadi lebih murah dan mudah
          </h2>
          <div className="text-[#1E5494] flex gap-4 items-center">
            <h2 className="font-semibold">Follow Us</h2>
            {dataFooter.map((item, index) => (
              <Link key={index} href={item.path}>
                <Image src={item.image} alt={`icon-${index}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-[#EAEAEA] w-3/4 h-[300px] py-4 px-24 flex gap-8 justify-between items-center">
          <div className="flex flex-col gap-2 text-[#1E5494] h-[100px]">
            <h2 className="font-semibold">Tentang</h2>
            <p>Produk</p>
            <p>Blog</p>
          </div>
          <div className="flex flex-col gap-2 text-[#1E5494] h-[100px]">
            <h2 className="font-semibold">Tentang</h2>
            <p>Ringkasan</p>
            <p>Fitur</p>
          </div>
          <div className="flex flex-col gap-2 text-[#1E5494] h-[100px]">
            <h2 className="font-semibold">Bantuan</h2>
            <p>Syarat dan Ketentuan</p>
            <p>Kebijakan Privasi</p>
            <p>Kontak</p>
          </div>
        </div>
      </div>
      <div className="h-[60px] w-full bg-[#1E5494] px-24 flex items-center justify-center text-white">
        Copyright @2024  Atma Kitchen All Rights Reserved
      </div>
    </section>
  );
}
