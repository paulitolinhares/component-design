import React from "react";
import "./Button.css";

export default function Button({ onClick, text, color }) {
  return (
    <button onClick={onClick} className={`button button--${color}`}>
      {text}
    </button>
  );
}
