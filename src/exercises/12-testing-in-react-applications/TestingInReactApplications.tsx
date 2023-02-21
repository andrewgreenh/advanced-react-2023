import { useEffect, useState } from "react";
import { Satellite, satellitesApi } from "../../api/satellites";

export function TestingInReactApplications() {
  return (
    <>
      <h1>Testing in React Applications</h1>
      <FizzBuzzButton fizzValue="Fizz" buzzValue="Buzz" />
      <SatelliteList />
    </>
  );
}

export function FizzBuzzButton(props: {
  fizzValue: string;
  buzzValue: string;
}) {
  const [count, setCount] = useState(0);

  function getFizzBuzz() {
    if (count % 3 === 0 && count % 5 === 0)
      return [props.fizzValue, props.buzzValue].join(" ");
    if (count % 3 === 0) return props.fizzValue;
    if (count % 5 === 0) return props.buzzValue;
    return count;
  }

  const displayValue = getFizzBuzz();

  return (
    <span className="flex gap-4">
      <button onClick={() => setCount(count + 1)}>Increment button</button>
      <span>Current value: {displayValue}</span>
    </span>
  );
}

export function SatelliteList() {
  const [satellites, setSatellites] = useState<
    | { type: "loading" }
    | { type: "error"; err: string }
    | { type: "success"; data: Satellite[] }
  >({ type: "loading" });

  useEffect(() => {
    satellitesApi
      .getAll()
      .then((s) => setSatellites({ type: "success", data: s }))
      .catch((err) => {
        setSatellites({ type: "error", err });
      });
  }, []);

  if (satellites.type === "error")
    return <p>Something went wrong when loading the data.</p>;

  if (satellites.type === "loading") return <p>Loading...</p>;

  return (
    <ol>
      {satellites.data.map((s) => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ol>
  );
}
