type Props = {
  filter: "all" | "completed" | "pending";
  onChange: (newFilter: "all" | "completed" | "pending") => void;
};

export default function TaskFilter({ filter, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {["all", "completed", "pending"].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type as any)}
          className={`px-3 py-1 rounded border ${
            filter === type
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
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
