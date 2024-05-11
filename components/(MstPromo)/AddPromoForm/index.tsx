"use client";
import React, { useMemo, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataPromoForm } from "@/interfaces/PromoInterface";
import { apiCreatePromo } from "@/service/api/apiPromo";
import 'react-toastify/dist/ReactToastify.css';
interface PromoFormProps {
  onClose: () => void;
}

const schema = yup.object({
  kelipatan: yup
    .number()
    .required("kelipatan harus diisi")
    .min(1, "kelipatan minimal 1"),
  bonus_poin: yup
    .number()
    .required("bonus_poin harus diisi")
    .min(1, "kelipatan minimal 1"),
});

export default function PromoForm({ onClose }: PromoFormProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["user"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const form = useForm<DataPromoForm>({
    defaultValues: {
      kelipatan: 0,
      bonus_poin: 0,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmitted = (data: DataPromoForm) => {
    apiCreatePromo(data)
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
        <h2 className="font-semibold">Masukkan data Promo:</h2>
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="w-full flex flex-col gap-6 pt-6"
        >
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("bonus_poin")}
              type="number"
              labelPlacement="outside"
              label="bonus poin"
              placeholder="Masukkan bonus poin"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.bonus_poin?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
            <Input
              {...register("kelipatan")}
              type="number"
              labelPlacement="outside"
              label="kelipatan"
              placeholder="Masukkan kelipatan"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
              {errors.kelipatan?.message}
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
              Add Promo
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
