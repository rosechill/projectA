import PembelianBahanBakuTable from "@/components/(mstPembelianBahanBaku)/PembelianBahanBakuTable";
import React from "react";

export default async function mstKaryawan() {
  return (
    <div className="flex  h-[80vh] flex-col">
      <PembelianBahanBakuTable />
    </div>
  );
}
