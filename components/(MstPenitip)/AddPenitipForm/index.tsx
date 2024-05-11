"use client";
import React, { useMemo, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataPenitip, DataPenitipForm } from "@/interfaces/PenitipInterface";
import { apiCreatePenitip } from "@/service/api/apiPenitip";
interface PenitipFormProps {
  onClose: () => void;
}

const schema = yup.object({
  name: yup
    .string()
    .required("nama penitip harus diisi")
    .min(1, "nama penitip minimal 1"),
});

export default function PenitipForm({ onClose }: PenitipFormProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["user"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const form = useForm<DataPenitipForm>({
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

  const onSubmitted = (data: DataPenitipForm) => {
    apiCreatePenitip(data)
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
        <h2 className="font-semibold">Masukkan data penitip:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("name")}
              type="number"
              labelPlacement="outside"
              label="bonus poin"
              placeholder="Masukkan bonus poin"
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
              Add Penitip
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
