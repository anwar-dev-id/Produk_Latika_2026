const wisataId = document.body.dataset.wisataId;
const wisata = DAFTAR_WISATA.find((item) => item.id === wisataId);
const main = document.getElementById("detail-content");

function tampilkanTidakDitemukan() {
  main.innerHTML = `
    <section class="not-found">
      <h1>Wisata tidak ditemukan</h1>
      <p>Data untuk halaman ini belum tersedia.</p>
      <a class="button" href="../index.html">Kembali ke beranda</a>
    </section>
  `;
}

function buatElemen(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderDetail() {
  if (!wisata) {
    tampilkanTidakDitemukan();
    return;
  }

  document.title = `${wisata.nama} — AmanDolanan`;

  const back = buatElemen("a", "back-link", "← Kembali ke semua wisata");
  back.href = "../index.html";

  const category = buatElemen("span", "category", wisata.kategori);
  const title = buatElemen("h1", "detail-title", wisata.nama);
  const location = buatElemen("p", "muted", wisata.lokasi);
  const description = buatElemen("p", "detail-description", wisata.deskripsi);

  const image = buatElemen("img", "detail-image");
  image.src = `../${wisata.gambar}`;
  image.alt = wisata.nama;
  image.onerror = () => {
    image.alt = `Foto ${wisata.nama} belum tersedia`;
    image.classList.add("image-missing");
  };

  const article = buatElemen("article");
  article.append(category, title, location, description);

  const panel = buatElemen("aside", "info-panel");
  panel.append(
    buatElemen("h2", "", "Informasi tempat"),
    buatElemen("p", "", wisata.alamat)
  );

  const mapLink = buatElemen("a", "button", "Lihat di Google Maps");
  mapLink.href = wisata.maps;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";

  const actions = buatElemen("div", "detail-actions");
  actions.append(mapLink);
  panel.append(actions);

  const layout = buatElemen("div", "detail-layout");
  const imageColumn = buatElemen("div");
  imageColumn.append(image);
  layout.append(imageColumn, article);

  main.replaceChildren(back, layout, panel);
}

renderDetail();
