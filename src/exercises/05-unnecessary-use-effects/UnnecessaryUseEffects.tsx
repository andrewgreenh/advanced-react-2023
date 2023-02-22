import { useCallback, useEffect, useState } from "react";
import { Satellite, satellitesApi } from "../../api/satellites";

type RequestState =
  | { type: "loading" }
  | { type: "error"; err: string }
  | { type: "success"; satellites: Satellite[] };

export function UnnecessaryUseEffects() {
  const [selectedSatelliteId, setSelectedSatelliteId] = useState<string | null>(
    null
  );

  const [satellitesRequestState, setSatellitesRequestState] =
    useState<RequestState>({ type: "loading" });

  const refetchSatellites = useCallback(async () => {
    setSatellitesRequestState({ type: "loading" });
    await satellitesApi
      .getAll()
      .then((s) => {
        setSatellitesRequestState({ type: "success", satellites: s });
      })
      .catch((err) => {
        setSatellitesRequestState({ type: "error", err: err.toString() });
      });
  }, []);

  useEffect(() => {
    refetchSatellites();
  }, [refetchSatellites]);

  return (
    <div className="flex items-start">
      <div className="flex-0 w-80">
        <SatellitesList
          selectedSatelliteId={selectedSatelliteId}
          setSelectedSatelliteId={setSelectedSatelliteId}
          refetch={refetchSatellites}
          requestState={satellitesRequestState}
        />
      </div>
      <div>
        <SatelliteDetails
          key={selectedSatelliteId}
          satelliteId={selectedSatelliteId}
          refetch={refetchSatellites}
        />
      </div>
    </div>
  );
}

function SatellitesList(props: {
  requestState: RequestState;
  refetch: () => Promise<void>;
  selectedSatelliteId: string | null;
  setSelectedSatelliteId: (id: string | null) => void;
}) {
  const requestState = props.requestState;

  if (requestState.type === "loading") {
    return <p>Loading...</p>;
  }

  if (requestState.type === "error") {
    return (
      <p className="text-red-500">
        Something went wrong while loading satellites.{" "}
        <button onClick={props.refetch}>Try again</button>
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

function SatelliteDetails(props: {
  satelliteId: string | null;
  refetch: () => Promise<void>;
}) {
  const [formState, setFormState] = useState({
    name: "",
    reverse: false,
  });

  const [loadedSatellite, setLoadedSatellite] = useState<Satellite | null>(
    null
  );

  const isLoading = props.satelliteId && !loadedSatellite;

  useEffect(() => {
    setLoadedSatellite(null);
    if (!props.satelliteId) {
      return;
    }
    satellitesApi.get(props.satelliteId).then((satellite) => {
      setLoadedSatellite(satellite);
      setFormState(satellite);
    });
  }, [props.satelliteId]);

  return (
    <div className="px-4">
      <h2>
        {isLoading ? "Loading" : loadedSatellite?.name && "Neuer Satellite"}
      </h2>
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
        onClick={async () => {
          if (props.satelliteId && loadedSatellite) {
            await satellitesApi.update({ ...loadedSatellite, ...formState });
          } else {
            await satellitesApi.create({
              ...formState,
              angle: 0,
              type: "communication",
            });
          }

          await props.refetch();
        }}
      >
        Save
      </button>
    </div>
  );
}
