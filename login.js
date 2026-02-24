const users = [
  { email: "adminkeluarga@gmail.com", password: "1234", role: "admin" },
  { email: "memberkeluarga@gmail.com", password: "1234", role: "member" }
];

document.getElementById("loginForm")
  .addEventListener("submit", function(e) {

  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = users.find(u =>
    u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    document.getElementById("errorMessage")
      .innerText = "Email atau password salah!";
  }
});

// ===== SHOW / HIDE PASSWORD =====
const toggle = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

toggle.addEventListener("click", function() {
  const type =
    passwordInput.getAttribute("type") === "password"
      ? "text"
      : "password";

  passwordInput.setAttribute("type", type);

  this.textContent =
    type === "password" ? "👁" : "🙈";
});