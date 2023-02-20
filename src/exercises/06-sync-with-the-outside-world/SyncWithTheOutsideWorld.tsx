import { useRef } from "react";

export function SyncWithTheOutsideWorld() {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <h1>Sync with the outside world</h1>

      <textarea ref={ref} />

      <button>Reset size</button>
    </div>
  );
}
