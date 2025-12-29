import { JSX } from "react";
import { Link } from "react-router-dom";

interface QuickAction {
  to: string;
  label: string;
  icon: JSX.Element;
  color: string;
  hoverColor: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Acciones Rápidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`flex items-center justify-center space-x-2 px-6 py-3 ${action.color} text-white rounded-lg hover:${action.hoverColor} transition font-medium`}
          >
            <span className="whitespace-nowrap flex justify-center items-center gap-2">{action.icon} {action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}