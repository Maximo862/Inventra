import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-[90%] max-w-2xl min-h-[60vh] flex flex-col justify-around text-center p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-6">Sistema de Gestión</h1>

        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-auto"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
