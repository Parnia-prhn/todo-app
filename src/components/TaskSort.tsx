type Props = {
  sortBy:
    | "createdAt_desc"
    | "createdAt_asc"
    | "title"
    | "priority"
    | "completed";
  onChange: (
    sortBy:
      | "createdAt_desc"
      | "createdAt_asc"
      | "title"
      | "priority"
      | "completed"
  ) => void;
};

export default function TaskSort({ sortBy, onChange }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700">مرتب سازی بر اساس</label>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as any)}
        className="w-full px-3 py-1.5 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="priority">اولویت بالا</option>
        <option value="completed">تاریخ تکمیل</option>
        <option value="createdAt_desc">جدیدترین</option>
        <option value="createdAt_asc">قدیمی‌ترین</option>
        <option value="title">عنوان (الفبا)</option>
      </select>
    </div>
  );
}
