import { useState } from "react";
import { Link } from "react-router-dom";
import todosData from "./todos-data";

export default function Todos() {
  const [localTodos, setLocalTodos] = useState(todosData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");

  const tasksPerPage = 10;

  const handleToggleComplete = (id) => {
    const updatedTodos = localTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setLocalTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newTodo = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: priority,
    };
    setLocalTodos([newTodo, ...localTodos]);
    setNewTask("");
    setPriority("medium");
  };

  const filteredTodos = localTodos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "complete"
        ? todo.completed
        : !todo.completed;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastTodo = currentPage * tasksPerPage;
  const indexOfFirstTodo = indexOfLastTodo - tasksPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🗂️ My Checklist</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex flex-col gap-2 mb-4" aria-label="Add new task form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="p-2 border rounded"
          aria-label="New task title"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded"
          aria-label="Select task priority"
        >
          <option value="high">High Priority 🔴</option>
          <option value="medium">Medium Priority 🟠</option>
          <option value="low">Low Priority 🟢</option>
        </select>
        <button type="submit" className="bg-purple-600 text-white py-2 rounded">
          ➕ Add Task
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="w-full mb-3 p-2 border rounded"
        aria-label="Search tasks"
      />

      {/* Filter Buttons */}
      <nav className="flex gap-2 justify-center mb-4" aria-label="Filter tasks">
        {["all", "complete", "incomplete"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded ${
              filter === type ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            {type === "all" && "All"}
            {type === "complete" && "Completed ✅"}
            {type === "incomplete" && "Incomplete ❌"}
          </button>
        ))}
      </nav>

      {/* Task List */}
      <section aria-label="Task list">
        {currentTodos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          currentTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between border p-2 mb-2 rounded"
            >
              <label className="flex items-center gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  aria-label={`Mark task "${todo.title}" as complete or incomplete`}
                />
                <Link
                  to={`/todos/${todo.id}`}
                  className={`flex-1 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  } hover:underline`}
                  aria-label={`View details for task "${todo.title}"`}
                >
                  {todo.title}
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-200 ml-1">
                    {todo.priority}
                  </span>
                </Link>
              </label>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-600 text-sm"
                aria-label={`Delete task "${todo.title}"`}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-4" aria-label="Pagination controls">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅️ Prev
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ➡️
          </button>
        </div>
      )}
    </main>
  );
}
