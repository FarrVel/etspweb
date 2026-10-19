const KATEGORI = {
    pengeluaran: ["Belanja Dapur", "Listrik & Air", "Sekolah Anak", "Transport", "Lainnya"],
    pemasukan: ["Uang Belanja", "Lainnya"]
};

let transaksi = [];

const daftarEl = document.getElementById("daftar-transaksi");
const formEl = document.getElementById("form-transaksi");
const jenisEl = document.getElementById("jenis");
const kategoriEl = document.getElementById("kategori");

function isiKategori() {
    kategoriEl.innerHTML = "";
    KATEGORI[jenisEl.value].forEach(function (k) {
    const opsi = document.createElement("option");
    opsi.value = k;
    opsi.textContent = k;
    kategoriEl.appendChild(opsi);
    });
}

function tanggalHariIni() {
    return new Date().toLocaleDateString("en-CA"); 
}

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function renderDaftar () {
    daftarEl.innerHTML = "";

    if (transaksi.length === 0) {
        const kosong = document.createElement("li");
        kosong.textContent = "Belum ada transaksi.";
        daftarEl.appendChild(kosong);
        return;
    }

    const urut = transaksi.slice().sort(function (a, b) {
    return b.id - a.id; // id terbesar = paling baru, tampil di atas
    });

    urut.forEach(function (t) {
    const item = document.createElement("li");
    item.classList.add(t.jenis); // untuk pewarnaan nanti

    const tanda = t.jenis === "pemasukan" ? "+" : "-";
    const teks = t.tanggal + " | " + t.kategori + " | " + tanda + formatRupiah(t.nominal);
    item.textContent = t.catatan ? teks + " | " + t.catatan : teks;

    daftarEl.appendChild(item);
    });
}

function tambahTransaksi(event) {
    event.preventDefault();

    const baru = {
    id: Date.now(),
    tanggal: document.getElementById("tanggal").value,
    jenis: jenisEl.value,
    kategori: kategoriEl.value,
    nominal: Number(document.getElementById("nominal").value),
    catatan: document.getElementById("catatan").value
    };

    transaksi.push(baru);
    renderDaftar();

    formEl.reset();
    document.getElementById("tanggal").value = tanggalHariIni();
    isiKategori();
}

function init() {
    document.getElementById("tanggal").value = tanggalHariIni();
    renderDaftar();
    jenisEl.addEventListener("change", isiKategori);
    formEl.addEventListener("submit", tambahTransaksi);
}

init();