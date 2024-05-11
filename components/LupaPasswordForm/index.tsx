"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import apiLupaPassword from "@/service/api/apiLupaPassword";
import { setItem } from "@/store/storage";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const schema = yup.object({
  email: yup.string().required("Email harus diisi"),
});

interface DataLupaPassword {
  email: string;
}

export default function LupaPasswordForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<DataLupaPassword>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataLupaPassword) => {
    const body = {
      email: data.email,
    };

    const res = apiLupaPassword(body);
    res
      .then((res) => {
        console.log(res);
        toast.success(
          "Jika Benar Email Terdaftar, Link Reset Kata Sandi Akan Dikirim Ke Email Anda!"
        );
      })
      .catch((res) => {
        console.log(res);
        toast.error("Terjadi Kesalahan");
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitted)}
      className="w-full flex flex-col gap-8 pt-4 "
    >
      <ToastContainer />
      <div className="relative">
        <Input
          {...register("email")}
          size="lg"
          radius="sm"
          color="default"
          variant="bordered"
          type="email"
          labelPlacement="outside"
          placeholder="Enter your email"
          label="Email"
          className="w-3/4"
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-12">
          *
        </span>
        <p className="ms-3 text-sm pt-1 text-red-500 min-h-[20px] absolute ">
          {errors.email?.message}
        </p>
      </div>
      <Link href={"/"}>
        <Button
          className={`${
            isValid
              ? "bg-[#B02525] text-white "
              : "bg-[#B02525]/40 text-white/40"
          } w-3/4 mt-4`}
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
