"use client";
import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataAlamat, DataAlamatForm } from "@/interfaces/AlamatInterface";
import { apiEditAlamat } from "@/service/api/apiAlamat";
import apiGetAlamat from "@/service/api/apiAlamat";
import alamat from "@/app/(Customer)/alamat/page";

interface EditAlamatFormProps {
  onClose: () => void;
  AlamatData: DataAlamat | null;
}

const schema = yup.object({
  alamat: yup
    .string()
    .required("alamat harus diisi")
    .min(1, "alamat minimal 1"),
});

const EditAlamatForm: React.FC<EditAlamatFormProps> = ({
  AlamatData,
  onClose,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Alamat"]));
  const [Alamats, setAlamats] = useState<DataAlamat[]>([]);
  const form = useForm<DataAlamatForm>({
    defaultValues: {
      alamat: AlamatData?.alamat,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetAlamat();
        setAlamats(response.data.data);
        console.log(setAlamats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSubmitted = (data: DataAlamatForm) => {
    const AlamatDataHandler = AlamatData!;
    apiEditAlamat({
      id: AlamatDataHandler.id,
      alamat: data.alamat,
    })
      .then(() => {
        toast("Edit success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col justify-center">
      <ToastContainer />
      <h2 className="font-semibold">Masukkan data baru Alamat:</h2>
      <form
        onSubmit={handleSubmit(onSubmitted)}
        className="w-full flex flex-col gap-6 pt-6"
      >
        <div className="flex flex-col w-full md:flex-nowrap md:mb-0 gap-4 relative">
          <Input
            {...register("alamat")}
            type="text"
            labelPlacement="outside"
            label="alamat"
            placeholder="Masukkan alamat jika ingin diubah"
            size="lg"
            className="font-semibold"
          />
          <p className="ms-3 text-sm pt-4 text-red-500 min-h-[20px] absolute -bottom-6 right-4 ">
            {errors.alamat?.message}
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
            Edit Alamat
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAlamatForm;
