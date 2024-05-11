"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataJabatanForm } from "@/interfaces/JabatanInterface";
import { apiCreateJabatan } from "@/service/api/apiJabatan";
import { DataJabatan } from "@/interfaces/JabatanInterface";
import apiGetJabatan from "@/service/api/apiJabatan";

interface JabatanFormProps {
  onClose: () => void;
}

const schema = yup.object({
  name: yup.string().required("nama harus diisi").min(1, "nama minimal 1"),
});

export default function JabatanForm({ onClose }: JabatanFormProps) {
  const [jabatans, setJabatans] = useState<DataJabatan[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetJabatan();
        setJabatans(response.data.data);
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

  const form = useForm<DataJabatanForm>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataJabatanForm) => {
    apiCreateJabatan(data)
      .then(() => {
        toast("Tambah Jabatan berhasil");

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
        <h2 className="font-semibold">Masukkan data Jabatan:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("name")}
              type="text"
              labelPlacement="outside"
              label="Nama"
              placeholder="Masukkan Nama"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.name?.message}
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
              Add Jabatan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
