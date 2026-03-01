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
  // state variables
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // function to load tasks from the server
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

  // handler functions for task actions
  
  // adds a new task using the createTask service, then reloads the task list
  async function handleAdd(data) {
    try {
      await createTask(data);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to add task");
    }
  }

  // toggles the completed status of a task using the toggleTask service, then reloads the task list
  async function handleToggle(task) {
    try {
      await toggleTask(task.id);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  // deletes a task after confirming with the user, then reloads the task list
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

  // edits a task using the updateTask service, then reloads the task list
  async function handleEdit(updatedTask) {
    try {
      await updateTask(updatedTask.id, updatedTask);
      await loadTasks();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  // filter tasks based on the selected filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  // render the app UI
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