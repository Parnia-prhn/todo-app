"use client";
import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
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
    </form>
  );
}
