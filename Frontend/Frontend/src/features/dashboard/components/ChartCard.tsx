import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function ChartCard({ title, icon, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}
