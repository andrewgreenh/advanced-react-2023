import { faker } from "@faker-js/faker";
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";

const items = new Array(200)
  .fill(0)
  .map(() => ({ id: faker.datatype.uuid(), name: faker.name.fullName() }));

export function ImperativeAPIs() {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<ListInstance>(null);

  const [value, setValue] = useState("");
  const indexToScrollTo = parseInt(value);

  return (
    <div>
      <h1>Imperative APIs</h1>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      <button onClick={() => inputRef.current?.focus()}>Focus input!</button>{" "}
      {Number.isNaN(indexToScrollTo) ? (
        "Enter a  number"
      ) : (
        <button
          onClick={() => {
            if (!listRef.current) return;

            listRef.current.scrollToIndex(indexToScrollTo - 1);
          }}
        >
          Scroll to element {indexToScrollTo}
        </button>
      )}
      <div className="flex">
        <List onScroll={(n) => listRef.current?.setScrollPosition(n)} />
        <List ref={listRef} />
      </div>
    </div>
  );
}

type ListInstance = {
  setScrollPosition: (n: number) => void;
  scrollToIndex: (index: number) => void;
};

const List = forwardRef(function List(
  props: { onScroll?: (scrollTop: number) => void },
  ref: Ref<ListInstance>
) {
  const olRef = useRef<HTMLOListElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      const elementToScrollTo = olRef.current?.querySelectorAll("li")[index];
      elementToScrollTo?.scrollIntoView({ behavior: "smooth" });
    },
    setScrollPosition: (scrollTop: number) => {
      if (olRef.current) olRef.current.scrollTop = scrollTop;
    },
  }));

  return (
    <ol
      className="h-64 overflow-auto"
      ref={olRef}
      onScroll={(e) => props.onScroll?.(e.currentTarget.scrollTop)}
    >
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ol>
  );
});
