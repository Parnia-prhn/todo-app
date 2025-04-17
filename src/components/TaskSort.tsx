type Props = {
  sortBy: "createdAt_desc" | "createdAt_asc" | "title";
  onChange: (sortBy: "createdAt_desc" | "createdAt_asc" | "title") => void;
};

export default function TaskSort({ sortBy, onChange }: Props) {
  return (
    <div className="mb-4">
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as any)}
        className="border px-3 py-2 rounded"
      >
        <option value="createdAt_desc">جدیدترین</option>
        <option value="createdAt_asc">قدیمی‌ترین</option>
        <option value="title">عنوان (الفبا)</option>
      </select>
    </div>
  );
}
