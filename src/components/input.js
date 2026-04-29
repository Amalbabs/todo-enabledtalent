"use client";

import { useState } from "react";

export default function Input({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
      <form onSubmit={handleSubmit} className="flex w-full sm:w-2/3 lg:w-3/4 gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task name..."
          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6334] transition-all bg-white shadow-sm min-w-0"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-[#1a6334] text-white font-semibold rounded-lg hover:bg-[#144d28] transition-all shadow-md active:scale-95 whitespace-nowrap"
        >
          <span className="text-xl">+</span> Add Task
        </button>
      </form>
    </div>
  );
}
