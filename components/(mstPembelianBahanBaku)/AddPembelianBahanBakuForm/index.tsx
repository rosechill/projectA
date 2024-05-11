"use client";

import React, { useMemo, useState, useEffect, ReactElement, Key } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { set } from "firebase/database";
import { DataPembelianBahanBakuForm } from "@/interfaces/PembelianBahanBaku";
import { apiCreatePembelianBahanBaku } from "@/service/api/apiPembelianBahanBaku";
import apiGetBahanBaku from "@/service/api/apiBahanBaku";
import { DataBahanBaku } from "@/interfaces/BahanBakuInterface";

interface PembelianBahanBakuFormProps {
  onClose: () => void;
}

export default function PembelianBahanBakuForm({
  onClose,
}: PembelianBahanBakuFormProps) {
  const [bahanBakus, setBahanBakus] = useState<DataBahanBaku[]>([]);
  // const [selectedValue, setSelectedValue] = useState<number>(0);

  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetBahanBaku();
        setBahanBakus(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectionChange = (value: Key | null) => {
    const selectedBahanBakus = bahanBakus.find((item) => item.id == value as number);
    console.log(selectedBahanBakus);
    setSelectedValue(`${selectedBahanBakus?.id} - ${selectedBahanBakus?.name}`);
  };

  const form = useForm<DataPembelianBahanBakuForm>({
    defaultValues: {
      total_harga: 0,
      jumlah: 0,
      bahan_baku_id: 0,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataPembelianBahanBakuForm) => {
    const selectedBahanBakuId = selectedValue.split(" - ")[0];
    data.bahan_baku_id = parseInt(selectedBahanBakuId);
    apiCreatePembelianBahanBaku(data)
      .then(() => {
        toast("Berhasil Menambah Data Pembelian");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold">Masukkan data Pembelian :</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("jumlah")}
              type="number"
              labelPlacement="outside"
              label="Jumlah"
              placeholder="Masukkan Jumlah Pembelian"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.jumlah?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("total_harga")}
              type="number"
              labelPlacement="outside"
              label="Total Harga"
              placeholder="Masukkan Total Harga"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.total_harga?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
            <Autocomplete
              label="Bahan Baku"
              variant="bordered"
              defaultItems={bahanBakus}
              placeholder="Pilih Jabatan"
              onSelectionChange={handleSelectionChange}
              inputValue={selectedValue}
              fullWidth
            >
              {(item) => (
                <AutocompleteItem key={item.id}>
                  {item.id} - {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
              {errors.bahan_baku_id?.message}
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
              Add Pembelian
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
