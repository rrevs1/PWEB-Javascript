const jenisProduk = document.getElementById("jenisProduk");
const merkProduk = document.getElementById("merkProduk");
const daftarMerk = {
    desktop: ["Acer", "Asus", "HP", "Lenovo"],
    laptop: ["Acer", "Asus", "Dell", "Lenovo"],
    smartphone: ["Apple", "Samsung", "Xiaomi", "Oppo"]
};

jenisProduk.addEventListener("change", function () {
    const jenis = jenisProduk.value;
    merkProduk.innerHTML = '<option value="">Pilih Merk</option>';
    if (jenis !== "") {
        daftarMerk[jenis].forEach(function (merk) {
            const option = document.createElement("option");
            option.value = merk.toLowerCase();
            option.textContent = merk;
            merkProduk.appendChild(option);
        });
    }
});
