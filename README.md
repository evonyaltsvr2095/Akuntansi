# Keuangan Keluarga

Website sederhana untuk **manajemen keuangan keluarga**: dashboard pemasukan, pengeluaran, dan laporan transaksi bulanan.

---

## Fitur Utama
- **Login**: validasi email/password, show/hide password, animasi card masuk
- **Dashboard**: saldo, total pemasukan/pengeluaran, input transaksi
- **Laporan**: filter per bulan, tabel transaksi, total & saldo terupdate, reset laporan (admin only)
- **Sidebar & Navigasi**: toggle responsive, auto-close saat klik menu/overlay
- **Role-Based**: menu admin-only

---

## Cara Menjalankan
1. Pastikan semua file berada di satu folder.
2. Buka `login.html` di browser.
3. Login dengan akun contoh:  
   - Admin;
       email: adminkeluarga@gmail.com
       password: 1234
   - Member;
       email: memberkeluarga@gmail.com
       password: 1234
4. Dashboard otomatis muncul setelah login.

> Data transaksi tersimpan di **localStorage** browser.

---

## Teknologi
- HTML5, CSS3, JavaScript
- Google Fonts: `Inter`
- Fully responsive & modern UI (glassmorphism, animasi ringan)
