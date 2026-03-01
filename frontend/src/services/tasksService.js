const BASE_URL = "/api/tasks";

async function handleResponse(res) {
  if (!res.ok) {
    let message = "Request failed";
    try {
      const data = await res.json();
      if (data && data.error) message = data.error;
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function getTasks() {
  return fetch(BASE_URL).then(handleResponse);
}

export function createTask({ title, description, priority }) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority }),
  }).then(handleResponse);
}

export function updateTask(id, { title, description, priority, completed }) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority, completed }),
  }).then(handleResponse);
}

export function deleteTask(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
}

export function toggleTask(id) {
  return fetch(`${BASE_URL}/${id}/toggle`, {
    method: "PATCH",
  }).then(handleResponse);
}