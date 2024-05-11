"use client";
import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataKaryawan, DataKaryawanForm } from "@/interfaces/KaryawanInterface";
import { apiEditKaryawan } from "@/service/api/apiKaryawan";
import { DataJabatan } from "@/interfaces/JabatanInterface";
import apiGetJabatan from "@/service/api/apiJabatan";

interface EditKaryawanFormProps {
  onClose: () => void;
  karyawanData: DataKaryawan | null;
}

const schema = yup.object({
  name: yup.string().required("nama harus diisi").min(1, "nama minimal 1"),
  jabatan: yup.object({
    id: yup.number().required("jabatan harus diisi"),
    name: yup.string().required("jabatan harus diisi"),
  }),
});

const EditKaryawanForm: React.FC<EditKaryawanFormProps> = ({
  karyawanData,
  onClose,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["karyawan"]));
  const [jabatans, setJabatans] = useState<DataJabatan[]>([]);
  const form = useForm<DataKaryawanForm>({
    defaultValues: {
      name: karyawanData?.name,
      jabatan: {
        id: karyawanData?.jabatan.id,
      },
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetJabatan();
        setJabatans(response.data.data);
        console.log(setJabatans);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSubmitted = (data: DataKaryawanForm) => {
    const karyawanDataHandler = karyawanData!;
    apiEditKaryawan(karyawanDataHandler.id, data)
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
      <h2 className="font-semibold">Masukkan data baru Karyawan:</h2>
      <form
        onSubmit={handleSubmit(onSubmitted)}
        className="w-full flex flex-col gap-6 pt-6"
      >
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("name")}
            type="text"
            labelPlacement="outside"
            label="name"
            placeholder="Masukkan name jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Pilih Jabatan</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={jabatans}>
              {(item) => (
                <DropdownItem key={item.id}>
                  {item.id} - {item.name}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.jabatan?.id?.message}
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
            Edit Karyawan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditKaryawanForm;
