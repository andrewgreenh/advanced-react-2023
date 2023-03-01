import { faker } from "@faker-js/faker";
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";

const items = new Array(200)
  .fill(0)
  .map(() => ({ id: faker.datatype.uuid(), name: faker.name.fullName() }));

export function ImperativeAPIs() {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const listComponentReference = useRef<ListInstance>(null);

  const [value, setValue] = useState("");
  const indexToScrollTo = parseInt(value);

  // useEffect(() => {
  //   console.log(inputRef.current);
  // });

  return (
    <div>
      <h1>Imperative APIs</h1>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      <br />
      <button
        onClick={(event) => {
          // const element =
          //   event.currentTarget.previousElementSibling?.previousElementSibling;
          // console.log(element);
          inputRef.current?.focus();
        }}
      >
        Focus input!
      </button>{" "}
      {Number.isNaN(indexToScrollTo) ? (
        "Enter a number"
      ) : (
        <button
          onClick={() => {
            const listItem = listRef.current?.children[indexToScrollTo - 1];
            if (!listItem) return;
            listItem.scrollIntoView();
            listComponentReference.current?.scrollTo(indexToScrollTo);
          }}
        >
          Scroll to element {indexToScrollTo}
        </button>
      )}
      <ol className="h-64 overflow-auto" ref={listRef}>
        {items.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ol>
      <List ref={listComponentReference} />
    </div>
  );
}

type ListInstance = {
  scrollTo(index: number): void;
};

const List = forwardRef(function List(props: {}, ref: Ref<ListInstance>) {
  const listRef = useRef<HTMLOListElement>(null);

  useImperativeHandle(ref, () => ({
    scrollTo: (index) => {
      listRef.current?.children[index - 1]?.scrollIntoView();
    },
  }));
  // console.log(ref);

  return (
    <ol ref={listRef} className="h-64 overflow-auto" id="Virtualized-List">
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ol>
  );
});
