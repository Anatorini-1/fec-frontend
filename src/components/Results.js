import React from "react";
import "../style/Results.css";
import JSONPretty from "react-json-pretty";
import JSONPRETTYTheme from "react-json-pretty/dist/monikai";
export default function Results({ result }) {
  return (
    <div id="result" className="gridItem">
      <div className="gridItemLabel">Results</div>
      <div className="resultsDiv">
        <JSONPretty data={result} theme={JSONPRETTYTheme}></JSONPretty>
      </div>
    </div>
  );
}
