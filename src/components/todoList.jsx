"use client";

import { useState, useEffect } from "react";
import { TodoInputs } from "./todoInputs";

export function Todo() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(Array.isArray(data) ? data : []); // Ensure tasks is always an array
      } catch (error) {
        console.error("Could not fetch tasks:", error);
        setTasks([]); // Set tasks to an empty array on error
      }
    };
    fetchData();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const data = await response.json();
      console.log(data.message);
      setTasks([...tasks, data.newTask]); // Append the new task to the state
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task.id !== id)); // Update state by removing the task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className=" flex flex-col gap-25">
      <TodoInputs addTask={addTask} />
      <ul className="flex flex-col gap-6 items-center w-full">
        {tasks
          .map((task) => (
            <li
              key={task.id}
              className=" relative flex flex-col gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-6 py-5 shadow-xl w-full max-w-sm break-words break-all "
            >
              <span
                onClick={() => deleteTask(task.id)}
                className="absolute top-2 right-5 text-2xl text-gray-400 cursor-pointer"
              >
                &times;
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-lg">{task.name}</h2>
                <p className="text-gray-300">{task.description}</p>
              </div>
            </li>
          ))
          .reverse()}
      </ul>
    </div>
  );
}
