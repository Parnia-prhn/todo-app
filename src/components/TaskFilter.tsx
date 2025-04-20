type Props = {
  filter: "all" | "completed" | "pending";
  onChange: (newFilter: "all" | "completed" | "pending") => void;
};

export default function TaskFilter({ filter, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {["all", "completed", "pending"].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type as any)}
          className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors duration-200 ${
            filter === type
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-blue-50 border border-blue-200"
          }`}
        >
          {type === "all"
            ? "همه"
            : type === "completed"
            ? "انجام‌شده"
            : "در انتظار"}
        </button>
      ))}
    </div>
  );
}
