"use client";
import React, { Key, useEffect, useState } from "react";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { DataHampers, DataHampersForm } from "@/interfaces/HampersInterfaces";
import { apiEditHampers } from "@/service/api/apiHampers";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { DataProduk } from "@/interfaces/ProdukInterface";
import apiGetProduk from "@/service/api/apiProduk";

interface EditHampersForm {
  onClose: () => void;
  hamperData: DataHampers | null;
}

interface SelectedDetailHampers {
  key: number;
  product_id: number | string;
  jumlah: number;
}

const EditHampersForm: React.FC<EditHampersForm> = ({
  hamperData,
  onClose,
}) => {
  let key = 0;
  const initialDetailHampersInputField: SelectedDetailHampers[] =
    hamperData?.detail_hampers?.map((item) => {
      const selectedDetail: SelectedDetailHampers = {
        key: key++,
        product_id: item.produk.id,
        jumlah: item.jumlah,
      };
      console.log(selectedDetail);
      return selectedDetail;
    }) || [];

  const [detailHampersInputField, setDetailHampersInputField] = useState<
    SelectedDetailHampers[]
  >(initialDetailHampersInputField);

  const [selectedFieldKey, setSelectedFieldKey] = useState<number>(
    hamperData?.detail_hampers.length as number
  );
  const [produkData, setProdukData] = useState<DataProduk[]>([]);

  const form = useForm<DataHampersForm>({
    defaultValues: {
      name: hamperData?.name,
      harga: hamperData?.harga,
      kategori: hamperData?.kategori,
      gambar: null,
    },
    // resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;
  const getId = hamperData?.id;

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

  const onSubmitted = (hamperData: any) => {
    const finalDetailHampers = detailHampersInputField;

    let form = new FormData();

    if (hamperData.gambar) {
      form.append("gambar", hamperData.gambar[0]);
    }

    console.log(hamperData);
    form.append("name", hamperData.name);
    form.append("harga", hamperData.harga);
    form.append("kategori", hamperData.kategori);
    form.append("detail_hampers", JSON.stringify(finalDetailHampers));

    console.log(getId);

    apiEditHampers(getId as number, form)
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

  return (
    <>
      <ToastContainer />
      <div className="hidden">{hamperData?.id}</div>
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold">Edit data Produk:</h2>
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
          <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative items-center justify-center ">
            <Image
              src={`https://jurwawe.sga.dom.my.id/storage/${hamperData?.gambar}`}
              alt="Gambar"
              width={200}
              height={200}
            />
            <input
              {...register("gambar")}
              type="file"
              accept="image/png"
              placeholder="Masukkan gambar"
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
                    selectedKey={data.product_id}
                    inputValue={
                      produkData.find((item) => item.id == data.product_id)
                        ?.name
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
                    value={data.jumlah.toLocaleString()}
                  />
                </div>
              </div>
            </>
          ))}
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
              Edit Hampers
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditHampersForm;
