"use client";
import { useState } from "react";
import { Priority } from "../types/Task";

type Props = {
  onAdd: (title: string, priority: Priority, description?: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [description, setDescription] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority, description);
    setTitle("");
    setPriority("medium");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            افزودن
          </button>

          <input
            type="text"
            placeholder="عنوان تسک..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
        </div>
        <div className="flex flex-row gap-2">
          <select
            className="border border-gray-400 rounded p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>
          <label className="">با اولوبت</label>
        </div>
        <textarea
          placeholder="توضیحات..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mt-2 h-20 resize-none"
        />
      </div>
    </form>
  );
}
