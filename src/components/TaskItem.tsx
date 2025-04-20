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
    <div className="flex justify-between p-4 border border-gray-400 rounded">
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              className="flex-1 mx-2 p-1 border border-gray-400"
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
              className="border border-gray-400 p-2 rounded w-full mt-2 h-20 resize-none"
            />
            <input
              type="datetime-local"
              value={editedReminderAt}
              onChange={(e) => setEditedReminderAt(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
            />
            <div className="flex flex-row gap-2 items-center justify-center">
              <label className="">با اولوبت</label>
              <select
                className="border border-gray-400 rounded p-2"
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
          <div>
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="ml-2"
              />
              <span
                className={`cursor-pointer mx-2 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            {task?.description && (
              <p className="w-[150px] p-1 border border-gray-300 rounded text-sm  text-gray-600 mx-2 whitespace-pre-wrap">
                {task?.description}
              </p>
            )}
            {task.reminderAt &&
              new Date(task.reminderAt) <= new Date() &&
              !task.completed && (
                <p className="text-red-500 text-sm my-2">
                  ⏰ زمان یادآوری رسیده!
                </p>
              )}
            <PriorityBadge priority={task.priority} />
          </div>
        )}

        {task.completed && task.completedAt && (
          <p className="text-xs text-green-600 mx-4">
            تکمیل‌شده در: {new Date(task.completedAt).toLocaleString("fa-IR")}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2  ">
        {isEditing ? (
          <div className="mr-2 flex items-center gap-2">
            <button
              onClick={handleSave}
              className="cursor-pointer bg-blue-300 p-1 rounded-full"
            >
              ✔
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditedDescription(task?.description);
                setEditedReminderAt(task?.reminderAt);
              }}
              className="cursor-pointer bg-blue-300 p-1 rounded-full"
            >
              🗙
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mr-2 cursor-pointer bg-blue-300 p-1 rounded-full"
          >
            ✏️
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="cursor-pointer bg-blue-300 p-1 rounded-full"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
