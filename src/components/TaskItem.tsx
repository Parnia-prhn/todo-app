import { useState } from "react";
import { Priority, Task } from "../types/Task";
import PriorityBadge from "./PriorityBadge";
import { Check } from "./icons/Check";
import { Cancel } from "./icons/Cancel";
import { Edit } from "./icons/Edit";
import { Delete } from "./icons/Delete";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    newText: string,
    priority: Priority,
    description?: string,
    reminderAt?: string
  ) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState<Priority>(task.priority);
  const [editedDescription, setEditedDescription] = useState(task?.description);
  const [editedReminderAt, setEditedReminderAt] = useState(task?.reminderAt);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editedPriority, editedDescription);
      setIsEditing(false);
    }
  };
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 mb-4 border border-blue-100/50 hover:border-blue-200/50">
      <div className="flex flex-col gap-3">
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <input
              className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditTitle(task.title);
                  setEditedDescription(task?.description);
                  setEditedReminderAt(task?.reminderAt);
                }
              }}
              autoFocus
            />
            <textarea
              placeholder="توضیحات..."
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border border-blue-200 p-3 rounded-lg w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
            />
            <input
              type="datetime-local"
              value={editedReminderAt}
              onChange={(e) => setEditedReminderAt(e.target.value)}
              className="border border-blue-200 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
            />
            <div className="flex flex-row gap-2 items-center">
              <label className="text-gray-600 text-sm tracking-wide">
                با اولوبت
              </label>
              <select
                className="border border-blue-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value as Priority)}
              >
                <option value="low">کم</option>
                <option value="medium">متوسط</option>
                <option value="high">زیاد</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
              <span
                className={`text-lg font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.title}
              </span>
            </div>
            {task?.description && (
              <p className="text-gray-600 text-sm bg-blue-50/50 p-3 rounded-lg break-words whitespace-pre-wrap max-w-full border border-blue-100/50">
                {task?.description}
              </p>
            )}
            {task.reminderAt &&
              new Date(task.reminderAt) <= new Date() &&
              !task.completed && (
                <p className="text-red-500 text-sm flex items-center gap-1 bg-red-50/50 p-2 rounded-lg border border-red-100/50">
                  <span>⏰</span> زمان یادآوری رسیده!
                </p>
              )}
            <PriorityBadge priority={task.priority} />
          </div>
        )}

        {task.completed && task.completedAt && (
          <p className="text-xs text-green-600 bg-green-50/50 p-2 rounded-lg border border-green-100/50">
            تکمیل‌شده در: {new Date(task.completedAt).toLocaleString("fa-IR")}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 mt-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Check />
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditedDescription(task?.description);
                setEditedReminderAt(task?.reminderAt);
              }}
              className="p-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Cancel />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <Edit />
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
}
