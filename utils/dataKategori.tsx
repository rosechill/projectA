import { Brownies, CakeBg, CakeCategory, Choco, ChocoBar, HampersA, HampersB, HampersBg, HampersC, HampersCategory, KopiLuwak, LapisLegit, LapisSurabaya, Mandarin, Matcha, MatchaPowder, MilkBun, MinumanBg, MinumanCategory, PreoderCategory, PreoderBg, RotiBg, RotiCategory, RotiKeju, RotiSosis, Spikoe } from "@/assets/images";

export const dataKategori = [
    {
        category: 'Cake',
        image: CakeCategory,
        desc: 'Berbagai jenis kue mulai dari kue tradisional hingga modern',
        bgPath: CakeBg,
        path: '/kategori',
        products: [
            {
                name: 'Lapis Legit',
                price: '150000',
                detail: ' Kue red velvet dengan cream cheese frosting Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: LapisLegit
            },
            {
                name: 'Lapis Surabaya',
                price: '120000',
                detail: ' Kue cokelat dengan lapisan ganache Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: LapisSurabaya
            },
            {
                name: 'Brownies',
                price: '120000',
                detail: ' Kue cokelat dengan lapisan ganache Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: Brownies
            },
            {
                name: 'Spikoe',
                price: '120000',
                detail: ' Kue cokelat dengan lapisan ganache Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: Spikoe
            },
            {
                name: 'Mandarin',
                price: '120000',
                detail: ' Kue cokelat dengan lapisan ganache Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: Mandarin
            },
        ]
    },
    {
        category: 'Roti',
        image: RotiCategory,
        desc: 'Cari roti yang paling lembut seperti milkbun dan roti keju yang favorit',
        bgPath: RotiBg,
        path: '',
        products: [
            {
                name: 'Roti Sosis',
                price: '15000',
                detail: ' Roti lembut dengan aroma susu yang harum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: RotiSosis
            },
            {
                name: 'Milk Bun',
                price: '15000',
                detail: ' Roti lembut dengan aroma susu yang harum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: MilkBun
            },      
            {
                name: 'Roti Keju',
                price: '20000',
                detail: ' Roti dengan lapisan keju yang melted Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: RotiKeju
            },
        ]
    },
    {
        category: 'Minuman',
        image: MinumanCategory,
        desc: 'Setelah makan, harus minum dan Atma Kitchen menyediakan minuman',
        bgPath: MinumanBg,
        path: '',
        products: [
            {
                name: 'Choco Creamy Latte',
                price: '8000',
                detail: ' Minuman teh manis dengan es batu Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: Choco
            },
            {
                name: 'Matcha Creamy Latte',
                price: '12000',
                detail: ' Minuman kopi dengan susu dan es batu Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: Matcha
            },
        ]
    },
    {
        category: 'Preorder',
        image: PreoderCategory,
        desc: 'Produk titipan yang bervariasi dan sistem pemesanan pre order',
        bgPath: PreoderBg,
        path: '',
        products: [
            {
                name: 'Chocolate Bar 100gr',
                price: '200000',
                detail: ' Paket cokelat berbagai varian Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: ChocoBar
            },
            {
                name: 'Spikoe',
                price: '250000',
                detail: ' Keranjang hadiah berisi berbagai produk Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: Spikoe
            },
            {
                name: 'Matcha Bubuk 100gr',
                price: '250000',
                detail: ' Keranjang hadiah berisi berbagai produk Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: MatchaPowder
            },
            {
                name: 'Kopi Luwak 100gr',
                price: '250000',
                detail: ' Keranjang hadiah berisi berbagai produk Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: KopiLuwak
            },
        ]
    },
    {
        category: 'Hampers',
        image: HampersCategory,
        desc: 'Hampers yang bervariasi dengan banyak pilihan paket spesial',
        bgPath: HampersBg,
        path: '',
        products: [
            {
                name: 'Paket A',
                price: '180000',
                detail: ' Box makanan ringan sehat untuk hadiah Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: HampersA
            },
            {
                name: 'Paket B',
                price: '300000',
                detail: ' Box perawatan tubuh lengkap Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: HampersB
            },
            {
                name: 'Paket C',
                price: '300000',
                detail: ' Box perawatan tubuh lengkap Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non laboriosam recusandae unde aperiam laborum ipsa facere voluptates cum similique sit..',
                imgPath: HampersC
            },
        ]
    },
];
