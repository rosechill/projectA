export interface dataGaji {
    id: number,
    jabatan_id: number,
    gaji: number,
    bonus: number,
    jabatan: {
        name: string
    }
}

export interface dataGajiForm {
    jabatan_id: number,
    gaji: number,
    bonus: number,
}