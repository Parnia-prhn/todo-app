import { Priority } from "../types/Task";

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const colorMap = {
    low: "bg-gradient-to-r from-green-400 to-green-500",
    medium: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    high: "bg-gradient-to-r from-red-400 to-red-500",
  };

  const labelMap = {
    low: "کم",
    medium: "متوسط",
    high: "زیاد",
  };
  return (
    <span
      className={`inline-flex items-center text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm ${colorMap[priority]}`}
    >
      {labelMap[priority]}
    </span>
  );
}
