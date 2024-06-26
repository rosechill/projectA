import { formatCurrency } from "@/utils/constant";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OthersProduct() {
  const cakeCategory = dataKategori.find(
    (category) => category.category === "Preorder"
  );
  return (
    <div className="pt-12">
      <h2 className="text-2xl font-semibold">Produk Lainnya</h2>
      <div className="grid grid-cols-4 gap-8">
        {cakeCategory &&
          cakeCategory.products.map((product, index) => (
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
              <p className="font-medium text-[#B02525] mt-1">{formatCurrency(product.price) }</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
