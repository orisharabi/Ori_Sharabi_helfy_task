import { useState } from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  function save() {
    if (!title.trim()) return;
    onEdit({ ...task, title, description, priority });
    setEdit(false);
  }

  function cancel() {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setEdit(false);
  }

  function remove() {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;
    onDelete(task);
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      {!edit ? (
        <>
          <h3>
            {task.completed ? "✔ " : "✘ "}
            {task.title}
          </h3>

          {task.description && <p>{task.description}</p>}

          <small>{task.priority}</small>

          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <button onClick={() => onToggle(task)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={remove}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <button onClick={save}>Save</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;