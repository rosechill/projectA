import { AtmaKitchen, PeopleLogin } from "@/assets/images";
import LupaPasswordForm from "@/components/LupaPasswordForm";
import Image from "next/image";

export const metadata = {
  title: "Lupa Password",
};

export default function LupaPassword() {
  return (
    <section className="grid grid-cols-2 h-screen relative">
      <div className="bg-[#F7EFDF] flex justify-center px-16 py-32 ">
        <div className="bg-[#1E5494] w-full h-full rounded-3xl flex flex-col justify-end items-center relative overflow-hidden">
          <div className="absolute top-0 left-10 flex flex-col gap-4 pt-12">
            <h2 className="text-white text-5xl font-medium">
              Kamu ingin kenikmatan?
            </h2>
          </div>
          <Image
            src={PeopleLogin}
            alt="PeopleLogin"
            width={400}
            height={400}
            className="z-10"
          />
          <div className="w-[400px] h-[300px] rounded-full bg-[#B02525] absolute -bottom-28"></div>
        </div>
      </div>
      <div className="bg-white flex flex-col gap-8 justify-center mx-32 ">
        <Image
          src={AtmaKitchen}
          alt="AtmaKitchen"
          width={250}
          height={200}
          className="absolute top-10 left-10"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Lupa Password?</h2>
          <h2>
            Mohon isi dengan email Anda!, kami akan mengirimkan email untuk
            mereset password jika email Anda benar
          </h2>
          <LupaPasswordForm />
        </div>
      </div>
    </section>
  );
}
