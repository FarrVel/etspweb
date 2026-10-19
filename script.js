const KATEGORI = {
    pengeluaran: ["Belanja Dapur", "Listrik & Air", "Sekolah Anak", "Transport", "Lainnya"],
    pemasukan: ["Uang Belanja", "Lainnya"]
};

const KEY_TRANSAKSI = "transaksi";

let transaksi = [];

const daftarEl = document.getElementById("daftar-transaksi");
const formEl = document.getElementById("form-transaksi");
const jenisEl = document.getElementById("jenis");
const kategoriEl = document.getElementById("kategori");
const totalPemasukanEl = document.getElementById("total-pemasukan");
const totalPengeluaranEl = document.getElementById("total-pengeluaran");
const saldoEl = document.getElementById("saldo");
const pesanErrorEl = document.getElementById("pesan-error");

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

function simpanData() {
    localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(transaksi));
}

function muatData() {
    const mentah = localStorage.getItem(KEY_TRANSAKSI);
    if (mentah === null) {
        transaksi = [];
    return;
    }
    try {
        transaksi = JSON.parse(mentah);
    } catch (e) {
        console.warn("Data rusak, memakai data kosong.");
    transaksi = [];
    }
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
        const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.type = "button";
    tombolHapus.dataset.id = t.id;
    item.appendChild(tombolHapus);
    daftarEl.appendChild(item);
    });
}

function hitungRingkasan() {
    const totalPemasukan = transaksi
        .filter(function (t) { return t.jenis === "pemasukan"; })
        .reduce(function (jumlah, t) { return jumlah + t.nominal; }, 0);

    const totalPengeluaran = transaksi
        .filter(function (t) { return t.jenis === "pengeluaran"; })
        .reduce(function (jumlah, t) { return jumlah + t.nominal; }, 0);

    return {
        pemasukan: totalPemasukan,
        pengeluaran: totalPengeluaran,
        saldo: totalPemasukan - totalPengeluaran
    };
}

function renderRingkasan() {
    const r = hitungRingkasan();
    totalPemasukanEl.textContent = formatRupiah(r.pemasukan);
    totalPengeluaranEl.textContent = formatRupiah(r.pengeluaran);
    saldoEl.textContent = formatRupiah(r.saldo);
}

function hapusTransaksi(id) {
    const yakin = confirm("Yakin ingin menghapus transaksi ini?");
    if (!yakin) {
    return;
    }

    transaksi = transaksi.filter(function (t) {
    return t.id !== id;
    });
    simpanData();
    renderDaftar();
    renderRingkasan();
}

function validasiForm(data) {
    const error = [];

    if (data.tanggal === "") {
        error.push("Tanggal wajib diisi.");
    }
    if (data.kategori === "") {
        error.push("Kategori wajib dipilih.");
    }
    if (data.nominalMentah.trim() === "") {
        error.push("Nominal wajib diisi.");
    } else if (isNaN(Number(data.nominalMentah)) || Number(data.nominalMentah) <= 0) {
        error.push("Nominal harus berupa angka lebih dari 0.");
    }

    return error;
}

function tampilkanError(daftarError) {
    pesanErrorEl.textContent = daftarError.join(" ");
}

function tambahTransaksi(event) {
    event.preventDefault();

    const input = {
    tanggal: document.getElementById("tanggal").value,
    jenis: jenisEl.value,
    kategori: kategoriEl.value,
    nominalMentah: document.getElementById("nominal").value,
    catatan: document.getElementById("catatan").value
    };

    const error = validasiForm(input);
    if (error.length > 0) {
    tampilkanError(error);
        return;    }
    tampilkanError([]);

    const baru = {
    id: Date.now(),
    tanggal: input.tanggal,
    jenis: input.jenis,
    kategori: input.kategori,
    nominal: Number(input.nominalMentah),
    catatan: input.catatan
    };

    transaksi.push(baru);
    simpanData();

    formEl.reset();
    document.getElementById("tanggal").value = tanggalHariIni();
    isiKategori();

    renderDaftar();
    renderRingkasan();
}

function init() {
    document.getElementById("tanggal").value = tanggalHariIni();
    muatData();
    renderDaftar();
    renderRingkasan();
    jenisEl.addEventListener("change", isiKategori);
    formEl.addEventListener("submit", tambahTransaksi);

    daftarEl.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        hapusTransaksi(Number(event.target.dataset.id));
    }
    });
}

init();