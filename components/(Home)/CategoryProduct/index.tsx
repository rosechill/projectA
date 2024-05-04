import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryProduct() {
  return (
    <section className="px-24 py-12 flex flex-col gap-8">
      <h1 className="text-center text-2xl font-semibold">Kategori Produk</h1>
      <div className="grid grid-cols-5 gap-4">
        {dataKategori.map((item, index) => (
          <Link key={index} href={`/kategori/${encodeURIComponent(item.category)}`} className="flex flex-col gap-2 justify-center items-center text-center p-2 rounded-xl hover:bg-[#B02525]/10">
            <Image src={item.image} alt={`icon-${index}`} />
            <h2 className="font-semibold">{item.category}</h2>
            <p>{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
