"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@nextui-org/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataResepForm } from "@/interfaces/ResepInterface";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import "react-toastify/dist/ReactToastify.css";
import { ChevronDownIcon } from "@/assets/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiCreateResep } from "@/service/api/apiResep";

interface ResepFormProps {
  onClose: () => void;
  dataProduk: any[];
  dataBahanBaku: any[];
}

const schema = yup.object({
  produk_id: yup
    .number()
    .required("kategori harus diisi")
    .min(1, "kategori minimal 1"),
  bahan_baku_id: yup
    .number()
    .required("kouta_harian harus diisi")
    .min(1, "kouta_harian minimal 1"),
  jumlah: yup
    .number()
    .required("kouta_harian harus diisi")
    .min(1, "kouta_harian minimal 1"),
});

export default function ResepForm({
  onClose,
  dataProduk,
  dataBahanBaku,
}: ResepFormProps) {
  const [selectedProductValue, setSelectedProductValue] = useState<any>(
    dataProduk[0]?.id || {}
  );
  const [selectedBahanBakuValue, setSelectedBahanBakuValue] = useState<any>(
    dataBahanBaku[0]?.id || {}
  );

  const handleSelectionProdukChange = (keys: any) => {
    const key = Array.from(keys)[0];
    setSelectedProductValue(key as any);
  };
  const handleSelectionBahanBakuChange = (keys: any) => {
    const key = Array.from(keys)[0];
    setSelectedBahanBakuValue(key as any);
  };

  const form = useForm<DataResepForm>({
    defaultValues: {
      produk_id: selectedProductValue,
      bahan_baku_id: selectedBahanBakuValue,
      jumlah: 0,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = form;

  useEffect(() => {
    setValue("produk_id", selectedProductValue);
  }, [selectedProductValue, setValue]);

  useEffect(() => {
    setValue("bahan_baku_id", selectedBahanBakuValue);
  }, [selectedBahanBakuValue, setValue]);

  const onSubmitted = (data: any) => {
    // console.log(data)
    apiCreateResep(data)
    .then(() => {
      toast("Create Resep success");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((error:any) => {
      toast.error(error.message);
    });
  };


  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold">Masukkan data Resep:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
         <div className="flex gap-2 items-center w-full">
          <h2 className="w-[150px] font-semibold">Pilih Produk : </h2>
          <Dropdown>
            <DropdownTrigger className="justify-between">
              <Button
                variant="bordered"
                className="capitalize w-3/4"
                endContent={<ChevronDownIcon className="text-medium" />}
              >
                {selectedProductValue} 
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              aria-labelledby="dropdown-button"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedProductValue ? [selectedProductValue] : []}
              onSelectionChange={handleSelectionProdukChange}
              className="max-h-[300px] overflow-y-scroll"
            >
              {dataProduk.map((item: { name: string | number | undefined; id: string | number | undefined; }) => (
                <DropdownItem key={item.id}>{item.id} - {item.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex gap-2 items-center w-full ">
          <h2 className="w-[150px] font-semibold">Pilih Bahan Baku : </h2>
          <Dropdown>
            <DropdownTrigger className="justify-between">
              <Button
                variant="bordered"
                className="capitalize w-3/4"
                endContent={<ChevronDownIcon className="text-medium" />}
              >
                {selectedBahanBakuValue} 
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              aria-labelledby="dropdown-button"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedBahanBakuValue ? [selectedBahanBakuValue] : []}
              onSelectionChange={handleSelectionBahanBakuChange}
              className="max-h-[300px] overflow-y-scroll"
            >
              {dataProduk.map((item: { name: string | number | undefined; id: string | number | undefined; }) => (
                <DropdownItem key={item.id}>{item.id} - {item.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("jumlah")}
              type="number"
              labelPlacement="outside"
              label="jumlah"
              placeholder="Masukkan jumlah"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.jumlah?.message}
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
              Add Resep
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
