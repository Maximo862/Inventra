import React from "react";
import { FiX } from "react-icons/fi";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  inputs: React.ReactNode;
  submitText: string;
  title?: string;
}

export function FormCard({ handleSubmit, inputs, onCancel, submitText, title = "Formulario" }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="h-6 w-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4 mb-6">
          {inputs}
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}