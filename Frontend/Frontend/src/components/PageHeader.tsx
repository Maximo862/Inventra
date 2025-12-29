import { SearchBar } from "./SearchBar";
import { FiPlus } from "react-icons/fi";

interface PageHeaderProps {
  title: string;
  description: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  createButtonLabel: string;
  onCreateClick: () => void;
  showCreateButton: boolean; 
  canCreate?: boolean; 
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  createButtonLabel,
  onCreateClick,
  showCreateButton,
  canCreate = true,
  children,
}: PageHeaderProps) {
  return (
    <>
      {/* Título principal */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Barra de búsqueda y botón */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:flex-1">
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          </div>
          
          {canCreate && showCreateButton && (
            <button
              onClick={onCreateClick}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
            >
              <FiPlus className="h-5 w-5" />
              <span>{createButtonLabel}</span>
            </button>
          )}
        </div>

        {/* Contenido adicional (stats, filtros, etc.) */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </>
  );
}