import { useEffect, useRef, useState } from "react";

function useElementDimensions() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      setDimensions({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { dimensions, ref };
}

export function SyncWithTheOutsideWorld() {
  const { dimensions, ref } = useElementDimensions();

  return (
    <div>
      <h1>Sync with the outside world</h1>

      <p>
        {Math.round(dimensions.width)} x {Math.round(dimensions.height)}
      </p>

      <textarea ref={ref} className="w-full" />

      <button
        onClick={() => {
          if (!ref.current) return;

          ref.current.style.width = 300 + "px";
          ref.current.style.height = 30 + "px";
        }}
      >
        Reset size
      </button>
    </div>
  );
}
