/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import GoalInput from "./components/GoalInput";
import ToDoList from "./components/ToDoList";

export default function Home() {
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) setGoal(savedGoal);
  }, []);

  function handleGoalSubmit(newGoal) {
    localStorage.setItem("goal", newGoal);
    setGoal(newGoal);
  }

  if (!goal) return <GoalInput onSubmit={handleGoalSubmit} />;
  return <ToDoList />;
}
