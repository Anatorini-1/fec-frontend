import React from "react";
import "../style/Results.css";
import JSONPretty from "react-json-pretty";
import { Buffer } from "buffer";
import JSONPRETTYTheme from "react-json-pretty/dist/monikai";
export default function Results({ result }) {
  const image =
    result.data && result.dataType == "img" ? (
      <>
        <img
          className="resultImage"
          src={"data:image/bmp;base64," + result.data}
          alt="Bitmap sent through channel"
        />
      </>
    ) : (
      <>Not an image lol</>
    );
  let tmp;
  if (result.data) tmp = result.data.substring(0, 500) + "...";
  return (
    <div id="result" className="gridItem">
      <div className="gridItemLabel">Results</div>

      <div className="resultsDiv">
        <div className="json">
          <JSONPretty
            data={{ ...result, data: tmp }}
            theme={JSONPRETTYTheme}
          ></JSONPretty>
        </div>
        <div className="image">{image}</div>
      </div>
    </div>
  );
}
