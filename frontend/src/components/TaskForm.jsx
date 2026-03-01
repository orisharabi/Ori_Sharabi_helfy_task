import { useState } from "react";
import "../styles/task-form.css";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  // function to handle form submission, calls onAdd with the new task data
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("low");
  }

  // render the task form
  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        className="taskForm__input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="taskForm__input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="taskForm__select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <button className="taskForm__button" type="submit">Add</button>
    </form>
  );
}

export default TaskForm;