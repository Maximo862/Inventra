import React from "react";

interface StatItem {
  label: string;
  value: number | string;
  bgColor: string;
  textColor: string;
  boldColor: string;
  icon?: React.ReactNode;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
          <p
            className={`text-sm ${stat.textColor} font-medium flex items-center space-x-1`}
          >
            {stat.icon}
            <span>{stat.label}</span>
          </p>
          <p className={`text-2xl font-bold ${stat.boldColor}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
