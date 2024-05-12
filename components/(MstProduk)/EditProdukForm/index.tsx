"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataProduk, DataProdukForm } from "@/interfaces/ProdukInterface";
import { apiEditProduk } from "@/service/api/apiProduk";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface EditProdukForm {
  onClose: () => void;
  produkData: DataProduk | null;
}

const schema = yup.object({
  name: yup.string().required("name harus diisi").min(1, "name minimal 1"),
  kategori: yup
    .string()
    .required("kategori harus diisi")
    .min(1, "kategori minimal 1"),
  kuota_harian: yup
    .number()
    .required("kouta_harian harus diisi")
    .min(1, "kouta_harian minimal 1"),
  harga: yup.number().required("harga harus diisi").min(1, "harga minimal 1"),
  gambar: yup.mixed().required("gambar harus diisi"),
});

const EditProdukForm: React.FC<EditProdukForm> = ({ produkData, onClose }) => {
  const form = useForm<DataProdukForm>({
    defaultValues: {
      name: produkData?.name,
      kategori: produkData?.kategori,
      kuota_harian: produkData?.kuota_harian,
      harga: produkData?.harga,
      gambar: null,
    },
    // resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;
  const getId = produkData?.id;
  const onSubmitted = (produkData: any) => {
    let form = new FormData();
    if (produkData.gambar) {
      form.append("gambar", produkData.gambar[0]);
    }
    form.append("name", produkData.name);
    form.append("kategori", produkData.kategori);
    form.append("kuota_harian", produkData.kuota_harian);
    form.append("harga", produkData.harga);
    console.log(produkData.id);
    console.log(getId);
    apiEditProduk(getId as number, form as any)
      .then(() => {
        toast("Edit success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast("Edit Failed");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="hidden">{produkData?.id}</div>
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold">Masukkan data baru Produk:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("name")}
              type="string"
              labelPlacement="outside"
              label="name"
              placeholder="Masukkan name"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.name?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("kategori")}
              type="string"
              labelPlacement="outside"
              label="kategori"
              placeholder="Masukkan kategori"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.kategori?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("kuota_harian")}
              type="number"
              labelPlacement="outside"
              label="kouta_harian"
              placeholder="Masukkan kouta_harian"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.kuota_harian?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("harga")}
              type="number"
              labelPlacement="outside"
              label="harga"
              placeholder="Masukkan harga"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.harga?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative items-center justify-center ">
            <Image
              src={`http://127.0.0.1:8000/storage/${produkData?.gambar}`}
              alt="Gambar"
              width={200}
              height={200}
            />
            <input
              {...register("gambar")}
              type="file"
              accept="image/png"
              placeholder="Masukkan gambar"
              className="font-semibold flex justify-center items-center"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.gambar?.message}
            </p>
          </div>
          <div className="flex gap-4 justify-end pt-6 pb-2">
            <Button
              className="border-1 border-[#0370C3] bg-primary text-white min-w-[100px]"
              variant="flat"
              size="md"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className={`${
                isValid
                  ? "bg-[#0370C3] text-white"
                  : "bg-primary-disabled border-2 border-[#0370C3] text-white-disabled"
              } min-w-[100px]`}
              variant="flat"
              size="md"
              type="submit"
              disabled={!isValid}
            >
              Edit Produk
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProdukForm;
