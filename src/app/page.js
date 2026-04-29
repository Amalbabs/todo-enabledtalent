"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Input from "@/components/input";
import ViewList from "@/components/viewlist";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("Active");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from local storage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("enabled-talent-todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error("Failed to parse todos from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("enabled-talent-todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

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

  // Prevent hydration mismatch by not rendering list until loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#cbd5c0] border-t-[#1a6334] rounded-full animate-spin"></div>
      </div>
    );
  }

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
