const API_URL = "http://localhost:3000/api/users";

console.log("✅ app.js loaded");

// Load users (GET)
async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {
      const li = document.createElement("li");
      li.innerText = `${user.name} (${user.age})`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("GET failed:", err);
  }
}

// Add user (POST)
async function addUser(event) {
  event.preventDefault(); // ⛔ stop page reload
  console.log("🟢 Add User clicked");

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  console.log("🟡 Sending:", name, age);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, age })
    });

    console.log("🔵 POST status:", res.status);

    // reload list
    loadUsers();

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
  } catch (err) {
    console.error("POST failed:", err);
  }
}

// Bind form submit
document
  .getElementById("userForm")
  .addEventListener("submit", addUser);

// Initial load
loadUsers();
