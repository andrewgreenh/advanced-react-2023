import { useState } from "react";

export function calcIsValid(name: string, termsAccepted: boolean) {
  return name.length > 3 && name.length < 12 && termsAccepted;
}

export function ImpossibleState() {
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // const [isValid, setIsValid] = useState(false);

  // console.time("valid calc");
  const isValid = calcIsValid(name, termsAccepted);
  // console.timeEnd("valid calc");

  // console.log("Render", name, termsAccepted, isValid);

  // useEffect(() => {
  // }, [name.length, termsAccepted]);

  return (
    <>
      <h1>Impossible state</h1>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => {
          const name = e.target.value;
          setName(name);

          // setIsValid(true);
        }}
      />
      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={() => {
            setTermsAccepted(!termsAccepted);
          }}
        />
        Terms of service accepted
      </label>

      <br />
      <br />
      <button disabled={!isValid}>Save</button>
      <button
        onClick={() => {
          setName("");
          setTermsAccepted(false);
        }}
      >
        Reset
      </button>
    </>
  );
}
