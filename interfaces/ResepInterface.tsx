export interface DataResep {
    id: number;
    produk_id: number;
    bahan_baku_id: number;
    jumlah: number;
    produk: {
      id: number;
      name: string;
      kategori: string;
      kuota_harian: number;
      harga: number;
      gambar: string;
    };
    bahan_baku: {
      id: number;
      name: string;
      stok: number;
      satuan: string;
    };
}

export interface DataResepForm {
    produk_id: number,
    bahan_baku_id: number,
    jumlah: number,
}