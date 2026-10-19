## W1 - Form tambah transaksi
- Prompt: panduan membuat form transaksi dengan kategori dinamis untuk di js
- Dipakai: isiKategori(), tambahTransaksi() di script.js
- Diubah: nama kategori menyesuaikan persona yang di dapat

## W2 - Daftar transaksi
- Prompt: panduan fungsi render daftar dan format rupiah memakai titik.
- Dipakai: formatRupiah(), renderDaftar() di script.js
- Diubah: mengubah console.log(transaksi) di tambahTransaksi dan init () dengan renderDaftar()

## W3 - Hapus transaksi
- Prompt: fungsi menghapus transaksi dan detail konformasi data yang akan di hapus
- Dipakai: hapusTransaksi() dan event delegation di init()
- Diubah: menambahkan tombol hapus di renderDaftar() dan menambahkan fungsi hapusTransaksi. Serta menambahkan event listener di init()

## W4 - localStorage
- Prompt: membuat localstorage dengan kode yang ada
- Dipakai: simpanData(), muatData(), pemanggilan di init()
- Diubah: menambah try and catch, dan menambahkan muatData sebelum renderDaftar

## W5 - Ringkasan
- Prompt: fungsi ringkasan dengan menampilkan pemasukan, pengeluaran, dan sisa saldo
- Dipakai: hitungRingkasan(), renderRingkasan() dan pemanggilannya
- Diubah: Menambahkan section ringkasan di html, menambahkan referensi elemen di script.js, menambahkan dua fungsi baru yaitu hitungRingkasan dan renderRingkasan, serta menambahkan renderRingkasan() di setiap renderDaftar()

## W6 - Validasi form
- Prompt: fungsi  validasi form di halaman
- Dipakai: validasiForm(), tampilkanError(), perubahan di tambahTransaksi()
- Diubah: menambahkan tempat untuk pesan errornya, menambahkan referensi elemen, dan menambahkan dua fungsi yaitu validasiForm dan tampilkanError. Mengubah fungsi tambahTransaksi, menambahkan validasi form, dan reset untuk tanggal.