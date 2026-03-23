"use client";

import { useState } from "react";

function GoalInput({ onSubmit }) {
  // send Goal to db
  const [goal, setGoal] = useState("");

  function handleGoal() {
    console.log(goal);
    if (!goal.trim()) return;
    onSubmit(goal);
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-[var(--foreground)] mb-8 leading-snug">
          What would you like to achieve by the end of 2026?
        </h1>
        <div className="relative">
          <textarea
            rows={4}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Launch my own business, get fit, learn a new skill..."
            className="w-full resize-none rounded-2xl border border-neutral-200 bg-white/60 px-5 py-4 text-[var(--foreground)] placeholder-neutral-400 shadow-sm outline-none focus:border-neutral-400 transition"
          />
        </div>
        <button
          className="mt-4 w-full rounded-2xl bg-[#3b2314] px-6 py-3 text-sm font-semibold text-[#f5ede4] hover:bg-[#2d1a0e] active:scale-[0.98] transition"
          onClick={handleGoal}
        >
          Set my goal
        </button>
      </div>
    </div>
  );
}

export default GoalInput;
