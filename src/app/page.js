"use client";

import { useState } from "react";
import Header from "@/components/header";
import Input from "@/components/input";
import ViewList from "@/components/viewlist";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("Active");

  const handleAddTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Input onAdd={handleAddTodo} />
        <ViewList 
          todos={todos} 
          filter={filter} 
          setFilter={setFilter} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}
