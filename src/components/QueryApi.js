import React from "react";
import "../style/QueryApi.css";
import axios from "axios";

export default function QueryApi({ requestBody, setRequestBody, setResult }) {
  const sendRequest = () => {
    axios
      .post("http://localhost:5000/api/send", requestBody)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="queryApi" className="gridItem">
      <div className="gridItemLabel">Summary</div>
      <table className="summaryTable" cellSpacing={"10px"}>
        <tbody>
          <tr>
            <td>Type</td>
            <td>{requestBody.type}</td>
          </tr>
          <tr>
            <td>Filesize</td>
            <td>{requestBody.data.length / 1000}kB</td>
          </tr>
          <tr>
            <td>Encoding</td>
            <td>{requestBody.encoding}</td>
          </tr>
          <tr>
            <td>Encoding Params</td>
            <td>{JSON.stringify(requestBody.encodingParams)}</td>
          </tr>
          <tr>
            <td>Channel Parameters</td>
            <td>{"PLACEHOLDER"}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={sendRequest}>Send Request</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
