export interface DataKaryawan {
  id: number;
  name: string;
  jabatan: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
}
