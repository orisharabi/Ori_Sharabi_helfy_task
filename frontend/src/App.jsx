import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import {
  getTasks,
  toggleTask,
  deleteTask,
  updateTask,
  createTask,
} from "./services/tasksService";

import "./styles/app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAdd(data) {
    try {
      await createTask(data);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  }

  async function handleToggle(task) {
    try {
      await toggleTask(task.id);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  async function handleDelete(task) {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await deleteTask(task.id);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  }

  async function handleEdit(updatedTask) {
    try {
      await updateTask(updatedTask.id, updatedTask);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="page">
      <h1>Task Manager</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="errorText">{error}</p>}

      <TaskForm onAdd={handleAdd} />

      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("pending")}
          style={{ fontWeight: filter === "pending" ? "bold" : "normal" }}
        >
          Pending
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;