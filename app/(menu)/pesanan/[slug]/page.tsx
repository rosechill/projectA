"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import { IconMinus, IconPlus } from "@/assets/images";
import PemesananForm from "@/components/PemesananForm";
import { formatCurrency } from "@/utils/constant";

export default function Pesanan() {
  const pathname = usePathname();
  const productPath = decodeURIComponent(pathname.split("/")[2]).replace(
    /%20/g,
    " "
  );

  const currentProduct = dataKategori.find((product) =>
    product.products.find((item) => item.name === productPath)
  );

  const productDetail = currentProduct
    ? currentProduct.products.find((product) => product.name === productPath)
    : null;

  const [count, setCount] = useState(1);

  const handleMinus = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handlePlus = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <section className="flex flex-col gap-8 ">
      <div className="px-24 py-12">
        {productDetail && (
          <div className="flex gap-32 ">
            <PemesananForm
              productName={productDetail.name}
            />
            <div className="flex flex-col justify-center items-end w-2/4">
              <div className="bg-[#FFFAF1] w-fit px-6 py-12 flex flex-col gap-4 rounded-xl">
                <Image src={productDetail.imgPath} alt={productDetail.name} />
                <h2 className="text-2xl font-semibold mb-2">
                  {productDetail.name}
                </h2>
                <h2 className="text-2xl text-[#B02525] font-semibold mb-2">
                  {formatCurrency(productDetail.price)}
                </h2>
                <div className="flex items-center gap-6">
                  <button onClick={handleMinus}>
                    <Image src={IconMinus} alt="minus" width={35} />
                  </button>
                  <p className="text-xl w-[10px]">{count}</p>
                  <button onClick={handlePlus}>
                    <Image src={IconPlus} alt="minus" width={35} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

