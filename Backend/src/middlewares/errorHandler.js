function errorHandler(err, req, res, next) {
  console.error(err);

  const errorMap = {
    ER_DUP_ENTRY: {
      status: 409,
      error: "Ya existe un elemento con ese nombre",
      code: "DUPLICATE_NAME",
    },
    ER_NO_REFERENCED_ROW_2: {
      status: 400,
      error: "Referencia inválida",
      code: "INVALID_REFERENCE",
    },
    ER_ROW_IS_REFERENCED_2: {
      status: 409,
      error: "No se puede eliminar porque tiene referencias",
      code: "HAS_REFERENCES",
    },
  };

  const knownError = errorMap[err.code];
  if (knownError) {
    return res.status(knownError.status).json({
      error: knownError.error,
      code: knownError.code,
    });
  }

  if (err.message === "Category in use by products") {
    return res.status(409).json({
      error:
        "No se puede eliminar la categoría porque tiene productos asociados",
      code: "CATEGORY_IN_USE",
    });
  }

  if (err.message === "Product not found") {
    return res.status(404).json({
      error: err.message,
      code: "NOT_FOUND",
    });
  }

  return res.status(500).json({
    error: "Server error",
    code: "SERVER_ERROR",
  });
}

module.exports = { errorHandler };
