"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataPromo, DataPromoForm } from "@/interfaces/PromoInterface";
import { apiEditPromo } from "@/service/api/apiPromo";
import 'react-toastify/dist/ReactToastify.css';

interface EditPromoFormProps {
  onClose: () => void;
  promoData: DataPromo | null;
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

const EditPromoForm: React.FC<EditPromoFormProps> = ({
  promoData,
  onClose,
}) => {
  const form = useForm<DataPromoForm>({
    defaultValues: {
      kelipatan: promoData?.bonus_poin,
      bonus_poin: promoData?.kelipatan,
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
    const promoDataHandler = promoData!; 
    apiEditPromo(promoDataHandler.id, data)
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
      <h2 className="font-semibold">Masukkan data baru Promo:</h2>
      <form
        onSubmit={handleSubmit(onSubmitted)}
        className="w-full flex flex-col gap-6 pt-6"
      >
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("bonus_poin")}
            type="text"
            labelPlacement="outside"
            label="bonus_poin"
            placeholder="Masukkan bonus_poin jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.bonus_poin?.message}
          </p>
        </div>
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("kelipatan")}
            type="text"
            labelPlacement="outside"
            label="kelipatan"
            placeholder="Masukkan kelipatan jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.kelipatan?.message}
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
            Edit Promo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPromoForm;
