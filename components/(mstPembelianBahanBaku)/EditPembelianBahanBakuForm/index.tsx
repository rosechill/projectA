"use client";
import React, { useState, useEffect, Key } from "react";
import { Input, Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DataPembelianBahanBaku,
  DataPembelianBahanBakuForm,
} from "@/interfaces/PembelianBahanBaku";
import { DataBahanBaku } from "@/interfaces/BahanBakuInterface";
import apiGetBahanBaku from "@/service/api/apiBahanBaku";
import { apiEditPembelianBahanBaku } from "@/service/api/apiPembelianBahanBaku";

interface EditPembelianBahanBakuFormProps {
  onClose: () => void;
  pembelianData: DataPembelianBahanBaku | null;
}

const EditPembelianBahanBakuForm: React.FC<EditPembelianBahanBakuFormProps> = ({
  pembelianData,
  onClose,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["pembelian"]));
  const [bahanBakus, setBahanBakus] = useState<DataBahanBaku[]>([]);

  const form = useForm<DataPembelianBahanBakuForm>({
    defaultValues: {
      total_harga: pembelianData?.total_harga,
      jumlah: pembelianData?.jumlah,
      bahan_baku_id: pembelianData?.bahan_baku.id,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetBahanBaku();
        setBahanBakus(response.data.data);
        console.log(setBahanBakus);
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

  const onSubmitted = (data: DataPembelianBahanBakuForm) => {
    const pembelianDataHandler = pembelianData!;
    apiEditPembelianBahanBaku(pembelianDataHandler.id, data)
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
      <h2 className="font-semibold">
        Masukkan data baru pembelian:
      </h2>
      <form
        onSubmit={handleSubmit(onSubmitted)}
        className="w-full flex flex-col gap-6 pt-6"
      >
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("total_harga")}
            type="number"
            labelPlacement="outside"
            label="Total Harga"
            placeholder="Masukkan total harga jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.total_harga?.message}
          </p>
        </div>
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("jumlah")}
            type="number"
            labelPlacement="outside"
            label="Jumlah"
            placeholder="Masukkan Jumlah jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
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
            Edit Pembelian
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPembelianBahanBakuForm;
