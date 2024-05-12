"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  Divider,
  CardBody,
} from "@nextui-org/react";
import { DataPesanan, DataUser } from "@/interfaces/UserInterface";
import { apiGetHistoryPesanan } from "@/service/api/apiUser";
import { formatIDR } from "@/utils/constant";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  UserData: DataUser | null;
}

const ViewUserModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  UserData,
}) => {
  if (!isOpen) return null;

  const [history, setHistory] = React.useState<DataPesanan[]>([]);

  useEffect(() => {
    const data: Promise<DataPesanan[]> = apiGetHistoryPesanan({
      id: UserData?.id,
    });

    data.then((res) => {
      setHistory(res);
    });
  }, [UserData]);

  return (
    <Modal scrollBehavior="inside" size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="bg-[#0370C3] text-primary-50 justify-center">
          {title}
        </ModalHeader>
        <ModalBody>
          {UserData && (
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Id User</p>
                <p>: </p>
                <p>{UserData.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">User</p>
                <p>: </p>
                <p>{UserData.name}</p>
              </div>
              <div className="flex gap-4">
                <p className="w-[125px] font-semibold">Email</p>
                <p>: </p>
                <p>{UserData.email}</p>
              </div>
              {history.length > 0 ? (
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
                              <p className="text-md">
                                kurir :{item.kurir.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-small text-default-500">
                                jarak :{item.jarak}
                              </p>
                              <p className="text-small text-default-500">
                                ongkos kirim :{formatIDR(item.ongkos_kirim)}
                              </p>
                              <p className="text-small text-default-500">
                                subtotal awal :{formatIDR(item.subtotal_awal)}
                              </p>
                              <p className="text-small text-default-500">
                                subtotal akhir :{formatIDR(item.subtotal_akhir)}
                              </p>
                            </div>
                            <div>
                              <p className="text-small text-default-500">
                                total tip :{formatIDR(item.total_tip)}
                              </p>
                              <p className="text-small text-default-500">
                                potongan poin :{formatIDR(item.potongan_poin)}
                              </p>
                              <p className="text-small text-default-500">
                                total poin :{formatIDR(item.total_poin)}
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
                                      Total Harga: {formatIDR(item.total_harga)}
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
                                        harga: {formatIDR(item.produk.harga)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="font-bold">Hampers</p>
                                      <p className="text-md">
                                        nama : {item.hampers.name}
                                      </p>
                                      <p className="text-md">
                                        harga: {formatIDR(item.hampers.harga)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="font-bold">
                                        Produk Titipan
                                      </p>
                                      <p className="text-md">
                                        nama : {item.produk_titipan.name}
                                      </p>
                                      <p className="text-md">
                                        harga: {formatIDR(item.produk_titipan.harga)}
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
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            className="border-1 border-[#0370C3] bg-primary min-w-[100px] text-white"
            variant="flat"
            size="md"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewUserModal;
