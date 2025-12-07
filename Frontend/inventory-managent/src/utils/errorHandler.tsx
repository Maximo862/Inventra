import toast from "react-hot-toast";

export function handleError(error: any, action: string, itemName?: string) {
  console.error(`Error al ${action}:`, error);

  if (error.code === "DUPLICATE_NAME") {
    toast.error(
      itemName
        ? `Ya existe "${itemName}"`
        : "Ya existe un elemento con ese nombre",
      { icon: "⚠️", duration: 5000 }
    );
  } else if (error.code === "HAS_REFERENCES") {
    toast.error("No se puede eliminar porque está en uso por otros registros", {
      icon: "🔗",
      duration: 6000,
    });
  } else if (error.code === "CATEGORY_IN_USE") {
    toast.error(
      "No se puede eliminar la categoría porque tiene productos asociados",
      { icon: "📦", duration: 6000 }
    );
  } else if (error.code === "INVALID_REFERENCE") {
    toast.error("Referencia inválida", { icon: "❌" });
  } else if (error.code === "NOT_FOUND") {
    toast.error(`Elemento no encontrado`);
  } else if (error.statusCode === 400) {
    toast.error("Datos inválidos");
  } else if (error.statusCode === 403) {
    toast.error("No tienes permisos para esta acción");
  } else if (error.statusCode >= 500) {
    toast.error("Error del servidor. Intenta nuevamente");
  } else {
    toast.error(`Error al ${action} el elemento`);
  }
}
