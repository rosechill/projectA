import { AboutImage, AtmaKitchen } from "@/assets/images";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="px-24 py-12 flex flex-col gap-8 mb-12">
      <div className="bg-[#F8F4EC] flex gap-12 rounded-xl">
        <div className="w-2/4">
          <Image src={AboutImage} alt="hero" width={400} height={400} className="w-full max-h-[400px] object-cover rounded-tl-xl rounded-bl-xl" />
        </div>
        <div className="p-12 w-3/4 flex flex-col gap-6 justify-center text-[#1E5494]">
          <Image src={AtmaKitchen} alt="logo" width={250} height={250} />
          <h1 className="text-2xl font-semibold">Tentang Atma Kitchen</h1>
          <h2>
            Atma Kitchen adalah toko yang menyediakan roti, kue, manisan,
            minuman dan produk yang dititipkan oleh beberapa vendor. Menyediakan
            harga yang murah dan enak! cocok untuk kantorng mahasiswa{" "}
          </h2>
        </div>
      </div>
    </section>
  );
}
