"use client";
import React, { Key, useEffect, useState } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { set, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataProduk, DataProdukForm } from "@/interfaces/ProdukInterface";
import { DataDetailHampers } from "@/interfaces/DetailHampersInterfaces";
import { apiCreateHampers } from "@/service/api/apiHampers";
import apiGetProduk from "@/service/api/apiProduk";
import "react-toastify/dist/ReactToastify.css";
import { DataHampers } from "@/interfaces/HampersInterfaces";

interface ProdukFormProps {
  onClose: () => void;
}

interface SelectedDetailHampers {
  key: number;
  product_id: string;
  jumlah: number;
}

export default function ProdukForm({ onClose }: ProdukFormProps) {
  const form = useForm<DataHampers>({
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const [produkData, setProdukData] = useState<DataProduk[]>([]);
  const [selectedFieldKey, setSelectedFieldKey] = useState<number>(0);
  const [detailHampersInputField, setDetailHampersInputField] = useState<
    SelectedDetailHampers[]
  >([]);

  const onSubmitted = (data: any) => {
    const finalDetailHampers = detailHampersInputField;

    let form = new FormData();
    form.append("name", data.name);
    form.append("harga", data.harga);
    form.append("kategori", data.kategori);
    form.append("gambar", data.gambar[0]);
    form.append("detail_hampers", JSON.stringify(finalDetailHampers));

    apiCreateHampers(form)
      .then(() => {
        toast(" create data success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const addDetailHampersInputField = () => {
    const newKey = selectedFieldKey + 1;
    setSelectedFieldKey(newKey);

    const newDetailHampers: SelectedDetailHampers = {
      key: newKey,
      product_id: "",
      jumlah: 0,
    };

    setDetailHampersInputField((prev) => [...prev, newDetailHampers]);
  };

  const substractDetailHampersInputField = () => {
    if (selectedFieldKey > 0) {
      const newKey = selectedFieldKey - 1;
      setSelectedFieldKey(newKey);
      setDetailHampersInputField((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const addSelectedProduct = (key: Key | null, fieldKey: number) => {
    if (fieldKey !== null) {
      const selectedData = detailHampersInputField.find(
        (item) => item.key === fieldKey
      );

      if (selectedData !== undefined) {
        const newDetailHampers: SelectedDetailHampers = {
          key: selectedData.key,
          product_id: key as string,
          jumlah: selectedData.jumlah,
        };
        setDetailHampersInputField((prev) =>
          prev.map((detailHampers) =>
            detailHampers.key === newDetailHampers.key
              ? newDetailHampers
              : detailHampers
          )
        );
      }
    }
  };

  const addJumlahProduct = (jumlah: number, fieldKey: number) => {
    if (fieldKey !== null) {
      const selectedData = detailHampersInputField.find(
        (item) => item.key === fieldKey
      );

      if (selectedData !== undefined) {
        const newDetailHampers: SelectedDetailHampers = {
          key: selectedData.key,
          product_id: selectedData.product_id,
          jumlah: jumlah,
        };
        setDetailHampersInputField((prev) =>
          prev.map((detailHampers) =>
            detailHampers.key === newDetailHampers.key
              ? newDetailHampers
              : detailHampers
          )
        );
      }
    }
  };

  useEffect(() => {
    console.log(detailHampersInputField);
  }, [detailHampersInputField]);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        // setLoading(true);
        const response = await apiGetProduk();
        console.log(response.data.data);
        setProdukData(response.data.data);
      } catch (error) {
        // console.log(error)
        // setLoading(true);
      } finally {
        // setLoading(false);
      }
    };

    fetchProduk();
  }, []);

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
              {...register("name")}
              type="string"
              labelPlacement="outside"
              label="Nama Hampers"
              placeholder="Masukkan nama hampers"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.name?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("harga")}
              type="number"
              labelPlacement="outside"
              label="Harga Hampers"
              placeholder="Masukkan harga hampers"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.harga?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative ">
            <Input
              {...register("kategori")}
              type="string"
              labelPlacement="outside"
              label="Kategori Hampers"
              placeholder="Masukkan kategori hampers"
              size="lg"
              className="font-semibold"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.kategori?.message}
            </p>
          </div>
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative items-start justify-center ">
            <p className="text-lg font-semibold">
              Masukkan gambar Hampers
            </p>
            <input
              {...register("gambar")}
              type="file"
              accept="image/png"
              placeholder="Masukkan gambar hampers"
              className="font-semibold flex justify-center items-center"
            />
            <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
              {errors.gambar?.message}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              Masukkan produk dalam Hampers
            </p>
            <div className="flex gap-2">
              <Button
                className="bg-[#0370C3] text-white text-2xl font-semibold"
                onPress={substractDetailHampersInputField}
              >
                -
              </Button>
              <Button
                className="bg-[#0370C3] text-white text-2xl font-semibold"
                onPress={addDetailHampersInputField}
              >
                +
              </Button>
            </div>
          </div>
          {detailHampersInputField.map((data) => (
            <>
              <div className="flex w-full md:flex-nowrap md:mb-0 gap-4 relative items-center justify-center ">
                <div className="w-5/6 flex justify-center items-center">
                  <Autocomplete
                    defaultItems={produkData}
                    label="Produk"
                    placeholder="Cari Produk"
                    fullWidth
                    key={data.key}
                    onSelectionChange={(key) =>
                      addSelectedProduct(key, data.key)
                    }
                  >
                    {(produk) => (
                      <AutocompleteItem key={produk.id}>
                        {produk.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                <div className="w-1/6 h-full">
                  <Input
                    type="number"
                    accept="image/png"
                    placeholder="Jumlah"
                    className="font-semibold flex justify-center items-center h-full"
                    size="lg"
                    key={data.key}
                    onChange={(e) =>
                      addJumlahProduct(Number(e.target.value), data.key)
                    }
                  />
                </div>
              </div>
            </>
          ))}
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4">
            {errors.detail_hampers?.message}
          </p>
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
              Add Hampers
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
