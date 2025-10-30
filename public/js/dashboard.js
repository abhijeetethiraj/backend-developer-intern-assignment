const api = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) window.location = "login.html";

fetch(`${api}/auth/me`, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("welcome").textContent = `Welcome, ${data.user.name}!`;
  });

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location = "login.html";
});
