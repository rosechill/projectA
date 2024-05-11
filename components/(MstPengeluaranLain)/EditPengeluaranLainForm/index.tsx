"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DataPengeluaranLain,
  DataPengeluaranLainForm,
} from "@/interfaces/PengeluaranLainInterface";
import { apiEditPengeluaranLain } from "@/service/api/apiPengeluaranLain";

interface EditPengeluaranLainFormProps {
  onClose: () => void;
  pengeluaranLainData: DataPengeluaranLain | null;
}

const schema = yup.object({
  name: yup.string().required("name harus diisi"),
  total_harga: yup
    .number()
    .required("total_harga harus diisi")
    .min(0, "total_harga minimal 0"),
});

const EditPengeluaranLainForm: React.FC<EditPengeluaranLainFormProps> = ({
  pengeluaranLainData,
  onClose,
}) => {
  const form = useForm<DataPengeluaranLainForm>({
    defaultValues: {
      name: pengeluaranLainData?.name,
      total_harga: pengeluaranLainData?.total_harga,
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
    const pengeluaranLainDataHandler = pengeluaranLainData!;
    apiEditPengeluaranLain(pengeluaranLainDataHandler.id, data)
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
    <div className="flex flex-col justify-center">
      <h2 className="font-semibold">Masukkan data baru Pengeluaran Lain:</h2>
      <form
        onSubmit={handleSubmit(onSubmitted)}
        className="w-full flex flex-col gap-6 pt-6"
      >
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("name")}
            type="text"
            labelPlacement="outside"
            label="Nama"
            placeholder="Masukkan Nama jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("total_harga")}
            type="number"
            labelPlacement="outside"
            label="Total harga"
            placeholder="Masukkan Total harga jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.total_harga?.message}
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
            Edit Pengeluaran lain
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPengeluaranLainForm;
