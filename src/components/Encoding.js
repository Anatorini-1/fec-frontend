import React from "react";
import { useState, useEffect } from "react";
import "../style/Encoding.css";
import StateButton from "./UI/StateBoundButton";
import NumberInput from "./UI/NumberInput";

export default function Encoding({ requestBody, setRequestBody }) {
  const [encoding, setEncoding] = useState("HAMMING");
  const [encodingParams, setEncodingParams] = useState([3]);
  useEffect(() => {
    setRequestBody({
      ...requestBody,
      encoding: encoding,
      encodingParams: [...encodingParams],
    });
    // eslint-disable-next-line
  }, [encoding, encodingParams]);

  const encodingParamElems = {
    HAMMING: (
      <NumberInput
        title="Redundancy per block"
        value={encodingParams[0]}
        onChange={(e) => setEncodingParams([parseInt(e.target.value)])}
        min={1}
        max={10}
      />
    ),
    REPEAT: (
      <NumberInput
        title="Repetition factor"
        value={encodingParams[0]}
        onChange={(e) => setEncodingParams([parseInt(e.target.value)])}
        min={1}
        max={10}
      />
    ),
    BCH: <></>,
    REED_SOLOMON: <></>,
    REESE_SOLOMON2: <></>,
  };

  const encodings = [
    "HAMMING",
    "REPEAT",
    "BCH",
    "REED_SOLOMON",
    "REESE_SOLOMON2",
  ];

  let encodingButtons = [];
  encodings.forEach((enc) => {
    encodingButtons.push(
      <StateButton
        text={enc}
        key={enc}
        state={encoding}
        setState={setEncoding}
        value={enc}
      />
    );
  });

  let encodingParamsElement = encodingParamElems[encoding];

  return (
    <div className="gridItem" id="encoding">
      <div className="gridItemLabel">Encoding</div>
      <div className="encoding">
        <div className="encodingRadios">{encodingButtons}</div>
        <div className="encodingParams">{encodingParamsElement}</div>
      </div>
    </div>
  );
}
