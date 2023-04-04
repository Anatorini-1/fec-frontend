import React from "react";
import { useState, useEffect } from "react";
import "../style/InputData.css";
import axios from "axios";

export default function InputData({ requestBody, setRequestBody }) {
  const [inputType, setInputType] = useState("plainText");
  const [inputField, setInputField] = useState();

  useEffect(() => {
    switch (inputType) {
      case "plainText":
        setInputField(
          <textarea
            rows={6}
            cols={20}
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec"
          ></textarea>
        );
        break;
      case "img":
        setInputField(<input type="file" />);
        break;
      case "textFile":
        setInputField(<input type="file" />);
        break;
    }
  }, [inputType]);

  const inputTypeChange = (event) => {
    setInputType(event.target.value);
  };

  const inputDataSubmitted = (event) => {
    event.preventDefault();
    console.log("Input Data Submitted");
    if (inputType == "plainText") {
      setRequestBody({
        ...requestBody,
        data: event.target.value,
        type: "plainText",
      });
    }
  };
  return (
    <div id="inputData" className="gridItem">
      <div className="gridItemLabel">Input Data</div>
      <div className="inputData">
        <div className="inputType">
          <form onInput={inputTypeChange}>
            <input
              type="radio"
              defaultChecked
              id="plainText"
              name="inputType"
              value="plainText"
            />
            <label htmlFor="plainText">Plain Text</label>
            <br />
            <input type="radio" id="img" name="inputType" value="img" />
            <label htmlFor="img">Image</label>
            <br />
            <input
              type="radio"
              id="textFile"
              name="inputType"
              value="textFile"
            />
            <label htmlFor="textFile">Text File</label>
          </form>
        </div>
        <div className="inputDataField">
          <form onChange={inputDataSubmitted}>{inputField}</form>
        </div>
      </div>
    </div>
  );
}
