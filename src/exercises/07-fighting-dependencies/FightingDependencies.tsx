import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useEvent<TFunc extends (...args: any[]) => any>(callback: TFunc) {
  const updatedFunctionRef = useRef(callback);
  useEffect(() => {
    updatedFunctionRef.current = callback;
  });

  const stableFunction = useRef(() => {
    updatedFunctionRef.current();
  }).current;

  return stableFunction;
}

function useInterval(callback: () => void, delay: number) {
  const [running, setRunning] = useState(true);
  const stableCallback = useEvent(callback);

  const stop = useCallback(() => setRunning(false), []);

  function start() {
    setRunning(true);
  }

  useEffect(() => {
    if (!running) return;
    console.log("rebuild interval");
    const interval = setInterval(() => {
      stableCallback();
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [delay, running, stableCallback]);

  return {
    start,
    stop,
  };
}

export function FightingDependencies() {
  const [n1, setN1] = useState(1);
  const [n2, setN2] = useState(1);

  // function currentOnInterval() {
  //   setN2(n1 + n2);
  // }

  // const numbers = useRef({ n1, n2 });

  // useEffect(() => {
  //   numbers.current = { n1, n2 };
  // });

  // const onInterval = useCallback(() => {
  //   const { n1, n2 } = numbers.current;
  //   setN2(n1 + n2);
  // }, []);

  const { start, stop } = useInterval(() => setN2(n1 + n2), 500);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const { n1, n2 } = numbers.current;
  //     setN2(n2 + n1);
  //   }, 500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const stableMouseMove = useEvent(() => {
    console.log(n1, n2);
  });

  return (
    <>
      <h1 onMouseMove={stableMouseMove}>Fighting Dependencies</h1>

      <button onClick={() => setN1(n1 + 1)}>{n1}</button>

      <p>{n2}</p>

      <MemoExample />
    </>
  );
}

function MemoExample() {
  const [x, setX] = useState(0);

  // const style0 = { border: `${x}px solid black` };

  const style = useMemo(() => ({ border: `${x}px solid black` }), [x]);

  const handleClick = useCallback(() => {
    setX((x) => x + 1);
  }, []);

  useEffect(() => {
    console.log(style);
  }, [style]);

  return (
    <button style={style} onClick={handleClick}>
      {x}
    </button>
  );
}

// useLayoutEffect(() => {
//   // Object.assign(button.styles, props.styles);
//   button.onclick = props.onClick;
// });
