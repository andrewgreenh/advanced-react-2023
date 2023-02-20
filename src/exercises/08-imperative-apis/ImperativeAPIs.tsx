import { faker } from "@faker-js/faker";
import { useState } from "react";

const items = new Array(200)
  .fill(0)
  .map(() => ({ id: faker.datatype.uuid(), name: faker.name.fullName() }));

export function ImperativeAPIs() {
  const [value, setValue] = useState("");
  const indexToScrollTo = parseInt(value);

  return (
    <div>
      <h1>Imperative APIs</h1>
      <input value={value} onChange={(e) => setValue(e.target.value)} />{" "}
      <button>Focus input!</button>{" "}
      {Number.isNaN(indexToScrollTo) ? (
        "Enter a  number"
      ) : (
        <button>Scroll to element {indexToScrollTo}</button>
      )}
      <ol className="h-64 overflow-auto">
        {items.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ol>
    </div>
  );
}
