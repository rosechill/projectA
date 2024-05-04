import { AtmaKitchen, PeopleRegister } from "@/assets/images";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Daftar",
};

export default function Daftar() {
  return (
    <section className="grid grid-cols-2 h-screen relative">
      <div className="bg-white flex flex-col gap-8 justify-center mx-32 ">
        <Image
          src={AtmaKitchen}
          alt="AtmaKitchen"
          width={250}
          height={200}
          className="absolute top-10 left-10"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Selamat Datang!</h2>
          <h2>Ayo jelajahi kue terenak</h2>
          <RegisterForm />
          <h1 className="pb-4 w-3/4 text-center">Sudah punya akun? <Link href="/login" className="font-semibold">Masuk</Link></h1>
        </div>
      </div>
      <div className="bg-[#F7EFDF] flex justify-center px-16 py-32 relative">
        <div className="bg-[#1E5494] w-full h-full rounded-3xl flex flex-col justify-end items-center relative">
          <div className="absolute top-0 left-10 flex flex-col gap-4 pt-12">
            <h2 className="text-white text-5xl font-medium">Yuk reservasi</h2>
            <h2 className="text-white text-5xl font-medium">sekarang!</h2>
          </div>
          <Image src={PeopleRegister} alt="PeopleLogin" width={400} height={400} />
        </div>
      </div>
    </section>
  );
}
