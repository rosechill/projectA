import { File } from "buffer";

export interface DataProduk {
    id: number,
    name: string,
    kategori: string,
    kuota_harian: number,
    harga: number,
    gambar: File, 
}

export interface DataProdukForm {
    name: string,
    kategori: string,
    kuota_harian: number,
    harga: number,
    gambar: File | null,
}