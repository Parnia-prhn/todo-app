type Props = {
  query: string;
  onChange: (value: string) => void;
};

export default function TaskSearch({ query, onChange }: Props) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="جستجو در تسک‌ها..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 pl-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
