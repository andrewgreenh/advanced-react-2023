import { useQuery } from "react-query";
import { satellitesApi } from "../../api/satellites";

// type LoadingState<TResult> =
//   | { type: "LOADING" }
//   | { type: "SUCCESS"; data: TResult }
//   | { type: "ERROR"; error: string };

export function ExplicitStates() {
  return (
    <>
      <SatelliteList />
      <SatelliteList />
      <SatelliteList />
    </>
  );
}

function SatelliteList() {
  const satelliteQuery = useQuery(["satellites"], satellitesApi.getAll);

  return (
    <>
      <h1>Explicit states</h1>
      {satelliteQuery.status === "error" ? (
        <p>
          Something went wrong!{" "}
          <button onClick={() => satelliteQuery.refetch()}>Retry</button>
        </p>
      ) : satelliteQuery.status === "loading" ? (
        "Loading"
      ) : satelliteQuery.status === "success" ? (
        <ul>
          {satelliteQuery.data.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

// import { useCallback, useEffect, useState } from "react";
// import { Satellite, satellitesApi } from "../../api/satellites";

// type LoadingState<TResult> =
//   | { type: "LOADING" }
//   | { type: "SUCCESS"; data: TResult }
//   | { type: "ERROR"; error: string };

// export function ExplicitStates() {
//   const [satelliteState, setSatelliteState] = useState<
//     LoadingState<Satellite[]>
//   >({
//     type: "LOADING",
//   });

//   const reload = useCallback(async function reload() {
//     setSatelliteState({ type: "LOADING" });
//     try {
//       const satellites = await satellitesApi.getAll();
//       setSatelliteState({ type: "SUCCESS", data: satellites });
//     } catch (err) {
//       setSatelliteState({ type: "ERROR", error: String(err) });
//     }
//   }, []);

//   useEffect(() => {
//     reload();
//   }, [reload]);

//   return (
//     <>
//       <h1>Explicit states</h1>
//       {satelliteState.type === "ERROR" ? (
//         <p>
//           Something went wrong! <button onClick={reload}>Retry</button>
//         </p>
//       ) : satelliteState.type === "LOADING" ? (
//         "Loading"
//       ) : (
//         <ul>
//           {satelliteState.data.map((s) => (
//             <li key={s.id}>{s.name}</li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
