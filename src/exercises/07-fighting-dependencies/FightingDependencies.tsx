import { useCallback, useEffect, useRef, useState } from "react";

export function FightingDependencies() {
  return (
    <div>
      <h1>Fighting Dependencies</h1>
      <CounterButton />
    </div>
  );
}

function useEvent(callback: () => void) {
  const currentCallbackRef = useRef(callback);

  useEffect(() => {
    currentCallbackRef.current = callback;
  });

  const stableCallback = useCallback(() => {
    return currentCallbackRef.current();
  }, []);

  return stableCallback;
}

function useInterval(callback: () => void, delay: number) {
  const stableCallback = useEvent(callback);

  useEffect(() => {
    console.log("effect ran");
    const interval = setInterval(() => {
      stableCallback();
    }, delay);

    return () => clearInterval(interval);
  }, [delay, stableCallback]);
}

function CounterButton() {
  const [incrementBy, setIncrementBy] = useState(0);
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    setCounter(counter + incrementBy);
  }, 2000);

  return (
    <div>
      <button onClick={() => setIncrementBy(incrementBy + 1)}>
        {incrementBy}
      </button>

      <p>{counter}</p>
    </div>
  );
}
