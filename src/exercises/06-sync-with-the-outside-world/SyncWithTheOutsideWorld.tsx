import { useEffect, useRef, useState } from "react";

function useElementDimensions<TElement extends HTMLElement>() {
  const ref = useRef<TElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [initDimensions, setInitDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let initialized = false;

    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      if (!initialized) {
        setInitDimensions({ width: rect.width, height: rect.height });
        initialized = true;
      }

      setDimensions({ width: rect.width, height: rect.height });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, dimensions };
}

export function SyncWithTheOutsideWorld() {
  const { ref, dimensions } = useElementDimensions<HTMLDivElement>();

  return (
    <div ref={ref}>
      <h1>Sync with the outside world</h1>

      <p>
        width: {dimensions.width} height: {dimensions.height}
      </p>

      <textarea />

      <button>Reset size</button>
    </div>
  );
}
