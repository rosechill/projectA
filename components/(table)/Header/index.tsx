import React from "react";
import Profile from "../Profile";

export default function Header({ role }: { readonly role: string }) {
  return (
    <header className="flex flex-row justify-end bg-[#1E5494] py-4 px-6 gap-4 max-h-[10vh]  ">
      <Profile role={role}/>
    </header>
  );
}
