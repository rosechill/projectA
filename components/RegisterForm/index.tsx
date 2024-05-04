"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { DataRegister } from "@/interfaces/RegisterInterface";
import Link from "next/link";

const schema = yup.object({
  nama: yup.string().required("Nama harus diisi"),
  email: yup.string().required("Email harus diisi"),
  password: yup.string().required("Password harus diisi"),
  numberPhone: yup.string().required("Number phone harus diisi"),
});
export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<DataRegister>({
    defaultValues: {
      nama: "",
      email: "",
      password: "",
      numberPhone: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    // handleSubmit,
    formState: { errors, isValid },
  } = form;

  return (
    <form action="/login" className="w-full flex flex-col gap-8 pt-4 ">
      <div className="relative">
        <Input
          {...register("nama")}
          size="lg"
          radius="sm"
          color="default"
          variant="bordered"
          type="text"
          labelPlacement="outside"
          placeholder="Masukkan nama"
          label="Nama Lengkap"
          className="w-3/4"
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-32">
          *
        </span>
        <p className="ms-3 text-sm pt-1 text-red-500 min-h-[20px] absolute ">
          {errors.nama?.message}
        </p>
      </div>
      <div className="relative">
        <Input
          {...register("email")}
          size="lg"
          radius="sm"
          color="default"
          variant="bordered"
          type="text"
          labelPlacement="outside"
          placeholder="Masukkan email"
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
      <div className="relative">
        <Input
          {...register("password")}
          size="lg"
          radius="sm"
          color="default"
          variant="bordered"
          type="text"
          labelPlacement="outside"
          placeholder="Masukkan password"
          label="Password"
          className="w-3/4"
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-20">
          *
        </span>
        <p className="ms-3 text-sm pt-1 text-red-500 min-h-[20px] absolute ">
          {errors.password?.message}
        </p>
      </div>
      <div className="relative">
        <Input
          {...register("numberPhone")}
          size="lg"
          radius="sm"
          color="default"
          variant="bordered"
          type="text"
          labelPlacement="outside"
          placeholder="Masukkan number phone"
          label="Number Phone"
          className="w-3/4"
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-32">
          *
        </span>
        <p className="ms-3 text-sm pt-1 text-red-500 min-h-[20px] absolute ">
          {errors.numberPhone?.message}
        </p>
      </div>
      <Link href={"/login"}>
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
          Daftar
        </Button>
      </Link>
    </form>
  );
}
