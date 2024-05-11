import { File } from "buffer";

export interface DataProdukTitipan {
    id: number,
    penitip_id: number,
    name: string,
    harga: number,
    kategori: string,
    gambar: File, 
}

export interface DataProdukTitipanForm {
    penitip_id: number,
    name: string,
    harga: number,
    kategori: string,
    gambar: File, 
}

