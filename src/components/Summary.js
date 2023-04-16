import React from "react";
import "../style/QueryApi.css";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
function Summary({ requestBody, setRequestBody, setResult }) {
  const [isLoaded, setIsLoaded] = React.useState(true);

  const sendRequest = () => {
    setIsLoaded(false);
    axios
      .post("http://localhost:5000/api/send", requestBody)
      .then((response) => {
        setResult(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const summary = (
    <>
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
            <td>Channel Type</td>
            <td>{requestBody.channelType}</td>
          </tr>
          <tr>
            <td>Channel Parameters</td>
            <td>{JSON.stringify(requestBody.channelParams)}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={sendRequest}>Send Request</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const loader = (
    <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader" />
  );
  return (
    <div id="queryApi" className="gridItem">
      {isLoaded ? summary : loader}
    </div>
  );
}

export { Summary as default };
