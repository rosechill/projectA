'use client'
import { Hero } from "@/assets/images";
// import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function Landing() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <section className="grid grid-cols-2">
      <div className="flex flex-col gap-4 justify-center ps-24 h-[70vh] tracking-wider">
        <div className="flex flex-col gap-4">
          <h1 className="flex gap-4">
            <span className="text-5xl text-[#B02525] font-semibold">
              Temukan 
            </span>{" "}
            <span className="text-5xl text-[#1E5494] font-semibold">
             Kebahagiaan
            </span>
          </h1>
          <h1 className="text-5xl">Dalam Setiap Sajian</h1>
        </div>
        <div className="text-xl">
          <h2>Atma Kitchen Menghadirkan Dessert Unik dengan</h2>
          <h2>Sentuhan Personal yang Menggugah Selera</h2>
        </div>
        <Link href={"/produk"} className="">
          <Button className="bg-[#B02525] w-[120px] text-white">Belanja</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Image src={Hero} alt="hero" width={500} height={500}/>
      </div>
      <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    </section>
  );
}
