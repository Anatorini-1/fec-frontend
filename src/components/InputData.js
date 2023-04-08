import React from "react";
import { useState, useEffect } from "react";
import "../style/InputData.css";
import StateButton from "./UI/StateBoundButton";
import NumberInput from "./UI/NumberInput";
export default function InputData({ requestBody, setRequestBody }) {
  const [inputType, setInputType] = useState("plainText");
  const [inputField, setInputField] = useState();
  const [warning, setWarning] = useState("");
  let buttons = [];
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
        setInputField(
          <>
            <div>
              <label htmlFor="image" id="imageLabel">
                Choose an image
              </label>
              <input type="file" id="image" alt="Image" accept="image/bmp" />
            </div>
          </>
        );
        break;
      case "textFile":
        setInputField(
          <>
            <input type="file" accept=".txt" onClick={(e) => {}} />
          </>
        );
        break;
      case "random":
        setInputField(
          <NumberInput
            title="Length [kB]"
            value={null}
            onChange={(e) => {
              e.preventDefault();
            }}
            min={1}
            max={100}
          />
        );
    }
  }, [inputType]);

  const inputDataSubmitted = (event) => {
    event.preventDefault();
    console.log("Input Data Submitted");
    if (inputType == "plainText") {
      setRequestBody({
        ...requestBody,
        data: event.target.value,
        type: "plainText",
      });
    } else if (inputType == "img") {
      let fr = new FileReader();
      fr.readAsBinaryString(event.target.files[0]);
      fr.onload = () => {
        setRequestBody({
          ...requestBody,
          data: fr.result,
          type: "img",
          format: event.target.files[0].name.split(".").pop(),
        });
      };
    } else if (inputType == "random") {
      let len = event.target.value * 1000;
      let data = "";
      for (let i = 0; i < len; i++) {
        data += String.fromCharCode(Math.floor(Math.random() * 32) + 97);
      }

      setRequestBody({
        ...requestBody,
        data: data,
        type: "plainText",
      });
      if (len / 1000 >= 100) {
        setWarning(
          "Warning: The data over 100kB may take a long time to process."
        );
      } else if (len / 1000 < 100) {
        setWarning("");
      }
    }
  };

  const inputTypes = [
    { name: "Plain Text", value: "plainText" },
    { name: "Image", value: "img" },
    { name: "Text File", value: "textFile" },
    { name: "Random", value: "random" },
  ];
  inputTypes.forEach((it) => {
    buttons.push(
      <StateButton
        key={it.value}
        name={it.name}
        value={it.value}
        state={inputType}
        setState={setInputType}
        text={it.name}
      />
    );
  });
  return (
    <div id="inputData" className="gridItem">
      <div className="gridItemLabel">Input Data</div>
      <div className="inputData">
        <div className="inputType">{buttons}</div>
        <div className="inputDataField">
          <form enctype="multipart/form-data" onChange={inputDataSubmitted}>
            {inputField}
          </form>
          {warning}
        </div>
      </div>
    </div>
  );
}
