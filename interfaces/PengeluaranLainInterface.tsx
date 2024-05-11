export interface DataPengeluaranLain {
  id: number;
  name: string;
  total_harga: number;
  waktu: Date;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface DataPengeluaranLainForm {
  name: string;
  total_harga: number;
}
