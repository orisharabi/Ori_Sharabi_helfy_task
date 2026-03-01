import { useEffect, useState } from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  // Keep local edit fields in sync if task changes after reload/filter
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
  }, [task.id, task.title, task.description, task.priority]);

  const badgeStyle =
    task.priority === "high"
      ? { background: "#ffd6d6", border: "1px solid #ff8a8a" }
      : task.priority === "medium"
      ? { background: "#fff3cd", border: "1px solid #ffcf66" }
      : { background: "#d4edda", border: "1px solid #7bd389" };

  function save() {
    if (!title.trim()) return;

    onEdit({
      ...task,
      title: title.trim(),
      description,
      priority,
      completed: task.completed,
    });

    setEdit(false);
  }

  function cancel() {
    setTitle(task.title);
    setDescription(task.description || "");
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
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <h3 style={{ margin: 0 }}>
              {task.completed ? "✔ " : "✘ "}
              {task.title}
            </h3>

            <span
              style={{
                ...badgeStyle,
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "12px",
                height: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              {task.priority}
            </span>
          </div>

          {task.description ? <p style={{ marginTop: "8px" }}>{task.description}</p> : null}

          <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
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
            placeholder="Title"
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={save}>Save</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;