import { useQuery } from "react-query";
import { satellitesApi } from "../../api/satellites";

type RequestState<TData> =
  | {
      type: "loading";
    }
  | {
      type: "success";
      data: TData;
    }
  | {
      type: "error";
      error: string;
    };

type RequestAction<TData> =
  | {
      type: "loadingStarted";
    }
  | {
      type: "loadingSucceeded";
      data: TData;
    }
  | {
      type: "loadingFailed";
      error: string;
    };

function requestReducer<TData>(
  state: RequestState<TData>,
  action: RequestAction<TData>
): RequestState<TData> {
  switch (action.type) {
    case "loadingStarted":
      return { type: "loading" };
    case "loadingSucceeded":
      return { type: "success", data: action.data };
    case "loadingFailed":
      return { type: "error", error: action.error };
  }
}

export function ExplicitStates() {
  // const [satellitesRequestState, setSatellitesRequestState] = useState<
  //   RequestState<Satellite[]>
  // >({ type: "loading" });

  // const [satellitesRequestState, dispatch] = useReducer(
  //   requestReducer<Satellite[]>,
  //   {
  //     type: "loading",
  //   }
  // );

  // const refetch = useCallback(async () => {
  //   dispatch({ type: "loadingStarted" });
  //   try {
  //     const satellites = await satellitesApi.getAll();
  //     dispatch({ type: "loadingSucceeded", data: satellites });
  //   } catch (err) {
  //     dispatch({ type: "loadingFailed", error: String(err) });
  //   }
  // }, []);

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  const satellitesQuery = useQuery(["satellites"], satellitesApi.getAll);

  return (
    <>
      <h1>Explicit states</h1>
      {satellitesQuery.status === "error" ? (
        <p>
          Something went wrong with loading data...{" "}
          <button onClick={() => satellitesQuery.refetch()}>Retry</button>
        </p>
      ) : satellitesQuery.status === "loading" ? (
        <p>Loading...</p>
      ) : satellitesQuery.status === "idle" ? (
        <p>Waiting to fetch data</p>
      ) : (
        <ul>
          {satellitesQuery.data.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
