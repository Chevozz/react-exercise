# Jeda Store

Jeda Store adalah aplikasi toko online sederhana untuk tugas praktikum Frontend Programming. Aplikasi menampilkan katalog perlengkapan rumah dan gaya hidup dari pengrajin lokal Indonesia.

## Demo Deploy

https://jedastore-mauve.vercel.app/

## Fitur

- Menampilkan katalog 12 produk.
- Pencarian produk berdasarkan nama, deskripsi, atau kategori.
- Filter produk berdasarkan kategori.
- Halaman detail produk.
- Keranjang belanja dengan fitur:
  - Menambah produk.
  - Mengubah jumlah produk.
  - Menghapus produk.
  - Menghitung total item dan harga.
- Halaman checkout.
- Validasi nama, alamat, dan nomor telepon.
- Pilihan metode pembayaran simulasi:
  - Transfer Bank (BCA).
  - Bayar di tempat (COD).
  - E-Wallet (GoPay / OVO).
- Panel admin sederhana untuk melihat ringkasan toko.
- Tampilan responsif untuk desktop dan perangkat mobile.

> Checkout hanya simulasi untuk kebutuhan tugas praktikum. Tidak ada pembayaran sungguhan.

## Teknologi

- React 18
- Vite
- JavaScript JSX
- React Router DOM
- Tailwind CSS
- Context API
- npm

## Menjalankan Project

### Prasyarat

- Node.js versi 18 atau lebih baru.
- npm.

### Instalasi

```bash
npm install
```

### Menjalankan mode development

```bash
npm run dev
```

Buka URL lokal yang ditampilkan Vite, biasanya:

```text
http://localhost:5173
```

### Membuat build production

```bash
npm run build
```

### Menjalankan preview build

```bash
npm run preview
```

## Halaman Aplikasi

| URL | Keterangan |
| --- | --- |
| `/` | Halaman utama dan katalog produk |
| `/product/:id` | Detail produk |
| `/cart` | Keranjang belanja |
| `/checkout` | Form checkout dan konfirmasi pesanan |
| `/admin` | Dashboard admin |
| `/admin/about` | Informasi aplikasi |

## Struktur Project

```text
src/
├── assets/products/       Gambar produk dalam format SVG
├── components/            Komponen Navbar, Footer, Sidebar, dan ProductCard
├── context/               CartContext untuk state keranjang
├── data/                  Data produk dan fungsi format harga
├── layouts/               Layout toko dan layout admin
├── pages/
│   ├── adminpages/        Halaman dashboard dan informasi admin
│   └── frontpages/        Halaman katalog, detail, cart, dan checkout
├── App.jsx                Konfigurasi route aplikasi
├── index.css              Style global dan Tailwind CSS
└── main.jsx               Entry point React
```

## Alur Penggunaan

1. Buka halaman utama.
2. Cari produk atau pilih kategori.
3. Buka detail produk.
4. Tambahkan produk ke keranjang.
5. Atur jumlah produk pada halaman keranjang.
6. Lanjutkan ke checkout.
7. Isi data penerima dan pilih metode pembayaran.
8. Klik `Proses pesanan` untuk melihat halaman konfirmasi.
9. Buka `Lihat panel admin` untuk melihat ringkasan keranjang.

## Deployment

Project dideploy menggunakan Vercel. Setiap perubahan pada repository dapat dibuild menggunakan perintah:

```bash
npm run build
```

Demo hasil deployment:

https://jedastore-mauve.vercel.app/

## Catatan

- Data produk tersimpan sebagai data statis di `src/data/products.js`.
- Aplikasi tidak menggunakan backend, database, autentikasi, atau payment gateway.
- Data keranjang hanya tersimpan selama halaman aplikasi aktif.
