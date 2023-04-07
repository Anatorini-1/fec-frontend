import React from "react";
import { useState, useEffect } from "react";
import "../style/InputData.css";
import axios from "axios";
import icon from "../img/1160358.png";

export default function InputData({ requestBody, setRequestBody }) {
  const [inputType, setInputType] = useState("plainText");
  const [inputField, setInputField] = useState();
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
              <input
                type="file"
                id="image"
                alt="Image"
                accept="image/png, image/jpeg, image/bmp"
              />
            </div>
          </>
        );
        break;
      case "textFile":
        setInputField(
          <input
            type="file"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        );
        break;
    }
  }, [inputType]);

  const inputTypeChange = (event) => {
    event.preventDefault();
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
    }
  };

  const inputTypes = [
    { name: "Plain Text", value: "plainText" },
    { name: "Image", value: "img" },
    { name: "Text File", value: "textFile" },
  ];
  inputTypes.forEach((it) => {
    buttons.push(
      <button
        name={it.name}
        value={it.value}
        key={it.value}
        onClick={inputTypeChange}
        style={{
          backgroundColor:
            it.value == inputType ? "green" : "rgba(255,255,255,0.2)",
        }}
      >
        {it.name}
      </button>
    );
  });
  return (
    <div id="inputData" className="gridItem">
      <div className="gridItemLabel">Input Data</div>
      <div className="inputData">
        <div className="inputType">
          <form onInput={inputTypeChange}>{buttons}</form>
        </div>
        <div className="inputDataField">
          <form enctype="multipart/form-data" onChange={inputDataSubmitted}>
            {inputField}
          </form>
        </div>
      </div>
    </div>
  );
}
