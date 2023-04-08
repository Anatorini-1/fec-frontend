import React from "react";
import "../../style/App.css";

export default function StateBoundButton({ text, state, setState, value }) {
  return (
    <button
      className="stateBoundButton"
      style={{
        backgroundColor: value === state ? "green" : "var(--row-bg)",
      }}
      onClick={() => {
        setState(value);
      }}
    >
      {text}
    </button>
  );
}
