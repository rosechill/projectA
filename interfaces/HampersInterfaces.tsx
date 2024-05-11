import { DataDetailHampers } from "./DetailHampersInterfaces";

export interface DataHampers {
  id: number;
  name: string;
  harga: number;
  kategori: string;
  gambar: string;
  detail_hampers: Array<DataDetailHampers>;
}

export interface DataHampersForm {
    name: string;
    harga: number;
    kategori: string;
    gambar: File | null;
    detail_hampers: Array<DataDetailHampers>;
}
