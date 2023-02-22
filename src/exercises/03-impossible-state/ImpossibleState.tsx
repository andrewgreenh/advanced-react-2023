import { useMemo, useState } from "react";

function checkValidity(username: string, termsAccepted: boolean) {
  console.log("recalc!");
  return username.length > 3 && username.length < 12 && termsAccepted;
}

export function ImpossibleState() {
  const [x, setX] = useState(0);
  const [username, setUsername] = useState("");
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  const isValid = useMemo(
    () => checkValidity(username, areTermsAccepted),
    [areTermsAccepted, username]
  );
  // const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   setIsValid(checkValidity(username, areTermsAccepted));
  // }, [areTermsAccepted, username]);

  return (
    <>
      <h1 onClick={() => setX(x + 1)}>Impossible state {x}</h1>
      <input
        value={username}
        placeholder="username"
        onChange={(e) => {
          const newUsername = e.target.value;
          setUsername(newUsername);
        }}
      />
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          checked={areTermsAccepted}
          onChange={() => {
            const newAccepted = !areTermsAccepted;
            setAreTermsAccepted(newAccepted);
          }}
        />{" "}
        Terms of service accepted
      </label>
      <br />
      <button disabled={!isValid}>Save</button>
      <button
        onClick={() => {
          setUsername("");
          setAreTermsAccepted(false);
        }}
      >
        Reset
      </button>
    </>
  );
}
