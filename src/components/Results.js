import React from "react";
import "../style/Results.css";
import JSONPretty from "react-json-pretty";
import { Buffer } from "buffer";
import JSONPRETTYTheme from "react-json-pretty/dist/monikai";
export default function Results({ result }) {
  const generateImageFromBase64 = (data) => {
    return Buffer.from(data, "binary").toString("base64");
  };

  const xD = result.data ? (
    <>
      <img
        src={"data:image/bmp;base64," + generateImageFromBase64(result.data)}
      />
    </>
  ) : (
    <></>
  );
  if (result.data) result.data = result.data.substring(0, 100) + "...";
  return (
    <div id="result" className="gridItem">
      <div className="gridItemLabel">Results</div>
      <div className="resultsDiv">
        <JSONPretty data={result} theme={JSONPRETTYTheme}></JSONPretty>
        {xD}
      </div>
    </div>
  );
}
