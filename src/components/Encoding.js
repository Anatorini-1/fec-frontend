import React from "react";
import { useState, useEffect } from "react";
import "../style/Encoding.css";
export default function Encoding({ requestBody, setRequestBody }) {
  const [encoding, setEncoding] = useState("HAMMING");
  const [encodingParams, setEncodingParams] = useState([3]);
  useEffect(() => {
    setRequestBody({
      ...requestBody,
      encoding: encoding,
      encodingParams: encodingParams,
    });
  }, [encoding, encodingParams]);

  const encodingChange = (event) => {
    setEncoding(event.target.value);
  };

  const encodingParamsChange = (event) => {
    switch (encoding) {
      case "HAMMING":
        setEncodingParams([parseInt(event.target.value)]);
        break;
      case "REPEAT":
        setEncodingParams([parseInt(event.target.value)]);
    }
  };

  const encodingParamElems = {
    HAMMING: (
      <>
        <fieldset>
          <legend>Redundancy per block</legend>
          <input type="number" name="param" defaultValue={3} />
        </fieldset>
      </>
    ),
    REPEAT: (
      <>
        <input type="number" name="param" />
      </>
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

  let radios = [
    <>
      <input
        type="radio"
        id={encodings[0]}
        name="encoding"
        defaultChecked
        value={encodings[0]}
      ></input>
      <label htmlFor={encodings[0]}>{encodings[0]}</label>
      <br />
    </>,
  ];

  for (let i = 1; i < encodings.length; i++) {
    radios.push(
      <>
        <input
          type="radio"
          id={encodings[i]}
          name="encoding"
          value={encodings[i]}
        ></input>
        <label htmlFor={encodings[i]}>{encodings[i]}</label>
        <br />
      </>
    );
  }

  let encodingParamsElement = encodingParamElems[encoding];

  return (
    <div className="gridItem" id="encoding">
      <div className="gridItemLabel">Encoding</div>
      <div className="encoding">
        <div className="encodingRadios">
          <form onChange={encodingChange}>{radios}</form>
        </div>
        <div className="encodingParams">
          <form onChange={encodingParamsChange}>{encodingParamsElement}</form>
        </div>
      </div>
    </div>
  );
}
