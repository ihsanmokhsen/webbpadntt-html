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
      link: 'https://forms.gle/sLJVuwdGrZnQTJ3N7'
    }
  ]
};

// =========================================================
// 3. Data pejabat UPTD
// =========================================================
// Data ini dipakai untuk popup saat nama UPTD di tabel diklik.
// Key harus cocok dengan teks nama wilayah di tabel UPTD.
const UPTD_OFFICIALS = {
  'Kota Kupang': {
    title: 'UPTD Kota Kupang',
    officials: [
      { name: 'Remmy Christian Pah, S.STP, M.Si', role: 'Kepala UPTD Penda Wil. Kota Kupang' },
      { name: '-', role: 'KTU UPTD Penda Wil. Kota Kupang' },
      { name: 'Skolastika G. Maing, S.Sos, M.H.I', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kota Kupang' },
      { name: "Jonny Alfreth Do'o, S.Sos, MM", role: 'Kasie Verifikasi UPTD Penda Wil. Kota Kupang' }
    ]
  },
  'Kab. Kupang': {
    title: 'UPTD Kab. Kupang',
    officials: [
      { name: 'Abdulgani R. Tokan, SE', role: 'Kepala UPTD Penda Wilayah Kab. Kupang' },
      { name: 'Christian Hortono Mamulak, SH', role: 'KTU UPTD Penda Wil. Kab. Kupang' },
      { name: 'Samuel Ndun, SE', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Kupang' },
      { name: 'Mage Raymond Uly, S.Sos', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Kupang' }
    ]
  },
  'Kab. Timor Tengah Selatan': {
    title: 'UPTD Timor Tengah Selatan',
    officials: [
      { name: 'Fredik Leky, S.IP, M.Si', role: 'Kepala UPTD Penda Wil. Kab. TTS' },
      { name: 'Petrus Naldino Nias, S.STP, MM', role: 'KTU UPTD Penda Wil. Kab. TTS' },
      { name: 'Yuliana Maria Babys, S.Kom', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. TTS' },
      { name: 'Belandina Y. M. Nalle, SH', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. TTS' }
    ]
  },
  'Kab. Timor Tengah Utara': {
    title: 'UPTD Timor Tengah Utara',
    officials: [
      { name: 'Alberd E. Pairikas, SE, M.Si', role: 'Kepala UPTD Penda Wil. Kab. TTU' },
      { name: 'Bernadetha Salem, SH', role: 'KTU UPTD Penda Wil. Kab. TTU' },
      { name: 'Putu P. A. Sujana, S.Si.T', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. TTU' },
      { name: 'Yohanes Jago, S.Sos', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. TTU' }
    ]
  },
  'Kab. Belu': {
    title: 'UPTD Belu',
    officials: [
      { name: 'Stanis Laus Moat, S.STP, M.Si', role: 'Kepala UPTD Penda Wil. Kab. Belu' },
      { name: 'Crispim Pereira Leo Soro, S.STP, M.M', role: 'KTU UPTD Penda Wil. Kab. Belu' },
      { name: 'Margaritha Kolo Tadoe, SP', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Belu' },
      { name: 'Zaitun Harun, S.Kom', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Belu' }
    ]
  },
  'Kab. Rote Ndao': {
    title: 'UPTD Rote Ndao',
    officials: [
      { name: 'Petrus A. Manehat, S.Sos', role: 'Kepala UPTD Penda Wil. Kab. Rote Ndao' },
      { name: 'Apris Imanuel Suan, S.Sos', role: 'KTU UPTD Penda Wil. Kab. Rote Ndao' },
      { name: 'Ganna Dedo Ngara, S.Sos', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Rote Ndao' },
      { name: 'Yohanis Talan, S.IP', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Rote Ndao' }
    ]
  },
  'Kab. Flores Timur': {
    title: 'UPTD Flotim',
    officials: [
      { name: 'Yohanes Boro Hali, SE', role: 'Kepala UPTD Penda Wilayah Kab. Flotim' },
      { name: 'Yeremias Padja, S.Sos', role: 'KTU UPTD Penda Wil. Kab. Flotim' },
      { name: 'Fransiskus X. Seli Tokan, SE', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Flotim' },
      { name: 'Juniati Maria Maumabe, S.STP', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Flotim' }
    ]
  },
  'Kab. Lembata': {
    title: 'UPTD Lembata',
    officials: [
      { name: 'Oskar Ola Samon, S.Sos', role: 'Kepala UPTD Penda Wil. Kab. Lembata' },
      { name: 'Clementinus Berino, S.Ag', role: 'KTU UPTD Penda Wil. Kab. Lembata' },
      { name: 'Mahyudin Rais, SE', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Lembata' },
      { name: 'Paulina Pantaleon, S.Pt', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Lembata' }
    ]
  },
  'Kab. Sikka': {
    title: 'UPTD Sikka',
    officials: [
      { name: 'Maria Wilfrida Basilika, SE', role: 'Kepala UPTD Penda Wilayah Kab. Sikka' },
      { name: 'Andreas Dolu, S.ST', role: 'KTU UPTD Penda Wil. Kab. Sikka' },
      { name: 'Bibiana Bertarika Finolince, S.Kom', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Sikka' },
      { name: 'Josephine Natalia Seran, SE', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Sikka' }
    ]
  },
  'Kab. Ende': {
    title: 'UPTD Ende',
    officials: [
      { name: 'Alponsus Yuli, SE', role: 'Kepala UPTD Penda Wilayah Kab. Ende' },
      { name: 'Vinsensius Ferdinand Sare, S.Fil', role: 'KTU UPTD Penda Wil. Kab. Ende' },
      { name: 'Emanuel Laga, S.Hut', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Ende' },
      { name: 'Leonemsius Sedu, S.Pi', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Ende' }
    ]
  },
  'Kab. Nagekeo': {
    title: 'UPTD Nagekeo',
    officials: [
      { name: 'Yoseph Marianus Yegho, SE', role: 'Kepala UPTD Penda Wil. Kab. Nagekeo' },
      { name: 'Arnoldus Gradus Wudalina, S.STP', role: 'Kasubag TU UPTD Penda Wil. Kab. Nagekeo' },
      { name: 'Yasintha K. Kowe Toa, S.Hut', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Nagekeo' },
      { name: 'Yohanes Paulus Mite, SP', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Nagekeo' }
    ]
  },
  'Kab. Ngada': {
    title: 'UPTD Ngada',
    officials: [
      { name: 'Anna Maria Belang, SP', role: 'Kepala UPTD Penda Wil. Kab. Ngada' },
      { name: 'Yovita Harsiani Almi, SE', role: 'KTU UPTD Penda Wil. Kab. Ngada' },
      { name: 'Maria Goreti Meo, SE', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Ngada' },
      { name: '-', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Ngada' }
    ]
  },
  'Kab. Manggarai Timur': {
    title: 'UPTD Manggarai Timur',
    officials: [
      { name: 'Stanislaus K. Jawan, S.Sos, M.AP', role: 'Kepala UPTD Penda Wilayah Kab. Manggarai Timur' },
      { name: 'Mariana Ch. P. W. Kellen, SE', role: 'KTU UPTD Penda Wil. Kab. Matim' },
      { name: 'Fransiskus Siap, S.IP', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Matim' },
      { name: '-', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Manggarai Timur' }
    ]
  },
  'Kab. Manggarai Barat': {
    title: 'UPTD Manggarai Barat',
    officials: [
      { name: 'Martianus T.A. Pranda, S.Sos, M.Si', role: 'Kepala UPTD Penda Wilayah Kab. Manggarai Barat' },
      { name: 'Benediktus Gempur, SE', role: 'KTU UPTD Penda Wil. Kab. Mabar' },
      { name: 'Frederikus E. Daeng, S.STP', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Mabar' },
      { name: 'Sanusi, SE', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Manggarai Barat' }
    ]
  },
  'Kab. Manggarai': {
    title: 'UPTD Manggarai',
    officials: [
      { name: 'Lorensius Agung, SP', role: 'Kepala UPTD Penda Wil. Kab. Manggarai' },
      { name: 'Sebastianus Nggudari Jama', role: 'KTU UPTD Penda Wil. Kab. Manggarai' },
      { name: 'Maria Rosa Mstyca Snak, SE', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Manggarai' },
      { name: 'Anita Primadewi Gael, SE', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Manggarai' }
    ]
  },
  'Kab. Sumba Timur': {
    title: 'UPTD Sumba Timur',
    officials: [
      { name: 'Denny Semuel Sandy, SH', role: 'Kepala UPTD Penda Wil. Kab. Sumba Timur' },
      { name: 'Dorince Ina Bili, S.Pd', role: 'Kasubag TU UPTD Penda Wil. Kab. Sumba Timur' },
      { name: 'Elisabeth Kahi Oy, SH', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Sumba Timur' },
      { name: 'Rosalin A. Radjah Gah, A.Md', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Sumba Timur' }
    ]
  },
  'Kab. Sumba Tengah': {
    title: 'UPTD Sumba Tengah',
    officials: [
      { name: 'Yohanis Umbu Sakayu, S.Sos', role: 'Kepala UPTD Penda Wilayah Kab. Sumba Tengah' },
      { name: 'Kristianus Roni Tobu, ST', role: 'KTU UPTD Penda Wil. Kab. Sumba Tengah' },
      { name: 'Agus Umbu Tauwa, SH', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Sumba Tengah' },
      { name: 'Antonius Wilhelmus Leu, SE', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Sumba Tengah' }
    ]
  },
  'Kab. Sumba Barat': {
    title: 'UPTD Sumba Barat',
    officials: [
      { name: 'Kristoforus Jogo Ja, SH', role: 'Kepala UPTD Penda Wilayah Kab. Sumba Barat' },
      { name: 'Christina Lodong, SH', role: 'KTU UPTD Penda Wil. Kab. Sumba Barat' },
      { name: 'Maria L.E. Betris Noemay, A.Md', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Sumba Barat' },
      { name: 'Yosef Tamu Bapa Dolo, S.STP', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Sumba Barat' }
    ]
  },
  'Kab. Sumba Barat Daya': {
    title: 'UPTD Sumba Barat Daya',
    officials: [
      { name: 'Ermelinda P.R. Bita, S.IP, M.Si', role: 'Kepala UPTD Penda Wil. Kab. SBD' },
      { name: 'Hermanus Mete, S.Hut', role: 'KTU UPTD Penda Wil. Kab. SBD' },
      { name: 'Pegiar Efedi J. Mulik, S.Sos', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Sumba Barat Daya' },
      { name: 'Josefus B. Patnono, S.Sos', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. SBD' }
    ]
  },
  'Kab. Alor': {
    title: 'UPTD Alor',
    officials: [
      { name: 'Cornelis Daniel Adoe, S.Sos', role: 'Kepala UPTD Penda Wil. Kab. Alor' },
      { name: 'Dewi Setiawati Moka, S.STP', role: 'KTU UPTD Penda Wil. Kab. Alor' },
      { name: 'Ramlah H. Nahrawi, SE, MM', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Alor' },
      { name: 'Herlina K. Peringsy, SE', role: 'Kasie Verifikasi UPTD Penda Wil. Kab. Alor' }
    ]
  },
  'Kab. Malaka': {
    title: 'UPTD Malaka',
    officials: [
      { name: 'Clara Maria F. Bano, SE', role: 'Kepala UPTD Penda Wilayah Kab. Malaka' },
      { name: 'Chrisantus Reynaldi Diding, S.STP', role: 'KTU UPTD Penda Wil. Kab. Malaka' },
      { name: 'Philipus Lip Tatut, S.Fil', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Malaka' },
      { name: 'Francisco M. Cipriano, SH', role: 'Kasi Verifikasi UPTD Pendapatan Daerah Wil. Kab. Malaka di Betun' }
    ]
  },
  'Kab. Sabu Raijua': {
    title: 'UPTD Sabu Raijua',
    officials: [
      { name: 'Marcurius Heraclitus Bani Haba, SH', role: 'Kepala UPTD Penda Wil. Kab. Sabu Raijua' },
      { name: 'Ferdy Alfonsus Pajikana, SE', role: 'KTU UPTD Penda Wil. Kab. Sabu Raijua' },
      { name: 'Johanis Bunga, ST', role: 'Kasie Penetapan & Penagihan UPTD Penda Wil. Kab. Sabu Raijua' },
      { name: 'Dance Hawula, SH', role: 'Kasi Verifikasi UPTD Penda Wil. Kab. Sabu Raijua' }
    ]
  }
};

// =========================================================
// 4. Helper format tanggal
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
// 5. Helper ambil data JSON
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
// 6. Helper class warna
// =========================================================
// Contoh:
// getThemeClass('bt', 'blue') menjadi 'btblue'
// getThemeClass('tag-', 'green') menjadi 'tag-green'
function getThemeClass(prefix, theme, fallback = 'blue') {
  return `${prefix}${theme || fallback}`;
}

// =========================================================
// 7. Render daftar berita
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
// 8. Render daftar pengumuman
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
// 9. Render daftar PPID
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
      ${item.link ? `<a class="doc-link ppid-link" href="${item.link}" target="_blank" rel="noopener noreferrer"><i class="ti ${item.judul === 'Permohonan Informasi' ? 'ti-forms' : 'ti-brand-google-drive'}"></i> ${item.judul === 'Permohonan Informasi' ? 'Isi Formulir' : 'Buka Link Google Drive'}</a>` : ''}
    </div>
  `).join('');
}

// =========================================================
// 10. Jalankan proses pengisian konten
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
// 11. Popup konfirmasi link PPID
// =========================================================
// Link PPID diarahkan ke luar website. Popup ini memberi tahu
// pengguna tujuan link sebelum membuka Google Drive atau Google Form.
function buildPpidLinkModal() {
  const modal = document.createElement('div');
  modal.className = 'ppid-link-modal';
  modal.id = 'ppidLinkModal';
  modal.setAttribute('aria-hidden', 'true');

  const card = document.createElement('div');
  card.className = 'ppid-link-modal-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');
  card.setAttribute('aria-labelledby', 'ppidLinkModalTitle');

  const icon = document.createElement('div');
  icon.className = 'ppid-link-modal-icon';
  icon.innerHTML = '<i class="ti ti-external-link"></i>';

  const title = document.createElement('h3');
  title.id = 'ppidLinkModalTitle';

  const message = document.createElement('p');
  message.id = 'ppidLinkModalMessage';

  const actions = document.createElement('div');
  actions.className = 'ppid-link-modal-actions';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'ppid-link-cancel';
  cancelButton.type = 'button';
  cancelButton.textContent = 'Batal';
  cancelButton.addEventListener('click', closePpidLinkModal);

  const continueButton = document.createElement('button');
  continueButton.className = 'ppid-link-continue';
  continueButton.type = 'button';
  continueButton.textContent = 'Lanjutkan';
  continueButton.addEventListener('click', () => {
    const url = continueButton.dataset.url;
    closePpidLinkModal();
    if (url) window.open(url, '_blank', 'noopener');
  });

  actions.append(cancelButton, continueButton);
  card.append(icon, title, message, actions);
  modal.append(card);
  document.body.appendChild(modal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closePpidLinkModal();
  });

  return modal;
}

function openPpidLinkModal(link) {
  const card = link.closest('.detail-card');
  const itemTitle = card?.querySelector('h3')?.textContent?.trim() || 'Informasi PPID';
  const itemDescription = card?.querySelector('p')?.textContent?.trim() || 'dokumen atau layanan informasi publik BPAD NTT';
  const isForm = link.textContent.includes('Isi Formulir') || link.href.includes('forms.gle');
  const modal = document.getElementById('ppidLinkModal') || buildPpidLinkModal();
  const title = modal.querySelector('#ppidLinkModalTitle');
  const message = modal.querySelector('#ppidLinkModalMessage');
  const continueButton = modal.querySelector('.ppid-link-continue');

  title.textContent = isForm ? 'Isi Formulir Permohonan Informasi' : `Buka ${itemTitle}`;
  message.textContent = isForm
    ? 'Anda akan dialihkan untuk mengisi formulir Permohonan Informasi. Pastikan data yang diisi benar sebelum formulir dikirim.'
    : `Anda akan dialihkan ke Google Drive yang berisi ${itemTitle.toLowerCase()}: ${itemDescription}`;
  continueButton.dataset.url = link.href;
  continueButton.textContent = isForm ? 'Isi Formulir' : 'Buka Google Drive';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closePpidLinkModal() {
  const modal = document.getElementById('ppidLinkModal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('.ppid-link');
  if (!link) return;

  event.preventDefault();
  openPpidLinkModal(link);
});

// =========================================================
// 12. Popup pejabat UPTD
// =========================================================
// Nama UPTD di tabel dibuat bisa diklik. Saat diklik, detail
// pejabat UPTD akan muncul di modal tanpa pindah halaman.
function findUptdKey(text) {
  return Object.keys(UPTD_OFFICIALS)
    .sort((a, b) => b.length - a.length)
    .find((key) => text.includes(key));
}

function buildUptdModal() {
  const modal = document.createElement('div');
  modal.className = 'uptd-modal';
  modal.id = 'uptdModal';
  modal.setAttribute('aria-hidden', 'true');

  const card = document.createElement('div');
  card.className = 'uptd-modal-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-modal', 'true');
  card.setAttribute('aria-labelledby', 'uptdModalTitle');

  const head = document.createElement('div');
  head.className = 'uptd-modal-head';

  const titleWrap = document.createElement('div');
  const label = document.createElement('div');
  label.className = 'uptd-modal-label';
  label.textContent = 'Detail Pejabat UPTD';

  const title = document.createElement('h3');
  title.id = 'uptdModalTitle';

  const closeButton = document.createElement('button');
  closeButton.className = 'uptd-modal-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Tutup popup UPTD');
  closeButton.innerHTML = '<i class="ti ti-x"></i>';
  closeButton.addEventListener('click', closeUptdModal);

  const list = document.createElement('ol');
  list.className = 'uptd-official-list';
  list.id = 'uptdOfficialList';

  titleWrap.append(label, title);
  head.append(titleWrap, closeButton);
  card.append(head, list);
  modal.append(card);
  document.body.appendChild(modal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeUptdModal();
  });

  return modal;
}

function openUptdModal(key) {
  const data = UPTD_OFFICIALS[key];
  if (!data) return;

  const modal = document.getElementById('uptdModal') || buildUptdModal();
  const title = modal.querySelector('#uptdModalTitle');
  const list = modal.querySelector('#uptdOfficialList');

  title.textContent = data.title;
  list.innerHTML = '';

  data.officials.forEach((official, index) => {
    const item = document.createElement('li');
    const number = document.createElement('span');
    const content = document.createElement('div');
    const name = document.createElement('div');
    const role = document.createElement('div');

    number.className = 'uptd-official-no';
    number.textContent = index + 1;
    name.className = 'uptd-official-name';
    name.textContent = official.name;
    role.className = 'uptd-official-role';
    role.textContent = official.role;

    content.append(name, role);
    item.append(number, content);
    list.appendChild(item);
  });

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeUptdModal() {
  const modal = document.getElementById('uptdModal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initUptdPopup() {
  document.querySelectorAll('.uptd-table tbody tr').forEach((row) => {
    const uptdCell = row.children[1];
    if (!uptdCell || uptdCell.querySelector('.uptd-name-btn')) return;

    const key = findUptdKey(uptdCell.textContent);
    if (!key) return;

    row.classList.add('uptd-clickable-row');
    row.title = 'Klik untuk melihat detail pejabat UPTD';
    row.addEventListener('click', (event) => {
      if (event.target.closest('.uptd-name-btn')) return;
      openUptdModal(key);
    });

    const button = document.createElement('button');
    button.className = 'uptd-name-btn';
    button.type = 'button';
    button.textContent = uptdCell.textContent;
    button.addEventListener('click', () => openUptdModal(key));

    uptdCell.textContent = '';
    uptdCell.appendChild(button);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeUptdModal();
    closePpidLinkModal();
  }
});

// =========================================================
// 13. Toggle tabel UPTD
// =========================================================
// Secara awal tabel hanya menampilkan 10 Kepala UPTD.
// Tombol ini membuka/menutup baris 11-22 agar halaman tetap ringkas.
function toggleUptdRows(button) {
  const table = document.querySelector('.uptd-table');
  const isOpen = table.classList.toggle('show-all');

  button.setAttribute('aria-expanded', String(isOpen));
  button.textContent = isOpen ? 'Sembunyikan daftar UPTD' : 'Lihat semua UPTD';
}

// =========================================================
// 14. Menu mobile
// =========================================================
// Fungsi ini membuka/menutup menu hamburger pada layar kecil.
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// =========================================================
// 15. Dropdown menu aplikasi
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
initUptdPopup();
