import About from "@/components/(Home)/About";
import CategoryProduct from "@/components/(Home)/CategoryProduct";
import Landing from "@/components/(Home)/Landing";
import ListProduct from "@/components/(Home)/ListProduct";
import Image from "next/image";

export const metadata = {
  title: "Home | Atma Kitchen",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Landing/>
      <CategoryProduct/>
      <ListProduct/>
      <About/>
    </main>
  );
}
