// =========================================================
// 1. Lokasi file JSON
// =========================================================
// Website ini tidak memakai database. Data yang mudah berubah
// disimpan di folder `data/`, lalu dibaca oleh JavaScript.
const DATA_FILES = {
  berita: 'data/berita.json',
  pengumuman: 'data/pengumuman.json',
  ppid: 'data/ppid.json'
};

// =========================================================
// 2. Data cadangan jika file JSON gagal dibaca
// =========================================================
// Fallback ini membuat halaman tetap berisi konten dasar saat:
// - dibuka langsung lewat file://
// - JSON sedang salah format
// - koneksi ke file JSON gagal
const FALLBACK_DATA = {
  berita: [
    {
      judul: 'Pembebasan Denda PKB dalam Rangka HUT Provinsi NTT ke-66',
      kategori: 'Pengumuman',
      tanggal: '2026-10-15',
      ikon: 'ti-news',
      tema: 'blue',
      ringkasan: 'Informasi pembebasan denda Pajak Kendaraan Bermotor bagi wajib pajak di Provinsi NTT.'
    },
    {
      judul: 'BAPENDA NTT Raih Penghargaan Terbaik Pengelolaan Aset Daerah 2026',
      kategori: 'Prestasi',
      tanggal: '2026-10-08',
      ikon: 'ti-award',
      tema: 'green',
      ringkasan: 'BPAD NTT memperoleh apresiasi atas peningkatan tata kelola aset daerah.'
    },
    {
      judul: 'Peluncuran Sistem e-Samsat Generasi Baru untuk Kemudahan Wajib Pajak',
      kategori: 'Inovasi',
      tanggal: '2026-10-01',
      ikon: 'ti-device-laptop',
      tema: 'amber',
      ringkasan: 'Layanan digital e-Samsat diperbarui untuk mempermudah pembayaran pajak kendaraan.'
    }
  ],
  pengumuman: [
    { judul: 'Jadwal Pemeliharaan Sistem e-Samsat — 20 Oktober 2026', tanggal: '2026-10-18' },
    { judul: 'Perubahan Jam Pelayanan UPTD Samsat Kupang Selama Masa Libur Nasional', tanggal: '2026-10-12' },
    { judul: 'Rekrutmen Tenaga Pendamping Pajak Daerah Kabupaten/Kota Tahun 2026', tanggal: '2026-10-05' },
    { judul: 'Sosialisasi Peraturan Daerah tentang Pajak Daerah bagi Pelaku Usaha di Kupang', tanggal: '2026-09-28' }
  ],
  ppid: [
    {
      judul: 'Informasi Berkala',
      jenis: 'Kategori PPID',
      deskripsi: 'Profil instansi, program kerja, laporan kinerja, dan informasi publik yang diperbarui secara rutin.',
      link: 'https://drive.google.com/drive/folders/1aLEX6QKuaZ_wDzXQDknX5IgSgD1kMX37?usp=drive_link'
    },
    {
      judul: 'Informasi Setiap Saat',
      jenis: 'Kategori PPID',
      deskripsi: 'Daftar informasi publik, regulasi, dokumen layanan, serta data yang dapat dimohonkan masyarakat.',
      link: ''
    },
    {
      judul: 'Permohonan Informasi',
      jenis: 'Layanan PPID',
      deskripsi: 'Layanan permintaan informasi publik melalui kontak resmi atau datang langsung ke kantor BAPENDA Provinsi NTT.',
      link: ''
    }
  ]
};

// =========================================================
// 3. Helper format tanggal
// =========================================================
// Input dari JSON memakai format YYYY-MM-DD.
// Fungsi ini mengubahnya menjadi format Indonesia,
// contoh: 2026-10-18 -> 18 Oktober 2026.
function formatTanggal(value) {
  if (!value) return '';

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${value}T00:00:00`));
}

// =========================================================
// 4. Helper ambil data JSON
// =========================================================
// `Date.now()` dipakai sebagai cache-buster supaya browser
// membaca file JSON terbaru setelah file diedit.
async function loadJson(path) {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${path}${separator}v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Gagal memuat ${path}`);
  return response.json();
}

// =========================================================
// 5. Helper class warna
// =========================================================
// Contoh:
// getThemeClass('bt', 'blue') menjadi 'btblue'
// getThemeClass('tag-', 'green') menjadi 'tag-green'
function getThemeClass(prefix, theme, fallback = 'blue') {
  return `${prefix}${theme || fallback}`;
}

