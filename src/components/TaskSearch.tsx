type Props = {
  query: string;
  onChange: (value: string) => void;
};

export default function TaskSearch({ query, onChange }: Props) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="جستجو در تسک‌ها..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-400 rounded"
      />
    </div>
  );
}
