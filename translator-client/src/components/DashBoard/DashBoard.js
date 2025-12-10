import React, { useState } from "react";
import "./DashBoard.css";

import TextInputBox from "../TextInputBox/TextInputBox";
import ResultBox from "../ResultBox/ResultBox";

export default function DashBoard() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const translate = async () => {
    if (text.trim() === "") return;

    const response = await fetch("http://localhost:8080/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResult(data.translatedText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Translation copied!");
  };

  const clearAll = () => {
    setText("");
    setResult("");
  };

  const speakText = (text, lang) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    // Si les voix ne sont pas encore chargées
    if (voices.length === 0) {
      synth.onvoiceschanged = () => speakText(text, lang);
      return;
    }
    let selectedVoice = voices.find(v =>
      v.lang.toLowerCase().startsWith(lang.toLowerCase())
    );
    // fallback si aucune voix arabe
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.includes("ar")) || voices[0];
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice;
    speech.lang = selectedVoice.lang;
    speech.rate = 1;
    speech.pitch = 1;

    synth.cancel();
    synth.speak(speech);
  };


  return (
    <div className="dashboard-container">
      <h2>English → Darija Translator</h2>

      <TextInputBox text={text} setText={setText} speak={speakText} />

      <button onClick={translate} className="translate-btn">
        Translate
      </button>
      <button onClick={clearAll} className="clear-btn">
        Clear
      </button>

      <ResultBox result={result} copy={copyToClipboard} speak={speakText} />
    </div>
  );
}
