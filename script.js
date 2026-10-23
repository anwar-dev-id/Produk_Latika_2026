// Ruang Lapor — interaksi formulir dan pembentukan draf email.
// Prototipe ini tidak menyimpan data ke server atau database.

const form = document.getElementById("reportForm");
const category = document.getElementById("category");
const otherCategoryWrap = document.getElementById("otherCategoryWrap");
const anonymous = document.getElementById("anonymous");
const identityFields = document.getElementById("identityFields");
const chronology = document.getElementById("chronology");
const charCount = document.getElementById("charCount");
const statusMessage = document.getElementById("statusMessage");

// Ganti hanya setelah alamat penerima benar-benar diverifikasi.
const EMAIL_TUJUAN = "anonymouuus262@gmail.com";

category.addEventListener("change", () => {
  otherCategoryWrap.hidden = category.value !== "Lainnya";
  document.getElementById("otherCategory").required = category.value === "Lainnya";
});

anonymous.addEventListener("change", () => {
  identityFields.hidden = anonymous.checked;
  if (anonymous.checked) {
    document.getElementById("reporterName").value = "";
    document.getElementById("reporterContact").value = "";
  }
});

chronology.addEventListener("input", () => {
  charCount.textContent = `${chronology.value.length}/4000`;
});

form.addEventListener("reset", () => {
  // Sinkronkan tampilan setelah browser mereset nilai formulir.
  setTimeout(() => {
    otherCategoryWrap.hidden = true;
    identityFields.hidden = true;
    document.getElementById("otherCategory").required = false;
    charCount.textContent = "0/4000";
    statusMessage.textContent = "";
  }, 0);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "";

  if (!form.reportValidity()) return;

  const value = (id) => document.getElementById(id).value.trim();
  const selectedCategory = category.value === "Lainnya"
    ? value("otherCategory")
    : category.value;

  const reportId = `RL-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}`;
  const lines = [
    "DRAF LAPORAN KEJADIAN — PROTOTIPE RUANG LAPOR",
    `Nomor referensi lokal: ${reportId}`,
    "",
    `Klasifikasi: ${selectedCategory}`,
    `Kondisi saat ini: ${value("urgency")}`,
    `Tanggal kejadian: ${value("eventDate") || "Tidak diisi"}`,
    `Perkiraan waktu: ${value("eventTime") || "Tidak diisi"}`,
    `Lokasi: ${value("location")}`,
    "",
    "KRONOLOGI",
    value("chronology"),
    "",
    "PIHAK YANG TERLIBAT",
    value("people") || "Tidak diisi",
    "",
    "SAKSI / INFORMASI PENDUKUNG",
    value("witness") || "Tidak diisi"
  ];

  if (!anonymous.checked) {
    lines.push(
      "",
      "IDENTITAS PELAPOR (OPSIONAL)",
      `Nama: ${value("reporterName") || "Tidak diisi"}`,
      `Kontak: ${value("reporterContact") || "Tidak diisi"}`
    );
  }

  lines.push(
    "",
    "CATATAN: Ini adalah draf dari prototipe edukasi. Draf ini bukan bukti bahwa laporan telah diterima atau tercatat secara resmi."
  );

  const subject = encodeURIComponent(`[DRAF PROTOTIPE] Laporan kejadian — ${selectedCategory}`);
  const body = encodeURIComponent(lines.join("\n"));
  const mailtoUrl = `mailto:${EMAIL_TUJUAN}?subject=${subject}&body=${body}`;

  // Batasi ukuran draf agar tidak terlalu panjang untuk aplikasi email.
  if (mailtoUrl.length > 18000) {
    statusMessage.textContent = "Isi laporan terlalu panjang untuk dibuka dengan mailto. Ringkas kronologi lalu coba lagi.";
    return;
  }

  const confirmed = window.confirm(
    "Kamu akan membuka aplikasi email dengan rincian laporan di dalam draf. " +
    "Email tujuan sementara belum diverifikasi. Periksa penerima dan seluruh isi sebelum mengirim. Lanjutkan?"
  );
  if (!confirmed) return;

  statusMessage.textContent = "Membuka aplikasi email. Periksa alamat tujuan dan isi draf; kamu tetap perlu menekan Kirim di aplikasi email.";
  window.location.href = mailtoUrl;
});
