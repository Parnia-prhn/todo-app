import { useState } from "react";
import { Priority } from "../types/Task";

type Props = {
  onAdd: (
    title: string,
    priority: Priority,
    description?: string,
    reminderAt?: string
  ) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [description, setDescription] = useState("");
  const [reminderAt, setReminderAt] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) return;
    onAdd(trimmed, priority, description, reminderAt);
    setTitle("");
    setPriority("medium");
    setDescription("");
    setReminderAt("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-row gap-2">
          <label className="block mt-3 text-sm">عنوان تسک</label>
          <input
            type="text"
            placeholder="عنوان تسک..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-400 p-2 rounded"
          />
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-2">
            <label className="block mt-3 ml-3 text-sm">با اولوبت</label>
            <select
              className="border border-gray-400 rounded p-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="high">زیاد</option>
            </select>
            <div className="flex flex-row gap-2">
              <label className="block mt-3 text-sm">به من یادآوری کن در</label>
              <input
                type="datetime-local"
                value={reminderAt}
                onChange={(e) => setReminderAt(e.target.value)}
                className="border border-gray-400 p-2 rounded "
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <label className="block mt-3 ml-2 text-sm">توضیحات</label>
          <textarea
            placeholder="توضیحات..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 p-2 rounded  resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          افزودن
        </button>
        <span className="h-0 w-full border border-blue-500"></span>
      </div>
    </form>
  );
}
