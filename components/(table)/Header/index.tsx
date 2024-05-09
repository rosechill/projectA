import React from "react";
import Profile from "../Profile";

export default function Header() {
  return (
    <header className="flex flex-row justify-end bg-primary py-4 px-6 gap-4 max-h-[10vh]  ">
      <Profile />
    </header>
  );
}
