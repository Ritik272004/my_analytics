interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function DataCard({ title, value, subtitle }: DataCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
}
