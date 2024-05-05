"use client";
import { useState } from "react";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatCurrency } from "@/utils/constant";

export default function BodyProduk() {
  const productsPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = dataKategori
    .flatMap((category) => category.products)
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    dataKategori.flatMap((category) => category.products).length /
      productsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="px-24 py-12 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Product</h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-8">
        {currentProducts.map((product, index) => (
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
            <p className="font-medium text-[#B02525] mt-1">{formatCurrency(product.price)}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-[#B02525] text-white"
                : "bg-white border-2 border-[#B02525] text-[#B02525]"
            } rounded-md mr-2`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