// =========================================================
// 6. Render daftar berita
// =========================================================
// Fungsi ini mengambil data dari berita.json lalu membuat
// kartu berita ke dalam elemen #beritaGrid di index.html.
function renderBerita(items) {
  const container = document.getElementById('beritaGrid');
  if (!container) return;

  container.innerHTML = items.map((item) => `
    <div class="berita-card">
      <div class="berita-thumb ${getThemeClass('bt', item.tema)}">
        <i class="ti ${item.ikon || 'ti-news'}"></i>
      </div>
      <div class="berita-body">
        <span class="berita-tag ${getThemeClass('tag-', item.tema)}">${item.kategori || 'Berita'}</span>
        <div class="berita-title">${item.judul}</div>
        <p class="berita-summary">${item.ringkasan || ''}</p>
        <div class="berita-date"><i class="ti ti-calendar"></i> ${formatTanggal(item.tanggal)}</div>
      </div>
    </div>
  `).join('');
}

// =========================================================
// 7. Render daftar pengumuman
// =========================================================
// Fungsi ini mengambil data dari pengumuman.json lalu membuat
// daftar pengumuman ke dalam elemen #pengumumanList.
function renderPengumuman(items) {
  const container = document.getElementById('pengumumanList');
  if (!container) return;

  container.innerHTML = items.map((item) => `
    <li class="pgm-item">
      <div class="pgm-dot"></div>
      <div class="pgm-content">
        <div class="pgm-title">${item.judul}</div>
        <div class="pgm-date">${formatTanggal(item.tanggal)}</div>
      </div>
    </li>
  `).join('');
}

// =========================================================
// 8. Render daftar PPID
// =========================================================
// Fungsi ini mengambil data dari ppid.json lalu membuat
// kartu PPID ke dalam elemen #ppidGrid.
// Jika field `link` diisi, tombol Google Drive akan muncul.
function renderPpid(items) {
  const container = document.getElementById('ppidGrid');
  if (!container) return;

  container.innerHTML = items.map((item) => `
    <div class="detail-card">
      <div class="detail-label">${item.jenis || 'PPID'}</div>
      <h3>${item.judul}</h3>
      <p>${item.deskripsi || ''}</p>
      ${item.link ? `<a class="doc-link" href="${item.link}" target="_blank" rel="noopener noreferrer"><i class="ti ti-brand-google-drive"></i> Buka Link Google Drive</a>` : ''}
    </div>
  `).join('');
}

// =========================================================
// 9. Jalankan proses pengisian konten
// =========================================================
// Urutan kerjanya:
// 1. Tampilkan fallback dulu agar halaman tidak kosong.
// 2. Coba ambil data asli dari file JSON.
// 3. Jika berhasil, data fallback diganti dengan data JSON.
// 4. Jika gagal, fallback tetap tampil dan error dicatat di console.
async function hydrateContent() {
  renderBerita(FALLBACK_DATA.berita);
  renderPengumuman(FALLBACK_DATA.pengumuman);
  renderPpid(FALLBACK_DATA.ppid);

  try {
    renderBerita(await loadJson(DATA_FILES.berita));
  } catch (error) {
    console.warn(error);
  }

  try {
    renderPengumuman(await loadJson(DATA_FILES.pengumuman));
  } catch (error) {
    console.warn(error);
  }

  try {
    renderPpid(await loadJson(DATA_FILES.ppid));
  } catch (error) {
    console.warn(error);
  }
}

// =========================================================
// 10. Toggle tabel UPTD
// =========================================================
// Secara awal tabel hanya menampilkan 10 Kepala UPTD.
// Tombol ini membuka/menutup baris 11-22 agar halaman tetap ringkas.
function toggleUptdRows(button) {
  const table = document.querySelector('.uptd-table');
  const isOpen = table.classList.toggle('show-all');

  button.setAttribute('aria-expanded', String(isOpen));
  button.textContent = isOpen ? 'Sembunyikan daftar Kepala UPTD' : 'Lihat semua Kepala UPTD';
}

// =========================================================
// 11. Menu mobile
// =========================================================
// Fungsi ini membuka/menutup menu hamburger pada layar kecil.
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// =========================================================
// 12. Dropdown menu aplikasi
// =========================================================
// `stopPropagation()` mencegah klik tombol Aplikasi ikut
// dianggap sebagai klik di luar dropdown.
function toggleAppMenu(event) {
  event.stopPropagation();
  document.getElementById('appDropdown').classList.toggle('open');
}

// Tutup menu mobile setelah salah satu link diklik.
document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

// Tutup dropdown Aplikasi saat pengguna klik area lain di halaman.
document.addEventListener('click', () => {
  document.getElementById('appDropdown')?.classList.remove('open');
});

// Tutup dropdown Aplikasi setelah salah satu link aplikasi diklik.
document.querySelectorAll('#appMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('appDropdown').classList.remove('open');
  });
});

// Mulai isi konten dinamis ketika script dimuat.
hydrateContent();
