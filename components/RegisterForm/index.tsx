"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { DataRegister } from "@/interfaces/RegisterInterface";
import Link from "next/link";
import { apiRegister } from "@/service/api/apiRegister";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IconFilledEyeSlash } from "@/assets/icons";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object({
  name: yup.string().required("Nama harus diisi").min(3, "Minimal 3 karakter"),
  email: yup.string().required("Email harus diisi"),
  password: yup
    .string()
    .min(6, "password minimal 6 karakter")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password harus mengandung huruf kapital, angka, dan simbol"
    )
    .required("password baru harus diisi"),
});
export default function RegisterForm() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  const onSubmitted = async (data: DataRegister) => {
    const loading = toast.loading("Silahkan tunggu sebentar...");

    console.log(data);

    try {
      const res = await apiRegister(data);
      if (res.status === 200 || res.status === 201) {
        toast.update(loading, {
          render:
            "Pendaftaran Akun Berhasil! Silahkan cek email Anda untuk verifikasi akun Anda.",
          type: "success",
          autoClose: 10000,
          closeButton: true,
          isLoading: false,
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.update(loading, {
        render: error.response.data.message,
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }
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
          type="email"
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
          labelPlacement="outside"
          placeholder="Masukkan password"
          label="Password"
          className="w-3/4"
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
          type={isVisible ? "text" : "password"}
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
