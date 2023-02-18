import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function ExerciseWrapper(props: { children: ReactNode }) {
  return (
    <>
      <Link
        className="fixed top-8 right-8 flex h-12 w-12 items-center justify-center rounded-md bg-blue-200 text-2xl transition-shadow hover:shadow-md hover:shadow-gray-400"
        to="/"
      >
        🏠
      </Link>
      <div className="p-8">{props.children}</div>
    </>
  );
}
