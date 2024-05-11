export interface DataUser {
  id: number;
  name: string;
  email: string;
}

export interface DataPesanan {
  id: number; //
  user_id: number; //
  kurir_id: number; //
  status: string; //
  bukti_pembayaran: string;
  no_pemesanan: string; //
  jarak: number; //
  subtotal_awal: number; //
  ongkos_kirim: number; //
  potongan_poin: number; //
  subtotal_akhir: number; //
  total_tip: number; //
  tanggal_pesan: string; //
  tanggal_lunas: string; //
  tanggal_ambil: string; //
  total_poin: number; //
  created_at: string;
  updated_at: string;
  kurir: {
    id: number;
    jabatan_id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  detail_pemesanan: DetailPemesanan[];
}

export interface DetailPemesanan {
  id: number;
  pemesanan_id: number;
  produk_id: number;
  hampers_id: number;
  produk_titipan_id: number;
  jumlah: number;
  total_harga: number;
  is_sisaan: boolean;
  created_at: string;
  updated_at: string;
  produk: {
    id: number;
    name: string;
    kategori: string;
    kuota_harian: number;
    harga: number;
    gambar: string;
  };
  hampers: {
    id: number;
    name: string;
    harga: number;
    kategori: string;
    gambar: string;
  };
  produk_titipan: {
    id: number;
    penitip_id: number;
    name: string;
    harga: number;
    kategori: string;
    gambar: string;
  };
}
