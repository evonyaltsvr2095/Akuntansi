// Simulasi database user
const users = [
  { email: "adminkeluarga@gmail.com", password: "1234", role: "admin" },
  { email: "memberkeluarga@gmail.com", password: "1234", role: "member" }
];

// Simpan transaksi global
if (!localStorage.getItem("transactions")) {
  localStorage.setItem("transactions", JSON.stringify([]));
}