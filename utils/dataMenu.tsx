import { DataMenu } from "@/interfaces/MenuInterface";

export const dataMenu: DataMenu[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Produk",
    path: "/produk",
  },
  {
    name: "Pesanan",
    path: "/pesanan",
  },
];

export const dataMenuAdmin: DataMenu[] = [
  {
    name: "mstUser",
    path: "/mstUser",
  },
  {
    name: "mstPromo",
    path: "/mstPromo",
  },
  {
    name: "mstProduk",
    path: "/mstProduk",
  },
  {
    name: "mstResep",
    path: "/mstResep",
  },
  {
    name: "mstBahanBaku",
    path: "/mstBahanBaku",
  },
  {
    name: "mstHampers",
    path: "/mstHampers",
  },
];

export const dataMenuMO: DataMenu[] = [
  {
    name: "mstJabatan", 
    path: "/mstJabatan",
  },
  {
    name: "mstKaryawan", 
    path: "/mstKaryawan",
  },
  {
    name: "mstPenitip", 
    path: "/mstPenitip",
  },
  {
    name: "mstPembelianBahanBuku", 
    path: "/mstPembelianBahanBuku",
  },
  {
    name: "mstPengeluaranLain", 
    path: "/mstPengeluaranLain",
  },
  {
    name: "mstPresensi", 
    path: "/mstPresensi",
  },
];

export const dataMenuCustomer: DataMenu[] = [
  {
    name: "userProfile", 
    path: "/userProfile",
  },
  {
    name: "alamat", 
    path: "/alamat",
  },
];

export const dataMenuOwner: DataMenu[] = [
  {
    name: "mstJabatan", 
    path: "/mstJabatan",
  },
  {
    name: "mstKaryawan", 
    path: "/mstKaryawan",
  },
];
