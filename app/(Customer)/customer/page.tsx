"use client";

import { FotoProfile } from "@/assets/images";
import { DataPesanan, DataUser } from "@/interfaces/UserInterface";
import { apiEditCustomerName, apiGetHistoryPesanan, apiGetUserProfile } from "@/service/api/apiUser";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";

export default function mstCustomer() {
  const [user, setUser] = useState<DataUser | null>(null);
  const [history, setHistory] = React.useState<DataPesanan[]>([]);

  const fetchDataUser = async () => {
    try {
      const response = await apiGetUserProfile();
      console.log("User profile response:", response); // Log the entire response
      setUser(response.data.data);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();

    const data: Promise<DataPesanan[]> = apiGetHistoryPesanan({
      id: null,
    });

    data.then((res) => {
      setHistory(res);
    });
  }, []);

  const handleUpdateName = async () => {
    try {
      const response = await apiEditCustomerName();
      console.log("Update name response:", response); 
    } catch (error) {
      console.log("Error updating name:", error);
    }
  };

  return (
    <div className="w-full h-auto p-4 ">
      <div className="flex justify-between gap-4">
        <div className="p-4 w-1/3 shadow-xl bg-gray-100">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="rounded-full border w-24 border-[#B02525]">
              <Image
                src={FotoProfile}
                alt="profile"
                className=""
                width={100}
                height={100}
              />
            </div>
            <p className="text-xl font-semibold">{user?.name}</p>
            <div className="px-3 py-2 bg-blue-300 rounded-lg border-gray-100">
              {user?.email}
            </div>
            <form className="flex flex-col gap-4">
              <label htmlFor="name" className="font-semibold">
                Edit Name:
              </label>
              <input
                type="text"
                id="name"
                className="px-3 py-2 border border-gray-300 rounded-lg"
                value={user?.name || ""}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleUpdateName}
              >
                Update Name
              </button>
            </form>
          </div>
        </div>
        <div className="w-3/5">
          
          {history?.length > 0 ? (
            <div className="flex flex-col gap-4 w-full">
              <p className="font-semibold text-center ">History Pesanan</p>
              <div className="flex flex-col gap-4 w-full">
                {history.map((item) => (
                  <Card className="w-full">
                    <CardHeader className="flex gap-3">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div>
                          <p className="text-md font-bold">
                            no pesanan: {item.no_pemesanan}
                          </p>
                          <p className="text-md">status: {item.status}</p>
                          <p className="text-md">kurir :{item.kurir.name}</p>
                        </div>
                        <div>
                          <p className="text-small text-default-500">
                            jarak :{item.jarak}
                          </p>
                          <p className="text-small text-default-500">
                            ongkos kirim :{item.ongkos_kirim}
                          </p>
                          <p className="text-small text-default-500">
                            subtotal awal :{item.subtotal_awal}
                          </p>
                          <p className="text-small text-default-500">
                            subtotal akhir :{item.subtotal_akhir}
                          </p>
                        </div>
                        <div>
                          <p className="text-small text-default-500">
                            total tip :{item.total_tip}
                          </p>
                          <p className="text-small text-default-500">
                            potongan poin :{item.potongan_poin}
                          </p>
                          <p className="text-small text-default-500">
                            total poin :{item.total_poin}
                          </p>
                        </div>
                        <div>
                          <p className="text-small text-default-500">
                            tanggal pesan :{item.tanggal_pesan}
                          </p>
                          <p className="text-small text-default-500">
                            tanggal lunas :{item.tanggal_lunas}
                          </p>
                          <p className="text-small text-default-500">
                            tanggal ambil :{item.tanggal_ambil}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        {item.detail_pemesanan.map((item) => (
                          <Card className="max-w-[400px]">
                            <CardHeader className="flex gap-3">
                              <div className="flex w-full flex-col">
                                <p className="text-md">
                                  Jumlah Pesanan: {item.jumlah}
                                </p>
                                <p className="text-md">
                                  Total Harga: {item.total_harga}
                                </p>
                                <p className="text-md">
                                  Sisa: {item.is_sisaan ? "Ya" : "Tidak"}
                                </p>
                              </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                              <div className="flex w-full flex-col gap-4">
                                <div>
                                  <p className="font-bold">Produk</p>
                                  <p className="text-md">
                                    nama : {item.produk.name}
                                  </p>
                                  <p className="text-md">
                                    harga: {item.produk.harga}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-bold">Hampers</p>
                                  <p className="text-md">
                                    nama : {item.hampers.name}
                                  </p>
                                  <p className="text-md">
                                    harga: {item.hampers.harga}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-bold">Produk Titipan</p>
                                  <p className="text-md">
                                    nama : {item.produk_titipan.name}
                                  </p>
                                  <p className="text-md">
                                    harga: {item.produk_titipan.harga}
                                  </p>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p className="font-semibold text-yellow-500 text-center">
              Loading History Pesanan
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
