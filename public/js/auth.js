// ✅ Backend base URL
const api = "http://localhost:5000/api";

// 🧾 REGISTER
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input values safely
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  // Send register request
  const res = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    }),
  });

  const data = await res.json();
  alert(data.message || "Registered!");
  if (res.ok) window.location = "login.html";
});

// 🔐 LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  const res = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    window.location = "dashboard.html";
  } else {
    alert(data.message || "Invalid credentials");
  }
});
