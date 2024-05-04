"use client";

import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { DataLogin } from "@/interfaces/LoginInterface";
import { IconFilledEye, IconFilledEyeSlash } from "@/assets/icons";
import Link from "next/link";

const schema = yup.object({
  email: yup.string().required("Email harus diisi"),
  password: yup.string().required("Password harus diisi"),
});
export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<DataLogin>({
    defaultValues: {
      email: "",
      password: "",
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
    <form action="/" className="w-full flex flex-col gap-8 pt-4 ">
      <div className="relative">
        <Input
          {...register("email")}
          size="lg"
          radius="sm"
          color="default"
          variant="bordered"
          type="text"
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
      <div className="relative">
        <Input
          {...register("password")}
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
          label="Password"
          type={isVisible ? "text" : "password"}
        />
        <span className="text-red-500 font-bold text-xl absolute -top-1 left-20">
          *
        </span>
        <p className="ms-3 text-sm pt-2 text-red-500 min-h-[20px] absolute ">
          {errors.password?.message}
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
          Masuk
        </Button>
      </Link>
    </form>
  );
}
