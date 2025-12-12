import React, { useState } from "react";
import "./DashBoard.css";
import { FiMic } from "react-icons/fi"; 




import TextInputBox from "../TextInputBox/TextInputBox";
import ResultBox from "../ResultBox/ResultBox";

export default function DashBoard({ token }) {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [listening, setListening] = useState(false);

const translate = async () => {
    if (text.trim() === "") return;

    const response = await fetch("http://localhost:8080/api/translate", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ text }),
    });

    if (response.status === 403) {
      alert("Access forbidden: check your token/roles!");
      return;
    }

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
      selectedVoice = voices.find(v => v.lang.includes("ar-Mr")) || voices[0];
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice;
    speech.lang = selectedVoice.lang;
    speech.rate = 1;
    speech.pitch = 1;

    synth.cancel();
    synth.speak(speech);
  };

   const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; 
  recognition.interimResults = true;
  recognition.continuous = false;    
  recognition.maxAlternatives = 1;

  recognition.start();
  setListening(true);

  recognition.onresult = (event) => {
    
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    setText(transcript); 
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    setListening(false);
  };
};



  return (
    <div className="dashboard-container">
      <h2>English → Darija Translator</h2>

      <TextInputBox text={text} setText={setText} speak={speakText} />

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button onClick={translate} className="translate-btn">Translate</button>
        <button onClick={clearAll} className="clear-btn">Clear</button>
        <button 
          onClick={startListening} 
          className="audio-record-btn"
        >
          
          {listening ? "Listening..." : <FiMic size={20} /> }
        </button>
      </div>

      <ResultBox result={result} copy={copyToClipboard} speak={speakText} />
    </div>
  );
}