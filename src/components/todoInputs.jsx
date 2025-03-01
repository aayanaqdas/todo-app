"use client";

import { useState } from "react";

export function TodoInputs({ addTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() && taskDesc.trim()) {
      const task = { name: taskName, description: taskDesc };
      addTask(task);
      setTaskName("");
      setTaskDesc("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 items-center justify-center h-full w-full "
    >
      <h1 className=" mb-2 mt-2 text-3xl text-white">Add task</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <input
          className="px-5 py-4 outline-0 rounded-lg bg-gray-800 placeholder-gray-400 text-l text-gray-400 w-full shadow-xl "
          type="text"
          placeholder="Write taskname"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          className="px-5 py-4 outline-0 rounded-lg bg-gray-800 placeholder-gray-400 text-l text-gray-400 w-full shadow-xl "
          type="text"
          placeholder="Write task description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
        <button
          type="submit"
          className="py-2 mt-4 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-900 text-white text-center w-full"
        >
          Add to list
        </button>
      </div>
    </form>
  );
}
