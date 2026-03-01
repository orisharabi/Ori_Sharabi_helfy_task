import { useEffect, useMemo, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/task-list.css";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const VISIBLE = 3;
  const canCarousel = tasks.length > VISIBLE;

  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(true);
  const trackRef = useRef(null);

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

      // allow the DOM to update before enabling animation
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

  const STEP = 320; 
  const GAP = 20;

  useEffect(() => {
    if (!trackRef.current) return;

    trackRef.current.style.gap = `${GAP}px`;
    trackRef.current.style.transform = `translateX(-${index * STEP}px)`;
    trackRef.current.style.transition = anim ? "transform 0.35s ease" : "none";
  }, [index, anim, GAP, STEP]);

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div className="taskList">
      <h2 className="taskList__title">Tasks</h2>

      <div className="taskList__controls">
        <button className="taskList__button" onClick={prev} disabled={!canCarousel}>Prev</button>
        <button className="taskList__button" onClick={next} disabled={!canCarousel}>Next</button>
      </div>

      <div className="taskList__viewport">
        <div
          className="taskList__track"
          ref={trackRef}
          onTransitionEnd={onEnd}
        >
          {loopItems.map((task, i) => (
            <div key={`${task.id}-${i}`} className="taskList__itemWrap">
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