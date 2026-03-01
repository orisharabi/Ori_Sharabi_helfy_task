import { useEffect, useMemo, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const VISIBLE = 3;
  const canCarousel = tasks.length > VISIBLE;

  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(true);

  const loopItems = useMemo(() => {
    if (!canCarousel) return tasks;

    return [
      ...tasks.slice(-VISIBLE),
      ...tasks,
      ...tasks.slice(0, VISIBLE),
    ];
  }, [tasks, canCarousel]);

  useEffect(() => {
    if (canCarousel) {
      // start at the first real item block
      setAnim(false);
      setIndex(VISIBLE);

      // enable animation after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnim(true));
      });
    } else {
      setIndex(0);
    }
  }, [tasks, canCarousel]);

  function next() {
    if (!canCarousel) return;
    setIndex((i) => i + 1);
  }

  function prev() {
    if (!canCarousel) return;
    setIndex((i) => i - 1);
  }

  function onEnd() {
    if (!canCarousel) return;

    // If we moved into the right clones, jump back to the real start
    if (index === tasks.length + VISIBLE) {
      setAnim(false);
      setIndex(VISIBLE);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnim(true));
      });
      return;
    }

    // If we moved into the left clones, jump to the real end
    if (index === VISIBLE - 1) {
      setAnim(false);
      setIndex(tasks.length + VISIBLE - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnim(true));
      });
      return;
    }
  }

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  const STEP = 320; // 300 card + 20 gap (match below)
  const GAP = 20;

  return (
    <div>
      <h2>Tasks</h2>

      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <button onClick={prev} disabled={!canCarousel}>Prev</button>
        <button onClick={next} disabled={!canCarousel}>Next</button>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: `${GAP}px`,
            transform: `translateX(-${index * STEP}px)`,
            transition: anim ? "transform 0.35s ease" : "none",
          }}
          onTransitionEnd={onEnd}
        >
          {loopItems.map((task, i) => (
            <div key={`${task.id}-${i}`} style={{ minWidth: "300px" }}>
              <TaskItem
                task={task}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;