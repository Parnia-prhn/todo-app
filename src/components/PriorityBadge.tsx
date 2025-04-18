import { Priority } from "../types/Task";

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const colorMap = {
    low: "bg-green-400",
    medium: "bg-gray-400",
    high: "bg-red-400",
  };

  const labelMap = {
    low: "کم",
    medium: "متوسط",
    high: "زیاد",
  };
  return (
    <span
      className={`flex justify-center text-white text-xs px-1 py-1 rounded ${colorMap[priority]}`}
    >
      {labelMap[priority]}
    </span>
  );
}
