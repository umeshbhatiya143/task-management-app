import localFont from "next/font/local";
import Dashboard from "@/components/Dashboard";
import { useState, useEffect } from "react";

export default function Home() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container mx-auto">
      <Dashboard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
