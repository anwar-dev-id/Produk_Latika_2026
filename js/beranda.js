const container = document.getElementById("daftar-kartu");
const searchInput = document.getElementById("search-wisata");
const categoryFilter = document.getElementById("filter-kategori");
const countLabel = document.getElementById("jumlah-wisata");
const emptyMessage = document.getElementById("pesan-kosong");

function buatKartu(wisata) {
  const card = document.createElement("article");
  card.className = "tour-card";

  const link = document.createElement("a");
  link.className = "tour-card-link";
  link.href = wisata.detailUrl || `wisata/${wisata.id}.html`;
  link.setAttribute("aria-label", `Lihat detail ${wisata.nama}`);

  const image = document.createElement("img");
  image.className = "tour-image";
  image.src = wisata.gambar;
  image.alt = wisata.nama;
  image.loading = "lazy";
  image.onerror = () => {
    image.alt = `Foto ${wisata.nama} belum tersedia`;
    image.classList.add("image-missing");
  };

  const body = document.createElement("div");
  body.className = "tour-card-body";

  const category = document.createElement("span");
  category.className = "category";
  category.textContent = wisata.kategori;

  const title = document.createElement("h3");
  title.textContent = wisata.nama;

  const location = document.createElement("p");
  location.className = "muted";
  location.textContent = wisata.lokasi;

  const summary = document.createElement("p");
  summary.textContent = wisata.ringkasan;

  body.append(category, title, location, summary);
  link.append(image, body);
  card.append(link);

  return card;
}

function renderWisata() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const hasil = DAFTAR_WISATA.filter((wisata) => {
    const cocokKeyword = [
      wisata.nama,
      wisata.lokasi,
      wisata.kategori,
      wisata.ringkasan
    ].some((value) => value.toLowerCase().includes(keyword));

    const cocokKategori =
      category === "semua" || wisata.kategori === category;

    return cocokKeyword && cocokKategori;
  });

  container.replaceChildren(...hasil.map(buatKartu));
  countLabel.textContent = `${hasil.length} tempat`;
  emptyMessage.hidden = hasil.length > 0;
}

searchInput.addEventListener("input", renderWisata);
categoryFilter.addEventListener("change", renderWisata);

document.getElementById("tahun").textContent = new Date().getFullYear();

renderWisata();
