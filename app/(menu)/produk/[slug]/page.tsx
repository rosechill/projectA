"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { dataKategori } from "@/utils/dataKategori";
import { Button } from "@nextui-org/react";
import { ShoppingCart } from "@/assets/images";
import { formatCurrency } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import OthersProduct from "@/components/OthersProduct";

export default function DetailProduk() {
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
  return (
    <section className="flex flex-col gap-8 ">
      <div className="px-24 py-12">
        {productDetail && (
          <div className="grid grid-cols-2 gap-32">
            <div>
              <Image
                src={productDetail.imgPath}
                alt={productDetail.name}
                className="w-full h-[400px]"
              />
              <div className="grid grid-cols-4 pt-4 gap-4">
                <Image
                  src={productDetail.imgPath}
                  alt={productDetail.name}
                  className="rounded-xl"
                />
                <Image
                  src={productDetail.imgPath}
                  alt={productDetail.name}
                  className="rounded-xl"
                />
                <Image
                  src={productDetail.imgPath}
                  alt={productDetail.name}
                  className="rounded-xl"
                />
                <Image
                  src={productDetail.imgPath}
                  alt={productDetail.name}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <h2 className="text-4xl font-semibold mb-2">
                {productDetail.name}
              </h2>
              <div className="flex gap-2 items-end">
                <p className="text-4xl text-[#B02525] font-semibold ">
                  { formatCurrency(productDetail.price)}
                </p>
                <p className="text-[#B02525]">x20</p>
              </div>
              <div className="flex gap-2 items-end">
                <p className="text-4xl text-[#B02525] font-semibold ">
                  { formatCurrency(productDetail.price)}
                </p>
                <p className="text-[#B02525]">x10</p>
              </div>
              <p className="mb-4 ">{productDetail.detail}</p>
              <div className="grid grid-cols-2 gap-4">
                <Link href={`/pesanan/${decodeURIComponent(productDetail.name)}`} className="">
                  <Button className="bg-[#B02525] w-full text-white">
                    Beli
                  </Button>
                </Link>
                <Image src={ShoppingCart} alt="shopping-cart" width={45} />
              </div>
            </div>
          </div>
        )}
       <OthersProduct/>
      </div>
    </section>
  );
}
