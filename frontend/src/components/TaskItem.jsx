import { useEffect, useState } from "react";
import "../styles/task-item.css";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // state variables for edit mode and form fields
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  // update form fields when the task prop changes 
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
  }, [task.id, task.title, task.description, task.priority]);

  const badgeClass = `taskItem__badge taskItem__badge--${task.priority}`;

  // function to save edits to the task, calls onEdit with the updated task data
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

  // function to cancel edits and revert form fields to the original task data  
  function cancel() {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setEdit(false);
  }

  // function to delete the task, calls onDelete with the task data
  function remove() {
    onDelete(task);
  }

  // render the task item 
  return (
    <div className="taskItem">
      {!edit ? (
        <>
          <div className="taskItem__header">
            <h3 className="taskItem__title">
              {task.completed ? "✔ " : "✘ "}
              {task.title}
            </h3>

            <span className={badgeClass}>
              {task.priority}
            </span>
          </div>

          {task.description ? <p className="taskItem__description">{task.description}</p> : null}

          <div className="taskItem__actions">
            <button className="taskItem__button" onClick={() => onToggle(task)}>
              {task.completed ? "Undo" : "Done"}
            </button>

            <button className="taskItem__button" onClick={() => setEdit(true)}>
              Edit
            </button>

            <button className="taskItem__button taskItem__button--danger" onClick={remove}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            className="taskItem__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="taskItem__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <select
            className="taskItem__select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <div className="taskItem__actions taskItem__actions--edit">
            <button className="taskItem__button taskItem__button--primary" onClick={save}>
              Save
            </button>
            <button className="taskItem__button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;