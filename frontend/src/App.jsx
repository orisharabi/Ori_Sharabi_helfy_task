import { useEffect, useState } from "react";
import { getTasks } from "./services/tasksService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Task Manager</h1>
      {error && <p>{error}</p>}
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}

export default App;