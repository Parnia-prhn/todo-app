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
import { useAuth } from "../components/auth-context";

export default function App() {
  const { isLoggedIn } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "createdAt_desc" | "createdAt_asc" | "title" | "priority" | "completed"
  >("createdAt_desc");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  useEffect(() => {
    const loadTasks = async () => {
      if (isLoggedIn) {
        // از API بخونه
        const res = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setTasks(data);
      } else {
        () => {
          const saved = localStorage.getItem("tasks");
          return saved ? JSON.parse(saved) : [];
        };
      }
    };

    loadTasks();
  }, [isLoggedIn]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center tracking-tight">
          لیست کارها
          <span className="block text-sm font-normal text-blue-600 mt-2">
            مدیریت کارهای روزمره
          </span>
        </h1>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-blue-100/50">
          <TaskForm onAdd={addTask} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskSearch query={searchQuery} onChange={setSearchQuery} />
            <TaskFilter filter={filter} onChange={setFilter} />
            <TaskSort sortBy={sortBy} onChange={setSortBy} />
          </div>
          {tasks.length !== 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200 hover:scale-105 transform"
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
        </div>
      </div>
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
