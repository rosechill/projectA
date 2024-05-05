import { OrderHero } from "@/assets/images";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DetailOrder() {
  return (
    <section className="px-24  py-12">
      <div className="flex gap-48 justify-center">
        <div className="py-12 flex flex-col  gap-4 rounded-xl ">
          <h2 className="text-2xl font-semibold w-fit">Order Summary</h2>
          <div className="flex">
            <p className="w-[200px]">Date</p>
            <p>22 April 2024</p>
          </div>
          <div className="flex">
            <p className="w-[200px]">Time</p>
            <p>07.58 PM</p>
          </div>
          <h2 className="text-xl font-semibold w-fit">Products</h2>
          <div className="flex">
            <p className="w-[200px]">Brownies</p>
            <p>1 Buah</p>
          </div>
          <div className="flex">
            <p className="w-[200px]">Kode</p>
            <p>12XYSIX293</p>
          </div>
          <h2 className="text-xl font-semibold w-fit">Detail Payment</h2>
          <div className="flex">
            <p className="w-[200px]">Subtotal</p>
            <p>Rp 40.000,00</p>
          </div>
          <div className="flex">
            <p className="w-[200px]">Biaya Ongkir</p>
            <p>Rp 40.000,00</p>
          </div>
          <div className="flex">
            <p className="w-[200px]">Total</p>
            <p>Rp 40.000,00</p>
          </div>

          <Link href={"/payment/detailOrder"} className="flex">
            <Button className="bg-[#B02525] text-white rounded-lg w-[120px] ">
              Selesai
            </Button>
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <div className="w-[500px] h-[500px] flex flex-col justify-center items-center rounded-full bg-[#1E549445]">
            <Image
              src={OrderHero}
              alt="hero"
              width={300}
              className="max-h-[300px]"
            />
            <h2 className="text-2xl font-semibold">Pesanan Sedang</h2>
            <h2 className="text-2xl font-semibold">Diproses</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
