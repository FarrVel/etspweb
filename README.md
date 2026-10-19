- Nama  : Farrel Aryasatya Raharjo
- NRP   : 5053251036
- ETS Pemrogramn Web - Kelas M

# PROSES.md

## 1. Persona dan masalahnya

Persona yang di dapat adalah ibu rumah tangga yang menerima uang belanja bulanan
dan membaginya ke beberapa amplop di awal bulan. Masalahnya, sulit
memantau amplop mana yang sudah habis dan berapa sisanya, sehingga uang
sering terpakai di luar rencana.

## 2. Rancangan struktur data

Semua data disimpan di localStorage dalam bentuk teks JSON.

**Key `transaksi`: array objek**

{
  id: 1760862000000,        
  tanggal: "2026-10-19",    
  jenis: "pengeluaran",     
  kategori: "Belanja Dapur",
  nominal: 25000,           
  catatan: "Sayur"          
}


**Key `amplop`: objek (untuk fitur khas, dikerjakan setelah W6)**

{ 
    "Belanja Dapur": 1500000,
    "Listrik & Air": 500000,
    "Sekolah Anak": 400000
}

Alasan pilihan bentuk:
- `id` memakai `Date.now()` supaya unik dan tidak bentrok setelah ada
  transaksi yang dihapus (nomor urut bisa terpakai ulang).
- `nominal` disimpan sebagai angka agar bisa dijumlahkan di
  `hitungRingkasan()`. Format Rupiah hanya dibuat saat ditampilkan
  lewat `formatRupiah()`.
- Kategori pengeluaran memakai pilihan tetap di konstanta `KATEGORI`
  sehingga tidak ada salah ketik.

## 3. Keputusan desain

**Kategori pengeluaran = nama amplop.**

Alasannya: fitur khas wajib memakai data transaksi yang sama. Dengan
menyamakan kategori dan nama amplop, sisa amplop bisa dihitung langsung
dari array `transaksi` (nominal amplop dikurangi total pengeluaran
kategori itu), tanpa menyimpan data sisa di tempat lain yang bisa tidak
sinkron. Kekurangannya: kalau nama kategori diubah, amplop ikut tidak
cocok. [Tambah alasanmu sendiri.]

**Satu fungsi satu tugas.**
`hitungRingkasan()` hanya menghitung, `renderRingkasan()` hanya
menampilkan, `simpanData()` dan `muatData()` hanya urusan localStorage.
Dengan begitu mudah dicari saat ada error. [Opsional: pakai ini atau
hapus.]

## 4. Bug dan kendala

### Kendala 1: Error perulangan
- **Gejala:** Daftar transaksi gagal dirender ke layar,
sehingga halaman web terlihat kosong tanpa daftar meskipun data sudah tersimpan di Console.
- **Penyebab:** Pada file script.js, fungsi renderDaftar()
mencoba mengakses variabel t (seperti t.jenis, t.tanggal, t.kategori).
Namun, variabel t belum didefinisikan karena saya lupa menambahkan perulangan
(seperti forEach) pada array urut.
- **Solusi:** menambahkan urut.forEach

### Kendala 2: Format penulisan rupiah
- **Gejala:** Setelah menambahkan form misalnya pengeluaran, tidak muncul pada halaman web tetapi muncul di Console
- **Penyebab:** Kesalahan penulisan di Rp, karena saya menuliskan RP
- **Solusi:** Pembenaran penulisan teks yang salah

## 5. Catatan per fitur

| Fitur | Yang dikerjakan |
|---|---|
| W1 | Form tambah transaksi |
| W2 | Daftar dirender dari array, terbaru di atas, format Rupiah |
| W3 | Hapus dengan `confirm()` dan `filter`, event delegation |
| W4 | localStorage |
| W5 | Ringkasan pemasukan, pengeluaran, dan saldo |
| W6 | Validasi dengan pesan error di halaman |