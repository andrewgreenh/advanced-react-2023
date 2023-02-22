import { useEffect, useMemo, useState } from "react";

export function FirstStepsWithTypeScript() {
  return (
    <>
      <h1>First steps with TypeScript</h1>
      <SimpleCounterButton incrementBy={10} />
      <RandomNumbers />
    </>
  );
}

function SimpleCounterButton(props: { incrementBy: number }) {
  const [counter, setCounter] = useState(10);
  const [user, setUser] = useState<any>({});

  const millionthPrimeNumber = useMemo(() => {
    const calc = 10;
    return calc;
  }, []);

  const handleClick = () => {
    millionthPrimeNumber;
    setCounter((c) => c + props.incrementBy);

    setUser({
      ...user,
      name: "Peter",
    });
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      console.log("click");
    });

    return () => {
      // ...
    };
  }, [user]);

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        setCounter(counter + 1);
      }}
    >
      {counter}
    </button>
  );
}

function RandomNumbers() {
  const [number, setNumber] = useState<number | null>(null);
  // const stateInitialized = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(Math.random());
      // stateInitialized.current = true;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (number === null) return <p>Generating number</p>;

  return <p>{number}</p>;
}
