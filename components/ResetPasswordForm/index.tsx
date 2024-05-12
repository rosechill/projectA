"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import apiResetPassword from "@/service/api/apiResetPassword";
import { setItem } from "@/store/storage";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconFilledEye, IconFilledEyeSlash } from "@/assets/icons";
const schema = yup.object({
  passwordNew: yup
    .string()
    .min(6, "password minimal 6 karakter")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password harus mengandung huruf kapital, angka, dan simbol"
    )
    .required("password baru harus diisi"),
  passwordConfirm: yup
    .string()
    .min(6, "password minimal 6 karakter")
    .oneOf([yup.ref("passwordNew")], "password tidak sama")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password harus mengandung huruf kapital, angka, dan simbol"
    )
    .required("konfirmasi password baru harus diisi"),
});

interface DataResetPassword {
  passwordNew: string;
  passwordConfirm: string;
}

export default function ResetPasswordForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<DataResetPassword>({
    defaultValues: {
      passwordNew: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataResetPassword) => {
    const body = {
      token: token,
      email: email,
      password: data.passwordNew,
      confirm_password: data.passwordConfirm,
    };

    const res = apiResetPassword(body);
    res
      .then((res) => {
        console.log(res);
        if (res.success === false) {
          toast.error("Terjadi Kesalahan");
        } else {
          toast.success("Password anda telah direset, silahkan login kembali");
          router.push("/login");
        }
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
          {...register("passwordNew")}
          size="lg"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your password"
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
                <IconFilledEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password Baru"
          type={isVisible ? "text" : "password"}
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-32">
          *
        </span>
        <p className="ms-3 text-sm pt-2 text-red-500 min-h-[20px] absolute ">
          {errors.passwordNew?.message}
        </p>
      </div>
      <div className="relative">
        <Input
          {...register("passwordConfirm")}
          size="lg"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your password"
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
                <IconFilledEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Konfirmasi Password Baru"
          type={isVisible ? "text" : "password"}
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-56">
          *
        </span>
        <p className="ms-3 text-sm pt-2 text-red-500 min-h-[20px] absolute ">
          {errors.passwordConfirm?.message}
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
