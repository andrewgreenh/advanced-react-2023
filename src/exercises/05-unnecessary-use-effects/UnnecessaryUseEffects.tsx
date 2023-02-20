import { useCallback, useEffect, useState } from "react";
import { Satellite, satellitesApi } from "../../api/satellites";

export function UnnecessaryUseEffects() {
  const [selectedSatelliteId, setSelectedSatelliteId] = useState<string | null>(
    null
  );
  const [loadedSatellite, setLoadedSatellite] = useState<Satellite | null>(
    null
  );

  useEffect(() => {
    if (!selectedSatelliteId) {
      setLoadedSatellite(null);
      return;
    }
    satellitesApi.get(selectedSatelliteId).then(setLoadedSatellite);
  }, [selectedSatelliteId]);

  return (
    <div className="flex items-start">
      <div className="flex-0 w-80">
        <SatellitesList
          selectedSatelliteId={selectedSatelliteId}
          setSelectedSatelliteId={setSelectedSatelliteId}
        />
      </div>
      <div>
        <SatelliteDetails satellite={loadedSatellite} />
      </div>
    </div>
  );
}

function SatellitesList(props: {
  selectedSatelliteId: string | null;
  setSelectedSatelliteId: (id: string | null) => void;
}) {
  const [requestState, setRequestState] = useState<
    | { type: "loading" }
    | { type: "error"; err: string }
    | { type: "success"; satellites: Satellite[] }
  >({ type: "loading" });

  const refetch = useCallback(() => {
    setRequestState({ type: "loading" });
    satellitesApi
      .getAll()
      .then((s) => {
        setRequestState({ type: "success", satellites: s });
      })
      .catch((err) => {
        setRequestState({ type: "error", err: err.toString() });
      });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (requestState.type === "loading") {
    return <p>Loading...</p>;
  }

  if (requestState.type === "error") {
    return (
      <p className="text-red-500">
        Something went wrong while loading satellites.{" "}
        <button onClick={refetch}>Try again</button>
      </p>
    );
  }

  return (
    <ul className="list-none p-0">
      {requestState.satellites.map((s) => (
        <li
          key={s.id}
          className={
            (props.selectedSatelliteId === s.id ? "bg-slate-300" : "") +
            " cursor-pointer px-2 py-4"
          }
          onClick={() => props.setSelectedSatelliteId(s.id)}
        >
          {s.name}
        </li>
      ))}

      <li>
        <button onClick={() => props.setSelectedSatelliteId(null)}>
          New satellite
        </button>
      </li>
    </ul>
  );
}

function SatelliteDetails(props: { satellite: Satellite | null }) {
  const [formState, setFormState] = useState({
    name: props.satellite?.name ?? "",
    reverse: !!props.satellite?.reverse,
  });

  return (
    <div className="px-4">
      <h2>{props.satellite ? props.satellite.name : "Neuer Satellite"}</h2>
      <label>
        Name{" "}
        <input
          value={formState?.name ?? ""}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
      </label>
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          checked={formState.reverse}
          onChange={(e) =>
            setFormState({ ...formState, reverse: e.target.checked })
          }
        />{" "}
        Reverse
      </label>
      <br />
      <br />
      <button
        onClick={() => {
          if (props.satellite) {
            satellitesApi.update({ ...props.satellite, ...formState });
          } else {
            satellitesApi.create({
              ...formState,
              angle: 0,
              type: "communication",
            });
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
