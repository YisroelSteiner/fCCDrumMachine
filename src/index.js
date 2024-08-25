import React from "react";
import { createRoot } from "react-dom/client";
import samples from "./assets/samples.json";
import "./styles/main.scss";

function Pad({clip}) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function handleKeyPress(e) {
    if (e.keyCode === clip.keyCode) {
      playClip();
    }
  }

  function playClip() {
    const audio = document.getElementById(clip.name);
    audio.currentTime = 0;
    audio.play();
    
    document.getElementById("display").textContent = clip.description;
  }

  return (
    <button id={clip.keyCode} className="drum-pad" onClick={playClip}>
      <audio id={clip.name} src={clip.src} className="clip"></audio>{clip.name}
    </button>
  );
}

function App() {
    return( <div id="drum-machine">
      <h2>Drum Machine</h2>
      <div id="display"></div>
        <div id="panel">
        {samples.map((el) => (
          <Pad key={el.keyCode} clip={el} />
        ))}
        </div>
      </div> );
  }

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
