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
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100/50"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 tracking-wide">
            عنوان تسک
          </label>
          <input
            type="text"
            placeholder="عنوان تسک..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 tracking-wide">
              با اولوبت
            </label>
            <select
              className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="high">زیاد</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 tracking-wide">
              به من یادآوری کن در
            </label>
            <input
              type="datetime-local"
              value={reminderAt}
              onChange={(e) => setReminderAt(e.target.value)}
              className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className=" block text-sm font-medium text-gray-700 tracking-wide">
            توضیحات
          </label>
          <textarea
            placeholder="توضیحات..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          افزودن تسک جدید
        </button>
      </div>
    </form>
  );
}
