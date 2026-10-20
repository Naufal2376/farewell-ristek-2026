## Product Requirements Document (PRD): Mini Web Farewell Ristek HIMSI 2026

### 1. Gambaran Umum Proyek (Project Overview)

* **Nama Proyek:** Ristek Wrapped & Farewell Invitation 2026
* **Tujuan:** Menjadi media undangan digital interaktif, tempat pengumpulan *secret appreciation* (pesan anonim) sebelum hari-H, sekaligus arsip kenangan digital bagi staf Departemen Riset dan Teknologi (Ristek) HIMSI Fasilkom Unsri periode 2026.
* **Target Pengguna:** Seluruh pengurus dan staf Departemen Ristek HIMSI 2026.
* **Deadline Peluncuran:** Kamis, 22 Oktober 2026 (H-2 acara agar staf punya waktu mengisi pesan anonim).
* **Platform:** Mobile-first Responsive Web (dioptimalkan untuk layar HP karena link disebar via WhatsApp, namun tetap rapi di layar laptop untuk sesi pembacaan pesan).

---

### 2. Alur Pengguna (User Flow)

1. **Welcome Gate:** Staf membuka link dari grup WA $\rightarrow$ Melihat layar pembuka bertema *retro-tech/coding* $\rightarrow$ Klik tombol **"Buka Undangan"** (memicu musik latar menyala).
2. **Eksplorasi Konten:** Staf melakukan *scroll* ke bawah melihat *Hero & Countdown* $\rightarrow$ *Ristek Wrapped* $\rightarrow$ *Detail Lokasi & Rundown Acara* $\rightarrow$ *Checklist Persiapan (Surat/Kado)* $\rightarrow$ *Galeri Foto*.
3. **Aksi Utama (Call to Action):** Staf mengisi **Form Pesan Anonim** (bisa kirim lebih dari 1 kali untuk orang yang berbeda) & konfirmasi kehadiran (RSVP).
4. **Hari-H (Mode Acara):** Pada sesi jam 11.00 WIB, panitia membuka halaman khusus (`/read-mode`) untuk menampilkan pesan anonim satu per satu secara interaktif.

---

### 3. Spesifikasi Fitur Utama (Functional Requirements)

| Modul / Seksi | Fitur & Komponen | Detail Fungsionalitas |
| --- | --- | --- |
| **1. Splash Screen (Gate)** | • Animasi teks ala coding/terminal<br>

<br>• Tombol "Open Invitation"<br>

<br>• Audio Controller (Play/Mute) | Mengatasi batasan browser yang memblokir *autoplay* musik. Klik tombol pertama langsung memutar BGM (lagu latar) dan membuka halaman utama dengan animasi *fade-in*. |
| **2. Hero & Countdown** | • Judul & Subjudul Acara<br>

<br>• Real-time Countdown Timer | Menghitung mundur waktu secara *real-time* (Hari : Jam : Menit : Detik) menuju **Sabtu, 24 Oktober 2026 pukul 09.00 WIB**. Jika waktu habis, teks berubah menjadi *"The Party is Happening Now! 🫶🏻"*. |
| **3. Ristek Wrapped** | • 3–4 Kartu Statistik Singkat<br>

<br>• Animasi angka (*Counter*) | Menampilkan fakta seru/lucu selama 1 periode di Ristek (contoh: jumlah proker, jumlah jam begadang, dsb) untuk membangun suasana nostalgia sebelum masuk ke detail acara. |
| **4. Info & Rundown** | • Kartu Lokasi + Tombol Maps<br>

<br>• Interactive Timeline Rundown<br>

<br>• Pengingat Bawaan (Checklist) | • Menampilkan jadwal dari jam **09.00 – 15.00 WIB** sesuai susunan acara.<br>

<br>• Menambahkan *badge highlight* khusus pada sesi **11.00 (Secret Appreciation)** dan **13.45 (Tukar Surat/Hadiah)** agar staf tidak lupa menyiapkan surat *desc* atau hadiah kecil dari rumah. |
| **5. Galeri Kenangan** | • Polaroid Photo Carousel / Grid<br>

<br>• Caption singkat per foto | Menampilkan 6–10 foto terbaik/terkocak selama periode 2026 (saat rapat, proker, atau *hangout*) dengan desain bingkai ala foto Polaroid yang miring secara estetik. |
| **6. Secret Appreciation Form** | • Input "Untuk Siapa (To)"<br>

<br>• Input "Pesan/Kesan"<br>

<br>• Tombol Submit + Efek Confetti | • **Tanpa kolom nama pengirim** (100% anonim).<br>

<br>• Kolom *"Untuk Siapa"* bisa berupa dropdown nama-nama anggota Ristek + opsi "Semua Anak Ristek", atau teks bebas.<br>

<br>• Setelah klik kirim, muncul animasi *confetti* dan tombol *"Kirim pesan lagi untuk yang lain"* (mengosongkan form tanpa reload). |
| **7. Live Read Mode (Admin)** | • Halaman khusus (`/present`)<br>

<br>• Fitur Kartu Acak (Shuffle/Next) | Digunakan saat jam 11.00–11.30 WIB. Mengambil data dari database form dan menampilkannya satu per satu di layar dengan ukuran font besar agar seru saat dibacakan bareng-bareng. |

---

### 4. Struktur Data (Database Schema Sederhana)

Karena hanya membutuhkan penyimpanan untuk pesan anonim (dan opsional RSVP), kamu cukup menggunakan 1 tabel di **Supabase**, **Firebase Firestore**, atau **Google Sheets API**:

**Tabel: `secret_messages**`

* `id` (UUID / Auto-increment) — Primary Key
* `recipient` (String / Text) — Nama anggota yang dituju (Contoh: "Kak Budi", "Semua anak Ristek")
* `message` (Text) — Isi pesan bebas
* `is_read` (Boolean, default: `false`) — Penanda apakah pesan sudah dibacakan saat sesi acara
* `created_at` (Timestamp) — Waktu pesan dikirim

---

### 5. Desain Visual & Rekomendasi Tech Stack

Mengingat hari ini sudah Rabu dan acara berlangsung hari Sabtu (sisa waktu sekitar 2–3 hari), pemilihan teknologi harus mengutamakan **kecepatan pembuatan (rapid development)**:

* **Konsep Visual (UI/UX):**
* *Vibe:* Warm Tech Nostalgia (perpaduan elemen IT seperti font *monospace* atau ikon *pixel/code* dengan warna hangat seperti *cream*, biru khas HIMSI/Fasilkom, dan aksen kuning/oranye).


* **Rekomendasi Tech Stack (Pilih yang paling kamu kuasai):**
* **Frontend:** HTML + Tailwind CSS + Vanilla JS (paling cepat untuk satu halaman), atau **React / Next.js** jika ingin komponen yang lebih rapi.
* **Animasi:** `AOS (Animate On Scroll)` untuk efek muncul saat di-scroll, dan `canvas-confetti` untuk efek perayaan saat submit form.
* **Backend / Database Form:**
* *Opsi Tercepat (Tanpa Coding Backend):* Form HTML yang ditembak langsung ke **Google Sheets** menggunakan *Google Apps Script*, lalu saat hari-H data diambil via JSON/CSV.
* *Opsi Modern:* **Supabase** (cukup panggil fungsi `supabase.from('secret_messages').insert(...)` langsung dari frontend).


* **Hosting (Gratis & Cepat):** Vercel, Netlify, atau GitHub Pages.