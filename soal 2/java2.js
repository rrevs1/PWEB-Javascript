const pos = {
    "Jawa Timur": {
        "Surabaya": {
            "Sukolilo": [
                ["Keputih", "60111"],
                ["Gebang Putih", "60117"],
                ["Klampis Ngasem", "60117"],
                ["Menur Pumpungan", "60118"],
                ["Nginden Jangkungan", "60118"],
                ["Medokan Semampir", "60119"],
                ["Semolowaru", "60119"]
            ],
            "Gubeng": [
                ["Gubeng", "60281"],
                ["Kertajaya", "60282"],
                ["Pucang Sewu", "60283"],
                ["Baratajaya", "60284"],
                ["Mojo", "60285"],
                ["Airlangga", "60286"]
            ],
            "Tegalsari": [
                ["Kedungdoro", "60261"],
                ["Tegalsari", "60262"],
                ["Wonorejo", "60263"],
                ["Dr. Soetomo", "60264"],
                ["Keputran", "60265"]
            ]
        },
        "Malang": {
            "Klojen": [
                ["Klojen", "65111"],
                ["Oro-oro Dowo", "65112"],
                ["Kauman", "65119"]
            ],
            "Lowokwaru": [
                ["Dinoyo", "65144"],
                ["Tlogomas", "65144"],
                ["Ketawanggede", "65145"],
                ["Sumbersari", "65145"]
            ]
        }
    },
    "DKI Jakarta": {
        "Jakarta Pusat": {
            "Gambir": [
                ["Gambir", "10110"],
                ["Cideng", "10150"],
                ["Petojo Selatan", "10160"]
            ],
            "Menteng": [
                ["Menteng", "10310"],
                ["Cikini", "10330"]
            ]
        }
    },
    "Jawa Barat": {
        "Bandung": {
            "Coblong": [
                ["Lebak Gede", "40132"],
                ["Dago", "40135"]
            ],
            "Sukajadi": [
                ["Pasteur", "40161"]
            ]
        }
    }
};

const provinsi = document.getElementById("provinsi");
const kota = document.getElementById("kota");
const keyword = document.getElementById("keyword");
const form = document.getElementById("formPencarian");
const reset = document.getElementById("reset");
const hasil = document.getElementById("hasil");
const ringkasan = document.getElementById("ringkasan");

Object.keys(pos).forEach(nama => {
    const option = document.createElement("option");
    option.value = nama;
    option.textContent = nama;
    provinsi.appendChild(option);
});

provinsi.addEventListener("change", function () {
    kota.innerHTML =
        '<option value="">Semua Kota/Kabupaten</option>';
    kota.disabled = !provinsi.value;
    if (provinsi.value) {
        Object.keys(pos[provinsi.value]).forEach(nama => {
            const option = document.createElement("option");
            option.value = nama;
            option.textContent = nama;
            kota.appendChild(option);
        });
    }
    hasil.innerHTML = "";
    ringkasan.textContent =
        "Masukkan kata kunci lalu tekan Cari.";
});

function kumpulkanData() {
    const semua = [];
    for (const [namaProvinsi, daftarKota] of Object.entries(pos)) {
        for (const [namaKota, daftarKecamatan] of Object.entries(daftarKota)) {
            for (const [namaKecamatan, daftarKelurahan] of Object.entries(daftarKecamatan)) {
                for (const [namaKelurahan, kodePos] of daftarKelurahan) {
                    semua.push({
                        provinsi: namaProvinsi,
                        kota: namaKota,
                        kecamatan: namaKecamatan,
                        kelurahan: namaKelurahan,
                        kodePos: kodePos
                    });
                }
            }
        }
    }
    return semua;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const kata = keyword.value.trim().toLowerCase();
    const pilihanProvinsi = provinsi.value;
    const pilihanKota = kota.value;
    if (!kata && !pilihanProvinsi) {
        ringkasan.textContent =
            "Pilih provinsi atau masukkan kata kunci pencarian.";
        hasil.innerHTML = "";
        return;
    }
    const dataHasil = kumpulkanData().filter(item => {
        const cocokProvinsi =
            !pilihanProvinsi || item.provinsi === pilihanProvinsi;
        const cocokKota =
            !pilihanKota || item.kota === pilihanKota;
        const cocokKata =
            !kata ||
            item.kodePos.includes(kata) ||
            item.kelurahan.toLowerCase().includes(kata) ||
            item.kecamatan.toLowerCase().includes(kata) ||
            item.kota.toLowerCase().includes(kata) ||
            item.provinsi.toLowerCase().includes(kata);
        return cocokProvinsi && cocokKota && cocokKata;
    });

    hasil.innerHTML = "";
    ringkasan.textContent =
        `Hasil pencarian ditemukan sebanyak ${dataHasil.length} data.`;
    if (dataHasil.length === 0) {
        hasil.innerHTML =
            '<div class="empty-state">Data tidak ditemukan. Coba kata kunci lain.</div>';
        return;
    }

    dataHasil.forEach(item => {
        const kartu = document.createElement("article");
        kartu.className = "result-card";
        const nama = document.createElement("div");
        nama.className = "result-name";
        nama.textContent = item.kelurahan;
        const detail = document.createElement("div");
        detail.className = "result-details";
        detail.append("Kode pos ");
        const kode = document.createElement("span");
        kode.className = "postal-code";
        kode.textContent = item.kodePos;
        detail.appendChild(kode);
        detail.append(
            ` untuk Kelurahan ${item.kelurahan}, Kecamatan ${item.kecamatan}, ${item.kota}, ${item.provinsi}.`
        );
        kartu.append(nama, detail);
        hasil.appendChild(kartu);
    });
});

reset.addEventListener("click", function () {
    provinsi.value = "";
    kota.innerHTML =
        '<option value="">Pilih Kota/Kabupaten</option>';
    kota.disabled = true;
    keyword.value = "";
    hasil.innerHTML = "";
    ringkasan.textContent =
        "Pilih wilayah atau masukkan kata kunci untuk mencari kode pos.";
});
