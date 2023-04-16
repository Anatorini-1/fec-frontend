import React from "react";
import { useState, useEffect } from "react";
import "../style/ChannelConfig.css";
import StateButton from "./UI/StateBoundButton";
import NumberInput from "./UI/NumberInput";

export default function ChannelConfig({ requestBody, setRequestBody }) {
  const [channelType, setChannelType] = useState("BinarySymetric");
  const [channelParams, setChannelParams] = useState([0]);
  const channelTypes = [
    "BinarySymetric", // Binary Symmetric Channel (takes only one parameter, BER{Bit-Error-Rate})
    "GilbertElliot", // Gilbert-Elliot Model
    "Manual", //Manual (pick your favourive disruptions at will)
  ];
  let channelButtons = channelTypes.map((ct) => {
    return (
      <StateButton
        text={ct}
        key={ct}
        state={channelType}
        setState={setChannelType}
        value={ct}
      />
    );
  });
  // eslint-disable-next-line
  useEffect(() => {
    switch (channelType) {
      case "BinarySymetric":
        setChannelParams([0]);
        break;
      case "GilbertElliot":
        setChannelParams([0, 0, 0, 0]);
        break;
      case "Manual":
        setChannelParams([0]);
        break;
      default:
        break;
    }
  }, [channelType]);

  useEffect(() => {
    setRequestBody({
      ...requestBody,
      channelType: channelType,
      channelParams: channelParams,
    });
    // eslint-disable-next-line
  }, [channelType, channelParams]);
  const channelParamsForm = {
    BinarySymetric: (
      <>
        <NumberInput
          title="BER [0-1]"
          value={channelParams[0]}
          onChange={(e) => setChannelParams([e.target.value])}
          min={0}
          max={1}
        />
      </>
    ),
    GilbertElliot: (
      <>
        <NumberInput
          key={"p0"}
          title="p1 [0-1]"
          value={channelParams[0]}
          onChange={(e) => {
            let newParams = channelParams;
            newParams[0] = e.target.value;
            setChannelParams(newParams);
          }}
          min={0}
          max={1}
        />
        <NumberInput
          key={"p1"}
          title="p2 [0-1]"
          value={channelParams[1]}
          onChange={(e) => {
            let newParams = channelParams;
            newParams[1] = e.target.value;
            setChannelParams(newParams);
          }}
          min={0}
          max={1}
        />
        <NumberInput
          key={"pg"}
          title="pg [0-1]"
          value={channelParams[2]}
          onChange={(e) => {
            let newParams = channelParams;
            newParams[2] = e.target.value;
            setChannelParams(newParams);
          }}
          min={0}
          max={1}
        />
        <NumberInput
          key={"pb"}
          title="pb [0-1]"
          value={channelParams[3]}
          onChange={(e) => {
            let newParams = channelParams;
            newParams[3] = e.target.value;
            setChannelParams(newParams);
          }}
          min={0}
          max={1}
        />
      </>
    ),
    Manual: <>TO BE IMPLEMENTED</>,
  };

  return (
    <div id="channelConfig" className="gridItem">
      <div className="gridItemLabel">Channel Config</div>
      <div className="flexContainer" id="channelConfigContainer">
        <div className="flexItem flex1" id="channelButtons">
          {channelButtons}
        </div>
        <div className="flexItem flex1" id="channelParams">
          <div id="centerMe">{channelParamsForm[channelType]}</div>
        </div>
      </div>
    </div>
  );
}
