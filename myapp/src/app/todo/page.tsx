"use client";
// Next.js 13+ App Router-д client component гэдгийг зааж өгнө.

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

interface Todo {
  text: string; // Todo-ийн бичвэр
  done: boolean; // Дууссан эсэх
  due: string; // Дуусах хугацаа (YYYY-MM-DD format)
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() !== "") {
      const newTodo: Todo = {
        text: task,
        done: false,
        due: due || "No due date",
      };
      setTodos([...todos, newTodo]);
      setTask("");
      setDue("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "notdone") return !todo.done;
    return true;
  });

  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 p-6">
        <h1 className="text-2xl font-bold">Todo List</h1>

        {/* Input хэсэг */}
        <div className="flex gap-2">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="border px-2 py-1 rounded"
          />
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`px-3 py-1 rounded ${
              filter === "done" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Done
          </button>
          <button
            onClick={() => setFilter("notdone")}
            className={`px-3 py-1 rounded ${
              filter === "notdone" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Not Done
          </button>
        </div>

        {/* Todo List */}
        <ul className="w-80">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(index)}
                  className="mr-2"
                />
                <span
                  className={todo.done ? "line-through text-gray-500" : ""}
                >
                  {todo.text}
                </span>
                <div className="text-sm text-gray-500">📅 {todo.due}</div>
              </div>
              <button
                onClick={() => removeTodo(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>


{/* Done / Not done counter */}
<div className="flex gap-6 text-lg font-medium">
  <span className="text-green-600">
    ✅ Done: {todos.filter((t) => t.done).length}
  </span>
  <span className="text-red-600">
    ❌ Not Done: {todos.filter((t) => !t.done).length}
  </span>
</div>

    </Layout>
  );
}
