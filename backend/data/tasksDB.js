// in-memory "database" i put an example task for teting
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

// DB functions

//returns all tasks
function getAll() {
  return tasks;
}

//creates a new task and adds it to the "database"
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

//finds a task by id and returns it, or null if not found
function findById(id) {
  return tasks.find((t) => t.id === id);
}

//updates a task by id with the provided data, returns the updated task or null if not found
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

//deletes a task by id, returns true if deleted or false if not found
function deleteById(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

//toggles the completed status of a task by id, returns the updated task or null if not found
function toggleById(id) {
  const task = findById(id);
  if (!task) return null;
  task.completed = !task.completed;
  return task;
}

module.exports = { getAll, create, findById, updateById, deleteById, toggleById };