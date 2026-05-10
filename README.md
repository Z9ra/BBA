# Website PT. Bersama Berdikari Abadi (BBA)

Website profil perusahaan profesional untuk PT. Bersama Berdikari Abadi, dibangun menggunakan Next.js 16, Prisma ORM, dan MySQL (XAMPP).

## 🚀 Fitur Utama

- **Dynamic CMS**: Edit konten hero, about, dan tampilan background langsung dari Panel Admin.
- **Portfolio Management**: Kelola proyek yang telah selesai dan tampilkan di halaman utama.
- **User Reviews**: Sistem testimoni dengan fitur persetujuan (approval) admin.
- **Contact Form**: Formulir kontak terintegrasi yang menyimpan pesan langsung ke database.
- **Admin Dashboard**: Statistik real-time untuk pengunjung (simulasi), pesan masuk, dan ringkasan konten.
- **Modern UI**: Desain Dark Mode dengan Glassmorphism dan Bootstrap Icons.
- **Keamanan**: Password hashing menggunakan `bcrypt` dan session management yang aman.

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
- [XAMPP](https://www.apachefriends.org/index.html) (Untuk menjalankan MySQL Server)

## 🛠️ Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal:

### 1. Persiapan Database
1. Buka XAMPP Control Panel.
2. Jalankan **Apache** dan **MySQL**.
3. Buka [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
4. Buat database baru dengan nama `bba_db`.

### 2. Instalasi Dependensi
Buka terminal di folder proyek dan jalankan:
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di root direktori (jika belum ada) dan masukkan konfigurasi database:
```env
DATABASE_URL="mysql://root:@localhost:3306/bba_db"
```
*Catatan: Sesuaikan jika username atau password MySQL Anda berbeda.*

### 4. Setup Prisma (Database Sync)
Jalankan perintah berikut untuk menyinkronkan model database dan mengisi data awal:
```bash
# Menghasilkan Prisma Client
npx prisma generate

# Sinkronisasi skema ke MySQL
npx prisma db push

# Mengisi data awal (Admin user, Settings, dsb)
npx prisma db seed
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🔐 Akses Admin

Untuk masuk ke Panel Admin, buka: [http://localhost:3000/login](http://localhost:3000/login)

**Kredensial Default:**
- **Username:** `admin`
- **Password:** `admin123`

> **PENTING:** Segera ganti password atau sesuaikan script seed untuk keamanan produksi.

## 🏗️ Struktur Folder Utama

- `/src/app`: Halaman utama dan routing (App Router).
- `/src/app/admin`: Panel administrasi.
- `/src/components`: Komponen UI yang dapat digunakan kembali.
- `/src/lib`: Konfigurasi library (Prisma client, settings helper).
- `/prisma`: Skema database dan script seeding.
- `/public`: Aset statis (logo, gambar upload).

## 📄 Lisensi

Proyek ini dikembangkan untuk PT. Bersama Berdikari Abadi.
