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
    description?: string
  ) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState<Priority>(task.priority);
  const [editedDescription, setEditedDescription] = useState("");
  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editedPriority, editedDescription);
      setIsEditing(false);
    }
  };
  return (
    <div className="flex justify-between p-4 border border-gray-400 rounded">
      <div className="flex items-center gap-2 ">
        {isEditing ? (
          <div className="flex items-center gap-2">
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
              }}
              className="cursor-pointer bg-blue-300 p-1 rounded-full"
            >
              🗙
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer bg-blue-300 p-1 rounded-full"
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
                }
              }}
              autoFocus
            />
            <textarea
              placeholder="توضیحات..."
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border p-2 rounded w-full mt-2 h-20 resize-none"
            />
            <div className="flex flex-row gap-2 items-center justify-center">
              <select
                className="border border-gray-400 rounded p-2"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value as Priority)}
              >
                <option value="low">کم</option>
                <option value="medium">متوسط</option>
                <option value="high">زیاد</option>
              </select>
              <label className="">با اولوبت</label>
            </div>
          </div>
        ) : (
          <span
            onClick={() => onToggle(task.id)}
            className={`cursor-pointer mx-2 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </span>
        )}
        {task.description && (
        <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
          {task.description}
        </p>
        )}
        {task.completed && task.completedAt && (
          <p className="text-xs text-green-600 mx-4">
            تکمیل‌شده در: {new Date(task.completedAt).toLocaleString("fa-IR")}
          </p>
        )}
        <PriorityBadge priority={task.priority} />
      </div>
    </div>
  );
}
