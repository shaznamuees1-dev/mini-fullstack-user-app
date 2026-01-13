// Day 30 – Mini Fullstack Project (Backend)

// Import packages
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data (temporary DB)
let users = [
  { id: 1, name: "Ali", age: 22 },
  { id: 2, name: "Sara", age: 23 }
];

// Test route
app.get("/", (req, res) => {
  res.send("Day 30 Backend is running");
});

// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST new user
app.post("/api/users", (req, res) => {
  const { name, age } = req.body;
  const newUser = { id: Date.now(), name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});


// DELETE user
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
