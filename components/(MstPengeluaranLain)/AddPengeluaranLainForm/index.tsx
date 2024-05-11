"use client";
import React, { useMemo, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataPengeluaranLainForm } from "@/interfaces/PengeluaranLainInterface";
import { apiCreatePengeluaranLain } from "@/service/api/apiPengeluaranLain";
interface PengeluaranLainFormProps {
  onClose: () => void;
}

const schema = yup.object({
  name: yup.string().required("name harus diisi"),
  total_harga: yup
    .number()
    .required("total_harga harus diisi")
    .min(0, "total_harga minimal 0"),
});

export default function PengeluaranLainForm({
  onClose,
}: PengeluaranLainFormProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["user"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const form = useForm<DataPengeluaranLainForm>({
    defaultValues: {
      name: '',
      total_harga: 0,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataPengeluaranLainForm) => {
    apiCreatePengeluaranLain(data)
      .then(() => {
        toast("Login success");

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
        <h2 className="font-semibold">Masukkan data Pengeluaran Lain:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("name")}
              type="string"
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
            <Input
              {...register("total_harga")}
              type="number"
              labelPlacement="outside"
              label="Pengeluaran Total Harga"
              placeholder="Masukkan Total Harga"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
              {errors.total_harga?.message}
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
              Add Pengeluaran Lain
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
