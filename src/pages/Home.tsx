import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Priority, Task } from "../types/Task";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskSearch from "../components/TaskSearch";
import TaskSort from "../components/TaskSort";
import { useEffect, useRef } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "createdAt_desc" | "createdAt_asc" | "title" | "priority" | "completed"
  >("createdAt_desc");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleClearAll = () => {
    setIsConfirmOpen(true);
  };

  const confirmDeleteAll = () => {
    setTasks([]);
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        if (
          task.reminderAt &&
          !task.completed &&
          new Date(task.reminderAt) <= new Date()
        ) {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (
    title: string,
    priority: Priority = "medium",
    description?: string,
    reminderAt?: string
  ) => {
    setTasks((prev) => [
      {
        id: uuid(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        priority,
        description,
        reminderAt,
      },
      ...prev,
    ]);
  };

  const editTask = (
    id: string,
    newTitle: string,
    newPriority: Priority,
    description?: string,
    reminderAt?: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              priority: newPriority,
              description: description,
              reminderAt: reminderAt,
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task
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
    } else if (sortBy === "priority") {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    } else if (sortBy === "completed") {
      return (
        (b.completedAt ? new Date(b.completedAt).getTime() : 0) -
        (a.completedAt ? new Date(a.completedAt).getTime() : 0)
      );
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="bg-white border-blue-400 max-w-auto mx-auto border-12  p-4 flex  flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold mb-4">لیست کارها</h1>
      <TaskForm onAdd={addTask} />
      <TaskSearch query={searchQuery} onChange={setSearchQuery} />
      <TaskFilter filter={filter} onChange={setFilter} />
      <TaskSort sortBy={sortBy} onChange={setSortBy} />
      {tasks.length !== 0 && (
        <button
          onClick={handleClearAll}
          className="text-red-500  hover:text-red-600 cursor-pointer"
        >
          حذف همه تسک‌ها
        </button>
      )}
      <TaskList
        tasks={sorted}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
      <audio ref={audioRef} src="/bell.wav" preload="auto" />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeleteAll}
        title="حذف همه تسک‌ها"
        message="آیا مطمئنی می‌خوای همه تسک‌ها حذف بشن؟"
      />
    </div>
  );
}
