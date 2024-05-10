"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { DataRegister } from "@/interfaces/RegisterInterface";
import Link from "next/link";
import apiRegister from "@/service/api/apiRegister";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object({
  name: yup.string().required("Nama harus diisi"),
  email: yup.string().required("Email harus diisi"),
  password: yup.string().required("Password harus diisi"),
});
export default function RegisterForm() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<DataRegister>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataRegister) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    apiRegister(body)
      .then((res) => {
        console.log(res);
        if (res.status === "status") {
          toast("Register success");
          router.push("/login");
        } else {
          toast.error(res.data.message); 
        }
      })
      .catch(() => {
        toast.error("Register failed");
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
          {...register("name")}
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
          {errors.name?.message}
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
