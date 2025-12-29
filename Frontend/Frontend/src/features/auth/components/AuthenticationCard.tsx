import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ButtonConfig {
  textRedirect: string;
  redirect: string;
  submit: string;
}

interface Props {
  Handlesubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  button: ButtonConfig;
  tittle: string;
  inputs: React.ReactNode;
  path: string;
}

export function AuthenticationCard({
  Handlesubmit,
  button,
  tittle,
  inputs,
  path,
}: Props) {
  const { errors } = useContext(AuthContext)!;

  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">
  <form
    onSubmit={Handlesubmit}
    className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8"
  >
    <h2 className="text-2xl font-semibold text-black mb-6 text-center">
      {tittle}
    </h2>

    <div className="flex flex-col gap-4">
      {inputs}
    </div>

    {errors && <p className="text-red-500 mt-2">{errors}</p>}

    <p className="text-sm text-gray-600 mt-4">
      {button.textRedirect}
      <Link className="text-blue-500 hover:underline" to={path}>
        {button.redirect}
      </Link>
    </p>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-md mt-6 transition hover:brightness-110"
    >
      {button.submit}
    </button>
  </form>
</div>

  );
}
