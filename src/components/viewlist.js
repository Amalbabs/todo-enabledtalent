"use client";

import { useState, useEffect } from "react";
import CompleteAlertModal from "./completAlertmodal";
import DeleteAlertModal from "./deleteAltermodals";
import toast from "react-hot-toast";

export default function ViewList({ todos, filter, setFilter, onToggle, onDelete, onEdit }) {
  const [modalType, setModalType] = useState(null); 
  const [targetId, setTargetId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "All", label: "All" },
    { id: "Active", label: "Active" },
    { id: "Pending", label: "Pending" },
    { id: "Completed", label: "Completed" },
  ];

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active" || filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true; // All
  });

  const activeCount = todos.filter(t => !t.completed).length;

  const handleTabChange = (tabId) => {
    if (tabId === filter) return;
    setIsLoading(true);
    setFilter(tabId);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleToggleClick = (id, currentCompleted) => {
    if (editingId === id) {
      toast("Please save your changes before completing", {
        icon: '📝',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    
    if (!currentCompleted) {
      setTargetId(id);
      setModalType("complete");
    } else {
      onToggle(id);
    }
  };

  const handleDeleteClick = (id) => {
    setTargetId(id);
    setModalType("delete");
  };

  const confirmAction = () => {
    if (modalType === "complete") {
      onToggle(targetId);
      toast.success("Task completed!", {
        style: {
          borderRadius: '10px',
          background: '#1a6334',
          color: '#fff',
        },
      });
    } else if (modalType === "delete") {
      onDelete(targetId);
      toast.success("Task deleted");
    }
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setTargetId(null);
  };

  const startEdit = (todo) => {
    if (todo.completed) {
      toast("Can't edit completed task", {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      onEdit(id, editValue.trim());
      setEditingId(null);
      toast.success("Task updated");
    }
  };

  return (
    <div className="w-full relative">
      <CompleteAlertModal 
        isOpen={modalType === "complete"} 
        onClose={closeModal} 
        onConfirm={confirmAction} 
      />
      
      <DeleteAlertModal 
        isOpen={modalType === "delete"} 
        onClose={closeModal} 
        onConfirm={confirmAction} 
      />

      <div className="flex flex-col items-center mb-10 gap-4">
        <div className="flex bg-[#cbd5c0] p-1 rounded-xl shadow-inner w-full max-w-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-3 px-2 sm:px-6 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base ${
                filter === tab.id
                  ? "bg-[#1a6334] text-white shadow-lg scale-[1.02]"
                  : "text-gray-700 hover:bg-[#b8c5a8]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-gray-600 font-semibold bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-[500px] overflow-hidden p-8 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] z-10 transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-[#cbd5c0] border-t-[#1a6334] rounded-full animate-spin"></div>
              <p className="text-[#1a6334] font-bold animate-pulse">Loading...</p>
            </div>
          </div>
        ) : null}

        <div className="h-full overflow-y-auto custom-scrollbar pr-2">
          <ul className="space-y-4">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-5 bg-[#f9fafb] rounded-xl border border-gray-100 group hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 flex-1 mr-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleClick(todo.id, todo.completed)}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 accent-[#1a6334] cursor-pointer"
                  />
                  {editingId === todo.id ? (
                    <div className="flex flex-1 gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a6334] text-gray-800"
                        autoFocus
                      />
                      <button onClick={() => saveEdit(todo.id)} className="text-[#1a6334] font-bold">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-400">Cancel</button>
                    </div>
                  ) : (
                    <span 
                      title={todo.text}
                      className={`text-xl font-medium truncate max-w-[200px] sm:max-w-[400px] lg:max-w-[500px] ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 transition-all">
                  {!editingId && (
                    <button
                      onClick={() => startEdit(todo)}
                      className={`p-2 rounded-lg transition-all ${
                        todo.completed 
                          ? "text-gray-300 cursor-not-allowed" 
                          : "text-blue-500 hover:bg-blue-50"
                      }`}
                      title={todo.completed ? "Can't edit completed task" : "Edit Task"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(todo.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
            {filteredTodos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-xl font-medium">No tasks found</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
