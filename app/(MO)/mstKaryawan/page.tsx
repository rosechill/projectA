import KaryawanTable from "@/components/(MstKaryawan)/KaryawanTable";
import React from "react";

export default async function mstKaryawan() {
  return (
    <div className="flex  h-[80vh] flex-col">
      <KaryawanTable />
    </div>
  );
}
