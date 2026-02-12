const db = require("../config/db");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    await db.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, req.user.id]
    );

    res.status(201).json({ message: "Task created successfully" });
    if (!title || title.trim() === "") {
  return res.status(400).json({ message: "Title is required" });
}

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    let query = "SELECT * FROM tasks";

    if (req.user.role !== "admin") {
      query += " WHERE user_id = ?";
      const [tasks] = await db.query(query, [req.user.id]);
      return res.status(200).json(tasks);
    }

    const [tasks] = await db.query(query);
    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (req.user.role !== "admin") {
      const [task] = await db.query(
        "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
        [id, req.user.id]
      );

      if (task.length === 0) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    await db.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );

    res.status(200).json({ message: "Task updated successfully" });
    if (!title || title.trim() === "") {
  return res.status(400).json({ message: "Title is required" });
}

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      const [task] = await db.query(
        "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
        [id, req.user.id]
      );

      if (task.length === 0) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
