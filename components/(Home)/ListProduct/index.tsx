import { IconChevronRight } from "@/assets/images";
import { formatCurrency } from "@/utils/constant";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ListProduct() {
  const cakeCategory = dataKategori.find(
    (category) => category.category === "Cake"
  );

  const minumanCategory = dataKategori.find(
    (category) => category.category === "Roti"
  );

  const combinedProducts = [
    ...(cakeCategory?.products || []),
    ...(minumanCategory?.products || []),
  ];

  return (
    <section className="px-24 py-12 flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Product</h2>
        <Link href={"/produk"}>
          <Image src={IconChevronRight} alt="hero" width={35} height={25} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {combinedProducts.map((product, index) => (
          <Link href={`/produk/${decodeURIComponent(product.name)}`} key={index} className="flex flex-col shadow-xl p-6 rounded-xl hover:bg-[#B02525]/10">
            <Image
              src={product.imgPath}
              alt={product.name}
              width={400}
              height={400}
            />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="font-medium text-[#B02525] mt-1">{formatCurrency(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
