import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./style/App.css";
import "./style/Flex.css";

import Title from "./components/Title";
import Encoding from "./components/Encoding";
import InputData from "./components/InputData";
import Summary from "./components/Summary";
import Results from "./components/Results";
import ChannelConfig from "./components/ChannelConfig";

function App() {
  const [requestBody, setRequestBody] = useState({
    data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
    type: "plainText",
    encoding: "HAMMING",
    encodingParams: { 0: 3 },
  });
  const [result, setResult] = useState([1]);
  return (
    <div className="container">
      <Title />
      <InputData requestBody={requestBody} setRequestBody={setRequestBody} />
      <Encoding requestBody={requestBody} setRequestBody={setRequestBody} />
      <ChannelConfig
        requestBody={requestBody}
        setRequestBody={setRequestBody}
      />
      <Summary
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        result={result}
        setResult={setResult}
      />
      <Results
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        result={result}
        setResult={setResult}
      />
    </div>
  );
}

export default App;
