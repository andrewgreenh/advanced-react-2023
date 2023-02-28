import { ComponentProps, useEffect, useState } from "react";

export function FirstStepsWithTypeScript() {
  return (
    <>
      <h1>First steps with TypeScript</h1>
      <SimpleCounterButton
        incrementBy={10}
        style={{ border: "1px solid red" }}
      />
      <RandomNumbers />
    </>
  );
}

console.log(FirstStepsWithTypeScript() === FirstStepsWithTypeScript());

type SimpleCounterButtonProps = ComponentProps<"button"> & {
  incrementBy: number;
};

function SimpleCounterButton(props: SimpleCounterButtonProps) {
  const { incrementBy, ...rest } = props;
  const [counter, setCounter] = useState(0);

  return (
    <button {...rest} onClick={() => setCounter(counter + props.incrementBy)}>
      {counter}
    </button>
  );
}

function RandomNumbers() {
  const [randomNumber, setRandomNumber] = useState<null | number>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumber(Math.random());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <p>{randomNumber ?? "Generating a new number"}</p>;
}
