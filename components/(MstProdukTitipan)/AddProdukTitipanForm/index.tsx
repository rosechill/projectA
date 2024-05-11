"use client";
import React, { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { apiCreateProduk } from "@/service/api/apiProduk";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "@nextui-org/react";

import "react-toastify/dist/ReactToastify.css";
import { ChevronDownIcon } from "@/assets/icons";
import { DataProdukTitipanForm } from "@/interfaces/ProdukTitipanInterface";
import { apiCreateProdukTitipan } from "@/service/api/apiProdukTitipan";

interface ProdukFormProps {
  onClose: () => void;
  dataPenitip: any[];
}

const schema = yup.object({
  penitip_id: yup.number().required("name harus diisi"),
  name: yup.string().required("name harus diisi").min(1, "name minimal 1"),
  harga: yup.number().required("harga harus diisi").min(1, "harga minimal 1"),
  kategori: yup
    .string()
    .required("kategori harus diisi")
    .min(1, "kategori minimal 1"),
  gambar: yup.mixed().required("gambar harus diisi"),
});

export default function ProdukTitipanForm({
  dataPenitip,
  onClose,
}: ProdukFormProps) {
  const [selectedValue, setSelectedValue] = useState<number>(
    dataPenitip[0]?.penitip_id || 0
  );

  const handleSelectionChange = (keys: any) => {
    const key = Array.from(keys)[0];
    setSelectedValue(key as any);
  };

  const form = useForm<DataProdukTitipanForm>({
    defaultValues: {
      penitip_id: selectedValue,
    },
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = form;

  useEffect(() => {
    setValue("penitip_id", selectedValue);
  }, [selectedValue, setValue]);

  const onSubmitted = (data: any) => {
    let form = new FormData();
    form.append("gambar", data.gambar[0]);
    form.append("penitip_id", data.penitip_id);
    form.append("name", data.name);
    form.append("kategori", data.kategori);
    form.append("harga", data.harga);

    // console.log(form);
    // console.log(data);
    apiCreateProdukTitipan(form)
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
    // console.log(data);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold">Masukkan data Promo:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex gap-2 items-center w-full">
            <h2 className="w-[150px] font-semibold">Pilih Penitip : </h2>
            <Dropdown>
              <DropdownTrigger className="justify-between">
                <Button
                  variant="bordered"
                  className="capitalize w-3/4"
                  endContent={<ChevronDownIcon className="text-medium" />}
                >
                  {`${selectedValue}`}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="flat"
                aria-labelledby="dropdown-button"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedValue ? [selectedValue] : []}
                onSelectionChange={handleSelectionChange}
                className="max-h-[300px] overflow-y-scroll"
              >
                {dataPenitip.map((item) => (
                  <DropdownItem key={item.penitip_id} value={item.penitip_id}>
                    {`${item.penitip_id}-${item.name}`}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
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
              Add Produk
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
