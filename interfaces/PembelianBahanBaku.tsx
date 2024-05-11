import { DataBahanBaku } from "./BahanBakuInterface";

export interface DataPembelianBahanBaku {
  id: number;
  jumlah: number;
  total_harga: number;
  waktu: Date;
  bahan_baku: {
    id: number;
    name: string;
    stok: number;
    satuan: number;
  };
}

export interface DataPembelianBahanBakuForm {
  jumlah: number;
  total_harga: number; 
  bahan_baku_id: number;
}
