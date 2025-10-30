const api = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const list = document.getElementById("taskList");
const form = document.getElementById("taskForm");

if (!token) window.location = "login.html";

async function loadTasks() {
  const res = await fetch(`${api}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  list.innerHTML = "";
  data.forEach((t) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center border p-2 rounded";
    li.innerHTML = `
      <span>${t.title}</span>
      <button onclick="deleteTask('${t._id}')" class="text-red-500 hover:underline">Delete</button>
    `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  await fetch(`${api}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ title }),
  });
  document.getElementById("title").value = "";
  loadTasks();
});

async function deleteTask(id) {
  await fetch(`${api}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  loadTasks();
}

loadTasks();
