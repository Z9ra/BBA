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

---

## 🌐 Panduan Deployment (Ubuntu 24.04 + Proxmox)

Ikuti langkah-langkah ini untuk mendeploy aplikasi ke server produksi Anda:

### 1. Spesifikasi Server & Database
- **Server OS:** Ubuntu 24.04 LTS (IP: `192.168.2.3`)
- **Host:** Proxmox Virtual Environment (IP: `192.168.2.2`)
- **Database:** MySQL
  - **Nama DB:** `bba_db`
  - **User:** `bba_app`
  - **Password:** `Sitamvan07!`

### 2. Persiapan Lingkungan Server
Jalankan perintah berikut di terminal Ubuntu Anda:

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Instal Node.js (Versi 20.x direkomendasikan)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instal PM2 untuk mengelola proses Node.js
sudo npm install -g pm2
```

### 3. Setup Aplikasi
Kloning repositori atau transfer file proyek Anda ke server, lalu:

```bash
# Masuk ke direktori proyek
cd /path/to/your/project

# Instal dependensi
npm install

# Konfigurasi Environment
# Edit file .env dan sesuaikan DATABASE_URL:
# DATABASE_URL="mysql://bba_app:Sitamvan07!@localhost:3306/bba_db"
nano .env

# Jalankan Prisma Generate & Sync
npx prisma generate
npx prisma db push
```

### 4. Build & Jalankan dengan PM2
```bash
# Build aplikasi untuk produksi
npm run build

# Jalankan dengan PM2
pm2 start npm --name "bba-web" -- start

# Pastikan PM2 berjalan otomatis saat server restart
pm2 save
pm2 startup
```

### 5. Konfigurasi Reverse Proxy (Nginx)
Instal Nginx untuk mengarahkan trafik dari domain ke aplikasi:

```bash
sudo apt install nginx -y

# Buat file konfigurasi baru
sudo nano /etc/nginx/sites-available/bba-web
```

Masukkan konfigurasi berikut:
```nginx
server {
    listen 80;
    server_name domain-anda.com www.domain-anda.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifkan konfigurasi dan restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/bba-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Konfigurasi Domain & SSL (Hostinger)
1. **DNS di Hostinger:**
   - Masuk ke Panel Hostinger.
   - Tambahkan **A Record**: `domain-anda.com` -> `IP Publik Proxmox/Server`.
   - *Catatan:* Jika server berada di belakang router, pastikan **Port Forwarding** (80 & 443) diarahkan dari IP Publik ke IP Lokal Server `192.168.2.3`.

2. **Instal SSL (Certbot):**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d domain-anda.com -d www.domain-anda.com
```

### 7. Troubleshooting
- Cek log aplikasi: `pm2 logs bba-web`
- Cek status Nginx: `sudo systemctl status nginx`
- Pastikan MySQL mengizinkan koneksi dari user `bba_app` di `localhost`.
