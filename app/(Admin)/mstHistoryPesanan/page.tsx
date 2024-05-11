import HistoryPesananTable from "@/components/(MstHistoryPesanan)/HistoryPesananTable";
import React from "react";

export default async function mstHistoryPesanan() {
  return (
    <div className="flex  h-[80vh] flex-col">
      <HistoryPesananTable />
    </div>
  );
}
