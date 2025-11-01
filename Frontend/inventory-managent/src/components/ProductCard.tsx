import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiEdit2, FiTrash2, FiAlertTriangle, FiArchive } from "react-icons/fi";
import { BiArchiveIn } from "react-icons/bi";

interface Props {
  name: string;
  features?: React.ReactNode;
  onDelete: () => Promise<void>;
  onEdit: () => Promise<void>;
  disabled: boolean;
  expiration_date?: string | null;
  alert_threshold?: number | null;
  stock?: number | null;
  type?: string;
  onInactive?: () => Promise<void>;
  isActive?: boolean;
}

export function ProductCard({
  name,
  features,
  onDelete,
  onEdit,
  disabled,
  expiration_date,
  alert_threshold,
  stock,
  type,
  onInactive,
  isActive,
}: Props) {
  const { user } = useContext(AuthContext)!;

  const isExpired = expiration_date
    ? dayjs(expiration_date).isBefore(dayjs(), "day")
    : false;

  const isExpiringSoon = expiration_date
    ? dayjs(expiration_date).diff(dayjs(), "day") <= 5
    : false;

  const isLowerStock =
    alert_threshold != null && stock != null ? stock <= alert_threshold : false;

  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee" && type === "order";
  const canEditOrDelete = isAdmin || isEmployee;

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border ${
        !isActive ? "border-gray-300 opacity-60" : "border-gray-200"
      }`}
    >
      {/* Header con alertas */}
      {((isExpired || isExpiringSoon || isLowerStock) && isActive) && (
        <div
          className={`px-4 py-2 flex items-center space-x-2 ${
            isExpired
              ? "bg-red-100"
              : isExpiringSoon
              ? "bg-yellow-100"
              : "bg-orange-100"
          }`}
        >
          <FiAlertTriangle
            className={`h-4 w-4 ${
              isExpired
                ? "text-red-600"
                : isExpiringSoon
                ? "text-yellow-600"
                : "text-orange-600"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              isExpired
                ? "text-red-800"
                : isExpiringSoon
                ? "text-yellow-800"
                : "text-orange-800"
            }`}
          >
            {isExpired
              ? `⚠️ Vencido (${dayjs(expiration_date).format("DD/MM/YYYY")})`
              : isExpiringSoon
              ? `⚠️ Vence pronto (${dayjs(expiration_date).format("DD/MM/YYYY")})`
              : isLowerStock
              ? `⚠️ Bajo stock (mínimo permitido: ${alert_threshold})`
              : ""}
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Título y Estado */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          {!isActive && (
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-200 text-gray-600">
              Inactivo
            </span>
          )}
        </div>

        {/* Fecha de vencimiento (si no está en alerta) */}
        {expiration_date && !isExpired && !isExpiringSoon && (
          <p className="text-sm text-green-600 font-medium mb-3">
            Vence el {dayjs(expiration_date).format("DD/MM/YYYY")}
          </p>
        )}

        {/* Stock status (si no está en alerta) */}
        {alert_threshold && !isLowerStock && (
          <p className="text-sm text-green-600 font-medium mb-3">
            ✓ Stock OK (mínimo permitido: {alert_threshold})
          </p>
        )}

        {/* Features (información del producto) */}
        <div className="mb-4 text-sm text-gray-700 space-y-1">
          {features}
        </div>

        {/* Botones de acción */}
        {!disabled && canEditOrDelete && (
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <button
              onClick={onEdit}
              disabled={disabled}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
            >
              <FiEdit2 className="h-4 w-4" />
              <span>Editar</span>
            </button>

            {type === "product" && onInactive && (
              <button
                onClick={onInactive}
                disabled={disabled}
                className={`flex items-center justify-center px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                } disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                {isActive ? (
                  <FiArchive className="h-4 w-4" />
                ) : (
                  <BiArchiveIn className="h-4 w-4" />
                )}
              </button>
            )}

            <button
              onClick={onDelete}
              disabled={disabled}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}