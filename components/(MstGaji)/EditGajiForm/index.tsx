"use client";
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dataGaji, dataGajiForm } from "@/interfaces/GajiInterface";
import { ChevronDownIcon } from "@/assets/icons";
import { apiEditGaji } from "@/service/api/apiGaji";

interface EditPromoFormProps {
  onClose: () => void;
  gajiData: dataGaji | null;
  jabatanData: any[];
}

const schema = yup.object({
  jabatan_id: yup
    .number()
    .required("jabatan_id harus diisi")
    .min(1, "jabatan_id minimal 1"),
  gaji: yup.number().required("gaji harus diisi").min(1, "gaji minimal 1"),
  bonus: yup.number().required("gaji harus diisi").min(1, "gaji minimal 1"),
});

const EditGajiForm: React.FC<EditPromoFormProps> = ({
  gajiData,
  jabatanData,
  onClose,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(
    jabatanData[0]?.id || 0
  );
  const handleSelectionChange = (keys: any) => {
    const key = Array.from(keys)[0];
    setSelectedValue(key as any);
  };

  const form = useForm<dataGajiForm>({
    defaultValues: {
      jabatan_id: gajiData?.jabatan_id,
      gaji: gajiData?.gaji,
      bonus: gajiData?.bonus,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = form;

  useEffect(() => {
    setValue("jabatan_id", selectedValue);
  }, [selectedValue, setValue]);

  const getId = gajiData?.id;

  const onSubmitted = (data: dataGajiForm) => {
    console.log(data);
    apiEditGaji(getId as number, data)
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
      <ToastContainer/>
      <h2 className="font-semibold">Masukkan data baru Gaji:</h2>
      <form
        onSubmit={handleSubmit(onSubmitted)}
        className="w-full flex flex-col gap-6 pt-6"
      >
        <div className="flex gap-2 items-center w-full">
          <h2 className="w-[150px] font-semibold">Pilih Jabatan : </h2>
          <Dropdown>
            <DropdownTrigger className="justify-between">
              <Button
                variant="bordered"
                className="capitalize w-3/4"
                endContent={<ChevronDownIcon className="text-medium" />}
              >
                {`${selectedValue}`}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              aria-labelledby="dropdown-button"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedValue ? [selectedValue] : []}
              onSelectionChange={handleSelectionChange}
              className="max-h-[300px] overflow-y-scroll"
            >
              {jabatanData.map((item) => (
                <DropdownItem key={item.id} value={item.id}>
                  {`${item.id}-${item.name}`}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("gaji")}
            type="number"
            labelPlacement="outside"
            label="gaji"
            placeholder="Masukkan gaji jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.gaji?.message}
          </p>
        </div>
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("bonus")}
            type="number"
            labelPlacement="outside"
            label="bonus"
            placeholder="Masukkan bonus jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.bonus?.message}
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

export default EditGajiForm;
