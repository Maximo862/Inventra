import { Product } from "@/types/types";

interface LatestProductsProps {
  products: Product[];
}


export function LatestProducts({ products }: LatestProductsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Últimos Productos Creados
      </h3>
      
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center space-x-2 text-gray-700"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{p.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay productos aún...</p>
      )}
    </div>
  );
}