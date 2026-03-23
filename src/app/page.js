/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import GoalInput from "./components/GoalInput";
import ToDoList from "./components/ToDoList";

export default function Home() {
  const [goal, setGoal] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    const savedTasks = localStorage.getItem("tasks");
    if (savedGoal) setGoal(savedGoal);
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  function handleGoalSubmit(newGoal) {
    localStorage.setItem("goal", newGoal);
    setGoal(newGoal);
  }

  function handleAddTask(task) {
    const updated = [...tasks, task];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  function handleDeleteTask(index) {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  if (!goal) return <GoalInput onSubmit={handleGoalSubmit} />;
  return <ToDoList tasks={tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />;
}
