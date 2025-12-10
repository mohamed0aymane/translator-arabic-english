import React from "react";
import "./TextInputBox.css";

export default function TextInputBox({ text, setText, speak }) {
  return (
    <div className="text-input-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type English text here..."
      />

      <div className="text-input-info">
        <span>{text.length} characters</span>

        {text.length > 0 && (
          <button className="audio-btn" onClick={() => speak(text, "en-US")}>
            Listen
          </button>

        )}
      </div>
    </div>
  );
}
