"use client";
import React from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataBahanBakuForm } from "@/interfaces/BahanBakuInterface";
import { apiCreateBahanBaku } from "@/service/api/apiBahanBaku";
import "react-toastify/dist/ReactToastify.css";

interface BahanBakuFormProps {
  onClose: () => void;
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

export default function BahanBakuForm({ onClose }: BahanBakuFormProps) {
  const form = useForm<DataBahanBakuForm>({
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;
  const onSubmitted = (data: any) => {
    let form = new FormData();
    form.append("name", data.name);
    form.append("stok", data.stok);
    form.append("satuan", data.satuan);

    console.log(form);
    console.log(data);
    apiCreateBahanBaku(form)
      .then(() => {
        toast(" create data success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold">Masukkan data Bahan Baku:</h2>
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
              placeholder="Masukkan nama bahan baku"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.name?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("stok")}
              type="number"
              labelPlacement="outside"
              label="stok"
              placeholder="Masukkan stok bahan baku"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.stok?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("satuan")}
              type="string"
              labelPlacement="outside"
              label="satuan"
              placeholder="Masukkan satuan bahan baku"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.satuan?.message}
            </p>
          </div>
          <div className="flex gap-4 justify-end pt-6 pb-2">
            <Button
              className="border-1 border-[#0370C3]  min-w-[100px] "
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
                  : "bg-primary-disabled border-2 border-[#0370C3] text-black   -disabled"
              } min-w-[100px]`}
              variant="flat"
              size="md"
              type="submit"
              disabled={!isValid}
            >
              Add Bahan Baku
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
