"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const paymentMethods = ["Kredit", "Transfer", "E-Money"];
const bankMethods = ["ShopePay", "Gopay", "Ovo"];

export default function payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );
  const [selectedBankMethod, setSelectedBankMethod] = useState(bankMethods[0]);
  const handlePaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleBankMethod = (method: string) => {
    setSelectedBankMethod(method);
  };

  return (
    <section className="flex flex-col gap-8 ">
      <div className="px-24 py-12">
        <div className="flex gap-32 ">
          <div className="flex flex-col gap-4 justify-center w-3/4">
            <h1 className="text-2xl font-semibold">Payment</h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Payment Method</h1>
              <div className="grid grid-cols-3 gap-8">
                {paymentMethods.map((method, index) => (
                  <Button
                    key={index}
                    className={`w-1/2 ${
                      selectedPaymentMethod === method
                        ? "bg-[#B02525] text-white h-[60px] w-full"
                        : "bg-white text-[#B02525] border-2 border-[#B02525] h-[60px] w-full"
                    }`}
                    onClick={() => handlePaymentMethod(method)}
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Jenis Bank</h1>
              <div className="grid grid-cols-3 gap-8">
                {bankMethods.map((method, index) => (
                  <Button
                    key={index}
                    className={`w-1/2 ${
                      selectedBankMethod === method
                        ? "bg-[#B02525] text-white h-[60px] w-full"
                        : "bg-white text-[#B02525] border-2 border-[#B02525] h-[60px] w-full"
                    }`}
                    onClick={() => handleBankMethod(method)}
                  >
                    {method}
                  </Button>
                ))}
              </div>
              <p>Transfer ke Bank {selectedBankMethod}</p>
              <li>Buka Aplikasi {selectedBankMethod}</li>
              <li>Pilih "Ke Rekening {selectedBankMethod}".</li>
              <li>
                Masukkan nomor telepon pengguna {selectedBankMethod} yang ingin
                Anda tuju.
              </li>
              <li>Masukkan nominal transfer dan catatan (opsional).</li>
              <li>
                Konfirmasi transaksi dan masukkan PIN {selectedBankMethod} Anda.
              </li>
            </div>
          </div>
          <div className="ms-[5rem] py-12 flex flex-col gap-4 rounded-xl w-2/4">
            <h2 className="text-lg font-semibold">Detail Payment</h2>
            <div className="grid grid-cols-2">
              <h2>Subtotal</h2>
              <h2>Rp 40.000,00</h2>
            </div>
            <div className="grid grid-cols-2">
              <h2>Biaya Ongkir</h2>
              <h2>Rp 40.000,00</h2>
            </div>
            <div className="grid grid-cols-2">
              <h2>Total</h2>
              <h2>Rp 40.000,00</h2>
            </div>
            <Link href={'/payment/detailOrder'} className="w-3/4 flex">
                <Button className="bg-[#B02525] text-white rounded-lg ">Pembayaran</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
