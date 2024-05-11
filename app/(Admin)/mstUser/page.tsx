import UserTable from "@/components/(MstUser)/UserTable";
import React from "react";

export default async function mstUser() {
  return (
    <div className="flex  h-[80vh] flex-col">
      <UserTable />
    </div>
  );
}
