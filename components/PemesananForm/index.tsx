"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { DataPemesanan } from "@/interfaces/PemesananInterface";

const schema = yup.object({
  nama: yup.string().required("Nama harus diisi"),
  alamat: yup.string().required("Alamat harus diisi"),
  email: yup.string().required("Email harus diisi"),
  deliveryMethod: yup.string().required("Email harus diisi"),
});

const deliveryMethods = ["Kargo", "Hemat"];

export default function PemesananForm({ productName }: { productName: string }) {
  const form = useForm<DataPemesanan>({
    defaultValues: {
      nama: "",
      alamat: "",
      email: "",
      deliveryMethod: deliveryMethods[0],
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    // handleSubmit,
    formState: { errors, isValid },
  } = form;

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const handleDeliveryMethod = (method: string) => {
    setSelectedDeliveryMethod(method);
  };

  return (
    <form
      action="/payment"
      className="w-full flex flex-col justify-center gap-8 pt-4 "
    >
      <h2 className="text-3xl font-semibold">Checkout</h2>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Input
              {...register("nama")}
              size="lg"
              radius="sm"
              color="default"
              variant="bordered"
              type="text"
              labelPlacement="outside"
              placeholder="Masukkan nama lengkap"
              label="Nama Lengkap"
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
              {...register("alamat")}
              size="lg"
              radius="sm"
              color="default"
              variant="bordered"
              type="text"
              labelPlacement="outside"
              placeholder="Masukkan alamat "
              label="Alamat"
            />
            <span className="text-red-500 font-bold text-xl absolute -top-1 left-16">
              *
            </span>
            <p className="ms-3 text-sm pt-1 text-red-500 min-h-[20px] absolute ">
              {errors.alamat?.message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Input
              {...register("email")}
              size="lg"
              radius="sm"
              color="default"
              variant="bordered"
              type="text"
              labelPlacement="outside"
              placeholder="Masukkan email "
              label="Email"
            />
            <span className="text-red-500 font-bold text-xl absolute -top-1 left-12">
              *
            </span>
            <p className="ms-3 text-sm pt-1 text-red-500 min-h-[20px] absolute ">
              {errors.email?.message}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col ">
        <h2 className="text-xl font-semibold">Delivery Method</h2>
        <div className="flex justify-between gap-4">
          {deliveryMethods.map((method, index) => (
            <Button
              key={index}
              className={`w-1/2 mt-4 ${
                selectedDeliveryMethod === method
                  ? "bg-[#B02525] text-white h-[60px]"
                  : "bg-white text-[#B02525] border-2 border-[#B02525] h-[60px]"
              }`}
              onClick={() => handleDeliveryMethod(method)}
            >
              {method}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link href={`/pesanan`}>
          <Button
            className={`${
              isValid
                ? "bg-[#B02525] text-white "
                : "bg-[#B02525]/40 text-white/40"
            } w-full mt-4`}
            variant="flat"
            size="md"
            type="submit"
            disabled={!isValid}
          >
            Pembayaran
          </Button>
        </Link>
      </div>
    </form>
  );
}
