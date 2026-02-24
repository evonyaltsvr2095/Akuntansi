const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) window.location.href = "login.html";

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const overlay = document.getElementById("overlay");

// ===== SIDEBAR =====
function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}
menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Auto close sidebar ketika menu diklik
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', function() {
    closeSidebar(); // fungsi yang sudah kamu punya
  });
});

overlay.addEventListener("click", closeSidebar);

// ===== ROLE ADMIN =====
if (currentUser.role !== "admin") {
  document.querySelectorAll(".admin-only")
    .forEach(el => el.style.display = "none");
}

// ===== NAVIGASI =====
document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const page = this.getAttribute("data-page");
    document.querySelectorAll(".page")
      .forEach(p => p.classList.remove("active"));
    document.getElementById(page)
      .classList.add("active");
    document.getElementById("pageTitle")
      .innerText = this.innerText;
      
    // FORCE CLOSE
    if (window.innerWidth <= 768) {
  closeSidebar();
}
    renderReport();
  });
});

// ===== FORMAT RUPIAH =====
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}

// ===== DATA =====
let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

// ===== UPDATE DASHBOARD =====
function updateDashboard() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(t => {
    if (t.type === "income") totalIncome += t.amount;
    if (t.type === "expense") totalExpense += t.amount;
  });

  document.getElementById("totalIncome")
    .innerText = formatRupiah(totalIncome);

  document.getElementById("totalExpense")
    .innerText = formatRupiah(totalExpense);

  document.getElementById("saldo")
    .innerText = formatRupiah(totalIncome - totalExpense);
}

// ===== TAMBAH PEMASUKAN =====
document.getElementById("incomeForm")
  .addEventListener("submit", function (e) {
  e.preventDefault();
  const desc =
    document.getElementById("incomeDesc").value;
  const amount =
    parseInt(document.getElementById("incomeAmount").value);
  if (amount <= 0) {
    alert("Jumlah harus lebih dari 0");
    return;
  }
  const date =
  document.getElementById("incomeDate").value;
transactions.push({
  type: "income",
  desc,
  amount,
  date
});

  localStorage.setItem("transactions",
    JSON.stringify(transactions));

  this.reset();
  updateDashboard();
});

// ===== TAMBAH PENGELUARAN =====
document.getElementById("expenseForm")
  .addEventListener("submit", function (e) {

  e.preventDefault();
  const desc =
    document.getElementById("expenseDesc").value;
  const amount =
    parseInt(document.getElementById("expenseAmount").value);
  if (amount <= 0) {
    alert("Jumlah harus lebih dari 0");
    return;
  }
  const date =
  document.getElementById("expenseDate").value;
transactions.push({
  type: "expense",
  desc,
  amount,
  date
});

  localStorage.setItem("transactions",
    JSON.stringify(transactions));

  this.reset();
  updateDashboard();
});

// ===== RENDER LAPORAN =====
function renderReport() {
  const filter = document.getElementById("monthFilter").value;
  const tableBody = document.getElementById("reportTableBody");

  tableBody.innerHTML = "";

  let filtered = transactions;

  if (filter !== "all") {
    filtered = transactions.filter(t =>
      t.date && t.date.startsWith(filter)
    );
  }

  let totalIncome = 0;
  let totalExpense = 0;

  filtered.forEach(t => {
    if (t.type === "income") totalIncome += t.amount;
    if (t.type === "expense") totalExpense += t.amount;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td>
        <span class="badge ${t.type === "income" ? "badge-income" : "badge-expense"}">
          ${t.type === "income" ? "Pemasukan" : "Pengeluaran"}
        </span>
      </td>
      <td class="amount-cell">
        ${formatRupiah(t.amount)}
      </td>
    `;

    tableBody.appendChild(row);
  });

  document.getElementById("reportIncome").innerText = formatRupiah(totalIncome);
  document.getElementById("reportExpense").innerText = formatRupiah(totalExpense);
  document.getElementById("reportBalance").innerText =
    formatRupiah(totalIncome - totalExpense);
}

// ===== LOGOUT =====
document.getElementById("logout")
  .addEventListener("click", function () {

  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

const resetBtn = document.getElementById("resetReport");
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    if (currentUser.role !== "admin") {
      alert("Hanya admin yang bisa reset laporan");
      return;
    }
    const konfirmasi = confirm(
      "Yakin ingin menghapus semua transaksi?"
    );
    
    if (!konfirmasi) return;
    transactions = [];
    localStorage.setItem("transactions", JSON.stringify([]));

    updateDashboard();
    renderReport();

    alert("Laporan berhasil direset.");
  });
}
function populateMonthFilter() {
  const select = document.getElementById("monthFilter");
  const months = new Set();

  transactions.forEach(t => {
    if (t.date) {
      const bulan = t.date.slice(0,7); // yyyy-mm
      months.add(bulan);
    }
  });

  select.innerHTML =
    `<option value="all">Semua Bulan</option>`;

  months.forEach(m => {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m;
    select.appendChild(option);
  });
}

// ===== INIT LOAD =====
updateDashboard();
renderReport();
populateMonthFilter();