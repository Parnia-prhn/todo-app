import { useState } from "react";
import { Priority, Task } from "../types/Task";
import PriorityBadge from "./PriorityBadge";

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
  console.log("rr", task?.reminderAt);
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
              <label className="text-gray-600 text-sm tracking-wide">با اولوبت</label>
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
                className={`text-lg font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
              >
                {task.title}
              </span>
            </div>
            {task?.description && (
              <p className="text-gray-600 text-sm bg-blue-50/50 p-3 rounded-lg break-words whitespace-pre-wrap max-w-full border border-blue-100/50">
                {task?.description}
              </p>
            )}
            {task.reminderAt && new Date(task.reminderAt) <= new Date() && !task.completed && (
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
