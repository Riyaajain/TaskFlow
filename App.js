// File: frontend/src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const AUTH_API = "http://localhost:5000/api/v1/auth";
  const TASK_API = "http://localhost:5000/api/v1/tasks";

  // ================= REGISTER =================
  const register = async () => {
    if (!fullName || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${AUTH_API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password })
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  // ================= LOGIN =================
  const login = async () => {
    if (!email || !password) {
      setMessage("Please fill email and password");
      return;
    }

    try {
      const res = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setMessage("Login successful");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Login failed");
    }
  };

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await fetch(TASK_API, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      setMessage("Failed to load tasks");
    }
  };

  // ================= CREATE TASK =================
  const createTask = async () => {
    if (!title || !description) {
      setMessage("Please fill task title and description");
      return;
    }

    try {
      const res = await fetch(TASK_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });

      const data = await res.json();
      setMessage(data.message);
      fetchTasks();
    } catch (error) {
      setMessage("Failed to create task");
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      await fetch(`${TASK_API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchTasks();
    } catch (error) {
      setMessage("Failed to delete task");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMessage("");
  };

  // ================= LOGIN / REGISTER SCREEN =================
  if (!token) {
    return (
      <div className="auth-card">
        <h2>Register / Login</h2>
        <input
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
        <p
          className={`message ${
            message.toLowerCase().includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      </div>
    );
  }

  // ================= DASHBOARD SCREEN =================
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <h3>Create Task</h3>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createTask}>Create Task</button>

      <h3>Your Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span>
            <strong>{task.title}</strong> - {task.description}
          </span>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}

      <p
        className={`message ${
          message.toLowerCase().includes("success") ? "success" : "error"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

export default App;
