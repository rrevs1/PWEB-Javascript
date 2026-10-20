const daftarNama = [
    "Sanchia Revana Koasasi", "Ryul", "Alya Putri"
];

const dataDosen = {
    "Pemrograman Web": "Fajar Baskoro, S.Kom., M.T.",
    "Jaringan Komputer": "Royyana Muslim Ijtihadie, S.Kom., M.Kom., Ph.D.",
    "Kecerdasan Artifisial": "Prof. Dr. Eng. Chastine Fatichah, S.Kom., M.Kom.",
    "Teori Graf": "Victor (nama lengkap belum dikonfirmasi)"
};

const form = document.getElementById("regForm");
const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const matkulSelect = document.getElementById("matkul");
const dosenInput = document.getElementById("dosen");
const suggestions = document.getElementById("suggestions");
const hasil = document.getElementById("hasil");

for (const matkul in dataDosen) {
    matkulSelect.add(new Option(matkul, matkul));
}

matkulSelect.addEventListener("change", function () {
    dosenInput.value = dataDosen[matkulSelect.value] || "";
    hapusError("matkul", "matkul-error");
});

namaInput.addEventListener("input", function () {
    const kataKunci = namaInput.value.trim().toLowerCase();
    suggestions.innerHTML = "";

    if (kataKunci === "") {
        suggestions.style.display = "none";
        return;
    }

    const hasilNama = daftarNama
        .filter(function (nama) {
            return nama.toLowerCase().includes(kataKunci);
        })
        .sort(function (a, b) {
            const aAwal = a.toLowerCase().startsWith(kataKunci);
            const bAwal = b.toLowerCase().startsWith(kataKunci);
            if (aAwal && !bAwal) return -1;
            if (!aAwal && bAwal) return 1;
            return a.localeCompare(b);
        })
        .slice(0, 6);

    if (hasilNama.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    hasilNama.forEach(function (nama) {
        const item = document.createElement("div");
        item.textContent = nama;
        item.addEventListener("click", function () {
            namaInput.value = nama;
            suggestions.style.display = "none";
            hapusError("nama", "nama-error");
        });
        suggestions.appendChild(item);
    });
    suggestions.style.display = "block";
});

document.addEventListener("click", function (event) {
    if (!event.target.closest(".field")) {
        suggestions.style.display = "none";
    }
});

function hapusError(idInput, idError) {
    document.getElementById(idInput).classList.remove("invalid");
    document.getElementById(idError).textContent = "";
}

namaInput.addEventListener("input", function () {
    hapusError("nama", "nama-error");
});

nimInput.addEventListener("input", function () {
    nimInput.value = nimInput.value.replace(/\D/g, "").slice(0, 10);
    hapusError("nim", "nim-error");
});

document.getElementById("agree").addEventListener("change", function () {
    document.getElementById("agree-error").textContent = "";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = namaInput.value.trim();
    const nim = nimInput.value.trim();
    const matkul = matkulSelect.value;
    const setuju = document.getElementById("agree").checked;
    let valid = true;
    document.querySelectorAll(".error").forEach(function (pesan) {
        pesan.textContent = "";
    });
    document.querySelectorAll(".invalid").forEach(function (input) {
        input.classList.remove("invalid");
    });

    if (nama === "" || /\d/.test(nama)) {
        document.getElementById("nama-error").textContent =
            "Nama wajib diisi dan tidak boleh mengandung angka.";
        namaInput.classList.add("invalid");
        valid = false;
    }

    if (!/^\d{10}$/.test(nim)) {
        document.getElementById("nim-error").textContent =
            "NIM harus terdiri dari tepat 10 digit angka.";
        nimInput.classList.add("invalid");
        valid = false;
    }

    if (matkul === "") {
        document.getElementById("matkul-error").textContent =
            "Silakan pilih mata kuliah.";
        matkulSelect.classList.add("invalid");
        valid = false;
    }

    if (!setuju) {
        document.getElementById("agree-error").textContent =
            "Centang persetujuan terlebih dahulu.";
        valid = false;
    }

    if (!valid) {
        hasil.hidden = true;
        return;
    }
    hasil.innerHTML = "";
    const judul = document.createElement("h2");
    judul.textContent = "Registrasi Berhasil!";
    hasil.appendChild(judul);
    const data = [
        ["Nama", nama],
        ["NIM", nim],
        ["Mata Kuliah", matkul],
        ["Dosen", dataDosen[matkul]]
    ];

    data.forEach(function (item) {
        const baris = document.createElement("p");
        const label = document.createElement("strong");
        label.textContent = item[0] + ": ";
        baris.appendChild(label);
        baris.appendChild(document.createTextNode(item[1]));
        hasil.appendChild(baris);
    });
    hasil.hidden = false;
});

form.addEventListener("reset", function () {
    setTimeout(function () {
        document.querySelectorAll(".error").forEach(function (pesan) {
            pesan.textContent = "";
        });
        document.querySelectorAll(".invalid").forEach(function (input) {
            input.classList.remove("invalid");
        });
        dosenInput.value = "";
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        hasil.innerHTML = "";
        hasil.hidden = true;
    }, 0);
});
