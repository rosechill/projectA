import { ProdukBg } from "@/assets/images";
import BodyProduk from "@/components/(Produk)/BodyProduk";
import LandingProduk from "@/components/(Produk)/LandingProduk";
import { dataKategori } from "@/utils/dataKategori";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Produk ",
};

export default function Produk() {
  return (
    <section>
      <LandingProduk/>
      <BodyProduk/>
    </section>
  );
}
