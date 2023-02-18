import { Link, RouteObject } from "react-router-dom";
import { exercises } from "../exercises/exercises";

export const homeRoute: RouteObject = {
  path: "/",
  element: <Home />,
};

function Home() {
  return (
    <div className="mx-auto max-w-3xl pt-4">
      <h1 className="mb-4 text-3xl">Advanced React 2023</h1>
      <h2 className="mb-4 text-xl">Exercises</h2>
      <ul>
        {exercises.map((e) => (
          <li key={e.key}>
            <Link
              className="mb-2 block text-sky-600 hover:underline"
              to={`/exercises/${e.key}`}
            >
              {e.key} {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
