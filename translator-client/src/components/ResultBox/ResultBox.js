import React from "react";
import "./ResultBox.css";
import { FiVolume2 } from "react-icons/fi";

export default function ResultBox({ result, copy, speak }) {
  if (!result) return null;

  return (
    <>
      <h3 className="result-title">Translation:</h3>

      <p className="result-text">{result}</p>

      <div className="result-info">
        <span>{result.length} characters</span>

        <div>
          <button className="copy-btn" onClick={copy}>Copy</button>

           {result.length > 0 && (
         <button className="audio-btn" onClick={() => speak(result, "ar")} title="Listen to the translation">
  <FiVolume2 size={20} />
        </button>


        )}
          

        </div>
      </div>
    </>
  );
}
