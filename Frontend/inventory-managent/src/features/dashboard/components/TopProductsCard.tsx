import { FiAward, FiShoppingCart } from "react-icons/fi";

interface TopProduct {
  id: number;
  name: string;
  totalSold: number;
  revenue: number;
}

interface TopProductsCardsProps {
  products: TopProduct[];
}
export function TopProductsCards({ products }: TopProductsCardsProps) {
  if (products.length === 0) return null;

  const gradients = [
    "from-yellow-400 to-yellow-600", 
    "from-gray-300 to-gray-500", 
    "from-amber-600 to-amber-800", 
  ];

  const medals = ["🏆", "🥈", "🥉"];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <FiAward className="h-6 w-6 text-yellow-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Top 3 Productos Más Vendidos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className={`
              bg-gradient-to-br ${gradients[index]} rounded-xl shadow-lg p-6 text-white
              transform transition-all duration-200 hover:scale-105 hover:shadow-xl
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold">#{index + 1}</span>
                <span className="text-2xl">{medals[index]}</span>
              </div>
              <FiShoppingCart className="h-8 w-8 opacity-80" />
            </div>
            <h3 className="text-xl font-bold mb-4 line-clamp-2">
              {product.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Unidades vendidas:</span>
                <span className="text-lg font-bold">
                  {product.totalSold.toLocaleString("es-AR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Ingresos:</span>
                <span className="text-lg font-bold">
                  ${product.revenue.toLocaleString("es-AR")}
                </span>
              </div>
            </div>

            {index === 0 && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                  ⭐ Más Vendido
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
