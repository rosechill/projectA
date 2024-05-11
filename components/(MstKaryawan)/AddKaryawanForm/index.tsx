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
import { DataKaryawanForm } from "@/interfaces/KaryawanInterface";
import { apiCreateKaryawan } from "@/service/api/apiKaryawan";
import { DataJabatan } from "@/interfaces/JabatanInterface";
import apiGetJabatan from "@/service/api/apiJabatan";
import { set } from "firebase/database";

interface KaryawanFormProps {
  onClose: () => void;
}

const schema = yup.object({
  name: yup.string().required("nama harus diisi").min(1, "nama minimal 1"),
  jabatan_id: yup.number().required("jabatan harus diisi"),
});

export default function KaryawanForm({ onClose }: KaryawanFormProps) {
  const [jabatans, setJabatans] = useState<DataJabatan[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

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

  const handleSelectionChange = (value: Key | null) => {
    const selectedJabatan = jabatans.find(
      (item) => item.id == (value as number)
    );
    setSelectedValue(`${selectedJabatan?.id} - ${selectedJabatan?.name}`);
  };

  const form = useForm<DataKaryawanForm>({
    defaultValues: {
      name: "",
      jabatan_id: 0,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataKaryawanForm) => {
    const selectedJabatanId = selectedValue.split(" - ")[0];
    console.log(selectedJabatanId);
    data.jabatan_id = parseInt(selectedJabatanId);
    apiCreateKaryawan(data)
      .then(() => {
        toast("Berhasil Menambah Karyawan");

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
        <h2 className="font-semibold">Masukkan data Karyawan:</h2>
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
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
            <Autocomplete
              {...register("jabatan_id")}
              label="Jabatan"
              variant="bordered"
              defaultItems={jabatans}
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
              {errors.jabatan_id?.message}
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
              Add Karyawan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
