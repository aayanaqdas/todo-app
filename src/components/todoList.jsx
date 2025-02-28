"use client";

import { useState } from "react";
import { TodoInputs } from "./todoInputs";

export function Todo() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    console.log(task);
  };

  return (
    <div className=" flex flex-col gap-10">
      <TodoInputs addTask={addTask} />
      <ul className="flex flex-col gap-6 items-center w-full">
        {tasks.map((task, index) => (
          <li
            key={index}
            className=" flex flex-col gap-2 bg-gray-800 rounded-lg px-6 py-5  shadow-xl w-full max-w-sm"
          >
            <h2 className="text-white text-lg">{task.name}</h2>
            <p className="text-gray-300">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
