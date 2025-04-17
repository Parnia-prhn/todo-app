import { useState } from "react";
import { Task } from "../types/Task";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim());
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
              className="text-green-500 border rounded p-1 text-sm"
            >
              ذخیره
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
              }}
              className="text-blue-500 border rounded p-1 text-sm"
            >
              لغو
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 border rounded p-1 text-sm"
          >
            ویرایش
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className={` hover:underline text-sm border rounded p-1 bg-white cursor-pointer ${
            task.completed ? " text-red-400 " : "text-red-500"
          }`}
        >
          حذف
        </button>
      </div>
      {isEditing ? (
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
    </div>
  );
}
