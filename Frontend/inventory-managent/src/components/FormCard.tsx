import React from "react";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  inputs: React.ReactNode;
  submitText: string;
}

export function FormCard({ handleSubmit, inputs, onCancel, submitText } : Props) {
  return (
    <form onSubmit={handleSubmit}>
      {inputs}
      <button type="submit">{submitText}</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
