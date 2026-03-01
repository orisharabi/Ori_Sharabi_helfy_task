let nextId = 1;

const tasks = [
  {
    id: nextId++,
    title: "First task",
    description: "Example task",
    completed: false,
    createdAt: new Date(),
    priority: "medium",
  },
];

function getAll() {
  return tasks;
}

function create({ title, description, priority }) {
  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
    priority,
  };

  tasks.push(newTask);
  return newTask;
}

function findById(id) {
  return tasks.find((t) => t.id === id);
}

function updateById(id, data) {
  const task = findById(id);
  if (!task) return null;

  task.title = data.title;
  task.description = data.description;
  task.priority = data.priority;

  if (typeof data.completed === "boolean") {
    task.completed = data.completed;
  }

  return task;
}

function deleteById(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function toggleById(id) {
  const task = findById(id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

module.exports = { getAll, create, findById, updateById, deleteById, toggleById };