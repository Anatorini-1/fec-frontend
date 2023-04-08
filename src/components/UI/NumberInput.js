import React from "react";

export default function NumberInput({ title, value, onChange, min, max }) {
  return (
    <div style={{ textAlign: "right", padding: "5px" }}>
      <label htmlFor={title}>{title}</label>
      <input
        type={"number"}
        id={title}
        name={title}
        defaultValue={value}
        onChange={onChange}
        min={min}
        max={max}
        className="numberInput"
      />
    </div>
  );
}
