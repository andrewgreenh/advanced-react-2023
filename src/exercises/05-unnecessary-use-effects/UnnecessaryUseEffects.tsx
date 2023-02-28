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

  const [requestState, setRequestState] = useState<RequestState>({
    type: "loading",
  });

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

  return (
    <div className="flex items-start">
      <div className="flex-0 w-80">
        <SatellitesList
          refetch={refetch}
          requestState={requestState}
          selectedSatelliteId={selectedSatelliteId}
          setSelectedSatelliteId={setSelectedSatelliteId}
        />
      </div>
      <div>
        <SatelliteDetails
          key={selectedSatelliteId}
          selectedSatelliteId={selectedSatelliteId}
          onSave={() => refetch()}
        />
      </div>
    </div>
  );
}

function SatellitesList(props: {
  requestState: RequestState;
  selectedSatelliteId: string | null;
  setSelectedSatelliteId: (id: string | null) => void;
  refetch: () => void;
}) {
  const { requestState, refetch } = props;

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

function SatelliteDetails(props: {
  selectedSatelliteId: string | null;
  onSave: () => void;
}) {
  const [formState, setFormState] = useState({
    name: "",
    reverse: false,
  });

  const [loadedSatellite, setLoadedSatellite] = useState<Satellite | null>(
    null
  );

  useEffect(() => {
    if (!props.selectedSatelliteId) {
      setLoadedSatellite(null);
      return;
    }
    satellitesApi.get(props.selectedSatelliteId).then((loadedSatellite) => {
      setLoadedSatellite(loadedSatellite);
      setFormState({
        name: loadedSatellite.name,
        reverse: loadedSatellite.reverse,
      });
    });
  }, [props.selectedSatelliteId]);

  if (props.selectedSatelliteId && !loadedSatellite) return <p>Loading</p>;

  return (
    <div className="px-4">
      <h2>
        {props.selectedSatelliteId ? loadedSatellite?.name : "Neuer Satellite"}
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
        onClick={() => {
          if (props.selectedSatelliteId && loadedSatellite) {
            satellitesApi
              .update({
                ...loadedSatellite,
                ...formState,
                id: props.selectedSatelliteId,
              })
              .then(props.onSave);
          } else {
            satellitesApi
              .create({
                ...formState,
                angle: 0,
                type: "communication",
              })
              .then(props.onSave);
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
