# Website BPAD NTT

Website statis BPAD NTT tanpa database. Konten utama yang sering berubah disimpan di folder `data/` dalam format JSON.

Link GitHub Pages:

https://ihsanmokhsen.github.io/webbpadntt-html/

## Struktur Penting

```text
index.html
css/style.css
js/main.js
data/
  berita.json
  pengumuman.json
  ppid.json
assets/
  hero.png
  hero2.png
  footer.png
  logo.png
```

## Cara Update Berita

Edit file:

```text
data/berita.json
```

Contoh item berita:

```json
{
  "judul": "Peluncuran Layanan Baru BPAD NTT",
  "kategori": "Berita",
  "tanggal": "2026-05-07",
  "ikon": "ti-news",
  "tema": "blue",
  "ringkasan": "BPAD NTT meluncurkan layanan baru untuk memudahkan masyarakat."
}
```

Pilihan `tema` yang tersedia:

```text
blue
green
amber
```

Contoh `ikon` memakai Tabler Icons:

```text
ti-news
ti-award
ti-device-laptop
ti-bell
ti-file-search
```

Format tanggal wajib:

```text
YYYY-MM-DD
```

Contoh:

```text
2026-05-07
```

## Cara Update Pengumuman

Edit file:

```text
data/pengumuman.json
```

Contoh item pengumuman:

```json
{
  "judul": "Perubahan Jam Pelayanan UPTD Samsat Kupang",
  "tanggal": "2026-05-07"
}
```

## Cara Update PPID

Edit file:

```text
data/ppid.json
```

Contoh item PPID tanpa dokumen:

```json
{
  "judul": "Informasi Berkala",
  "jenis": "Kategori PPID",
  "deskripsi": "Profil instansi, program kerja, laporan kinerja, dan informasi publik yang diperbarui secara rutin.",
  "link": ""
}
```

Contoh item PPID dengan link Google Drive:

```json
{
  "judul": "Daftar Informasi Publik",
  "jenis": "Dokumen PPID",
  "deskripsi": "Daftar informasi publik BPAD NTT.",
  "link": "https://drive.google.com/file/d/ID_FILE_GOOGLE_DRIVE/view"
}
```

Jika `link` kosong, tombol dokumen tidak muncul. Jika `link` diisi, tombol `Buka Dokumen` akan muncul otomatis.

## Aturan Penting Saat Edit JSON

1. Setiap item dipisahkan dengan koma.
2. Jangan memakai koma setelah item terakhir.
3. Semua teks key dan value harus memakai tanda petik dua.
4. Format tanggal gunakan `YYYY-MM-DD`.
5. Setelah edit, cek JSON agar tidak error.

Contoh benar:

```json
[
  {
    "judul": "Berita Pertama",
    "tanggal": "2026-05-07"
  },
  {
    "judul": "Berita Kedua",
    "tanggal": "2026-05-08"
  }
]
```

Contoh salah:

```json
[
  {
    "judul": "Berita Pertama",
    "tanggal": "2026-05-07",
  }
]
```

Kesalahan di atas karena ada koma setelah `"tanggal"` pada item terakhir.

## Cara Cek Lokal

Jalankan server lokal dari folder project:

```bash
python3 -m http.server 8080
```

Buka:

```text
http://localhost:8080/
```

Jangan buka langsung dengan `file://` untuk mengecek data JSON, karena browser bisa memblokir pembacaan file JSON lokal.

## Cara Push Update ke GitHub Pages

Setelah edit file JSON:

```bash
git status
git add .
git commit -m "Update konten website"
git push origin main
git push origin main:gh-pages
```

Setelah push, tunggu beberapa saat. GitHub Pages biasanya butuh beberapa detik sampai beberapa menit untuk menampilkan perubahan.

## Catatan Production

Website ini tidak memakai database. Untuk update konten, cukup ubah file JSON dan push ke GitHub. Ini aman untuk tahap production sederhana karena tidak ada login admin, server backend, atau kredensial database yang perlu dikelola.
