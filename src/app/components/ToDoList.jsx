import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(new Set());

  function saveTasks(updated) {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  function toggleChecked(index) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  function handleAdd() {
    if (!input.trim()) return;
    saveTasks([...tasks, input.trim()]);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  function handleDelete(index) {
    saveTasks(tasks.filter((_, i) => i !== index));
  }

  function handlePrioritize() {
    // AI prioritization coming soon
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-10">
      <p className="text-sm font-medium tracking-widest uppercase text-neutral-400 mb-3">
        Your Tasks
      </p>
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 leading-snug">
        To Do List
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="flex-1 rounded-2xl border border-neutral-200 bg-white/60 px-5 py-3 text-sm text-[var(--foreground)] placeholder-neutral-400 shadow-sm outline-none focus:border-neutral-400 transition"
        />
        <button
          onClick={handleAdd}
          className="rounded-2xl bg-[#3b2314] px-5 py-3 text-sm font-semibold text-[#f5ede4] hover:bg-[#2d1a0e] active:scale-[0.98] transition"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <li className="rounded-2xl border border-neutral-200 bg-white/60 px-5 py-4 text-neutral-400 text-sm shadow-sm">
            No tasks yet. Add one above.
          </li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white/60 px-5 py-4 shadow-sm transition hover:border-neutral-300"
            >
              <input
                type="checkbox"
                checked={checked.has(index)}
                onChange={() => toggleChecked(index)}
                className="w-4 h-4 rounded accent-[#3b2314] cursor-pointer shrink-0"
              />
              <span className={`flex-1 text-sm transition ${checked.has(index) ? "line-through text-neutral-400" : "text-[var(--foreground)]"}`}>
                {task}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="text-neutral-300 hover:text-red-400 transition text-lg leading-none"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      <button
        onClick={handlePrioritize}
        className="mt-6 w-full rounded-2xl border border-neutral-200 bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:border-neutral-400 active:scale-[0.98] transition shadow-sm"
      >
        Prioritize
      </button>
    </div>
  );
}

export default ToDoList;
