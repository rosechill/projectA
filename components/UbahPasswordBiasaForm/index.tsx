"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { apiUbahPasswordBiasa } from "@/service/api/apiLupaPassword";
import { setItem } from "@/store/storage";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconFilledEye, IconFilledEyeSlash } from "@/assets/icons";

const schema = yup.object({
  old_password: yup.string().required("Email harus diisi"),
  password: yup.string().required("Email harus diisi"),
  confirm_password: yup.string().required("Email harus diisi"),
});

export interface DataUbahPassword {
  old_password: string;
  password: string;
  confirm_password: string;
}

export default function UbahPasswordBiasa() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<DataUbahPassword>({
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataUbahPassword) => {
    console.log(data);
    const res = apiUbahPasswordBiasa(data);
    res
      .then((res) => {
        toast.success(
          "Berhasil Ubah Password, Sebentar lagi anda akan di aarahkan ke halaman login "
        );
        setTimeout(() => {
          document.cookie =
            "__TOKEN__=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "__ROLE__=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/login";
          router.push("/login");
        }, 5000);
      })
      .catch((res) => {
        console.log(res);
        toast.error("Terjadi Kesalahan");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitted)}
      className="w-full flex flex-col justify-center  gap-8 pt-4 "
    >
      <ToastContainer />
      <div className="relative flex justify-center">
        <Input
          {...register("old_password")}
          size="lg"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your password"
          className="w-2/4"
          endContent={
            <button
              className="focus:outline-none pb-2"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconFilledEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IconFilledEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Masukkan password lama"
          type={isVisible ? "text" : "password"}
        />
        <p className="ms-3 text-sm pt-2 text-red-500 min-h-[20px] absolute ">
          {errors.old_password?.message}
        </p>
      </div>
      <div className="relative flex justify-center">
        <Input
          {...register("password")}
          size="lg"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Masukkan Password Baru"
          className="w-2/4"
          endContent={
            <button
              className="focus:outline-none pb-2"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconFilledEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IconFilledEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Konfirmasi Password Baru"
          type={isVisible ? "text" : "password"}
        />
        <p className="ms-3 text-sm pt-2 text-red-500 min-h-[20px] absolute ">
          {errors.password?.message}
        </p>
      </div>
      <div className="relative flex justify-center">
        <Input
          {...register("confirm_password")}
          size="lg"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Konfirmasi Password Baru"
          className="w-2/4"
          endContent={
            <button
              className="focus:outline-none pb-2"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconFilledEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IconFilledEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Masukkan ulang Password baru"
          type={isVisible ? "text" : "password"}
        />
        <p className="ms-3 text-sm pt-2 text-red-500 min-h-[20px] absolute ">
          {errors.confirm_password?.message}
        </p>
      </div>
      <Link href={"/"}>
        <Button
          className={`${
            isValid
              ? "bg-[#B02525] text-white "
              : "bg-[#B02525]/40 text-white/40"
          } w-1/4 mt-4`}
          variant="flat"
          size="md"
          type="submit"
          disabled={!isValid}
        >
          Kirim
        </Button>
      </Link>
    </form>
  );
}
