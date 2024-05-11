"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataAlamatForm } from "@/interfaces/AlamatInterface";
import { apiCreateAlamat } from "@/service/api/apiAlamat";
import { DataAlamat } from "@/interfaces/AlamatInterface";
import apiGetAlamat from "@/service/api/apiAlamat";

interface AlamatFormProps {
  onClose: () => void;
}

const schema = yup.object({
  alamat: yup
    .string()
    .required("alamat harus diisi")
    .min(1, "alamat minimal 1 kata"),
});

export default function AlamatForm({ onClose }: AlamatFormProps) {
  const [Alamats, setAlamats] = useState<DataAlamat[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetAlamat();
        setAlamats(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectionChange = (keys: any) => {
    const key = Array.from(keys)[0];
    setSelectedValue(key as any);
  };

  const form = useForm<DataAlamatForm>({
    defaultValues: {
      alamat: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataAlamatForm) => {
    apiCreateAlamat(data)
      .then(() => {
        toast("Tambah Alamat berhasil");

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
        <h2 className="font-semibold">Masukkan data Alamat:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("alamat")}
              type="text"
              labelPlacement="outside"
              label="Nama"
              placeholder="Masukkan Nama"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.alamat?.message}
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
              Add Alamat
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
