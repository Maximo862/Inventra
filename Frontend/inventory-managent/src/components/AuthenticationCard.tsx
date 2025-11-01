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
    <div className="flex flex-col items-center justify-center h-screen dark">
      <form
        onSubmit={Handlesubmit}
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-gray-200 mb-4">{tittle}</h2>
        <div className="flex flex-col">
          {inputs}
          {errors && <p className="text-red-500">{errors}</p>}
          <p className="text-white mt-4">
            {button.textRedirect}
            <Link
              className="text-sm text-blue-500 -200 hover:underline mt-4"
              to={path}
            >
              {button.redirect}
            </Link>
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          type="submit"
        >
          {button.submit}
        </button>
      </form>
    </div>
  );
}
