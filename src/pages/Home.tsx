import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Task } from "../types/Task";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskSearch from "../components/TaskSearch";
import TaskSort from "../components/TaskSort";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "createdAt_desc" | "createdAt_asc" | "title"
  >("createdAt_desc");

  const addTask = (title: string) => {
    setTasks((prev) => [
      {
        id: uuid(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filtered = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const searched = filtered.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => {
    if (sortBy === "createdAt_desc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "createdAt_asc") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="bg-white border-blue-400 max-w-2xl mx-auto border-12  p-4 flex  flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold mb-4">لیست کارها</h1>
      <TaskForm onAdd={addTask} />
      <TaskSearch query={searchQuery} onChange={setSearchQuery} />
      <TaskFilter filter={filter} onChange={setFilter} />
      <TaskSort sortBy={sortBy} onChange={setSortBy} />
      <TaskList
        tasks={sorted}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </div>
  );
}
