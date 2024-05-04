"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import { formatCurrency } from "@/utils/constant";
import Link from "next/link";

export default function Kategori() {
  const pathname = usePathname();
  const categoryPath = pathname.split("/")[2];

  const currentCategory = dataKategori.find(
    (category) => category.category === categoryPath
  );

  return (
    <section className="flex flex-col gap-8 mb-12">
      <div className="relative flex flex-col justify-center items-center">
        {currentCategory && (
          <Image
            src={currentCategory.bgPath}
            alt={currentCategory.category}
            className="w-full h-[400px]"
          />
        )}
        <h1 className="text-center text-4xl font-semibold text-white absolute ">{categoryPath}</h1>
      </div>
      <div className="px-24 pb-12">
        {currentCategory && (
          <div className="grid grid-cols-4 gap-8">
            {currentCategory.products.map((product, index) => (
              <Link 
                href={`/produk/${decodeURIComponent(product.name)}`}
                key={index}
                className="flex flex-col shadow-xl p-6 rounded-xl hover:bg-[#B02525]/10"
              >
                <Image
                  src={product.imgPath}
                  alt={product.name}
                  width={400}
                  height={400}
                />
                <h3 className="font-semibold mt-2">{product.name}</h3>
                <p className="font-medium text-[#B02525] mt-1">
                  {formatCurrency(product.price) }
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
