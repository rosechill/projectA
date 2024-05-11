import { DataProduk } from "./ProdukInterface";

export interface DataDetailHampers {
    id: number;
    hampers_id: number;
    produk: DataProduk;
    jumlah: number;
  }