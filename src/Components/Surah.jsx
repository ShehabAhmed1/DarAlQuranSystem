import { li } from "framer-motion/client";
import { useState, useRef } from "react";

/*** imports  ***/
import Navbar from "./NavBar";
import { SettingContoles } from "./Setting";
import { a } from "framer-motion/m";
/*** icons ***/

function Surah() {
  const [surah, setSurah] = useState(
    JSON.parse(sessionStorage.getItem("surah")) || {}
  );
  const [ayahPlay, setayahplay] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className="surah-page">
      <Navbar />
      <SettingContoles
        showSetting={showSetting}
        SetShowSetting={setShowSetting}
      />
      <Controles
        audioRef={audioRef}
        surah={surah}
        setAyahPlay={setayahplay}
        showSetting={showSetting}
      />
      <div className="surah">
        <h1 className="surah-name">{surah.name}</h1>
        <h1>بسم الله الرحمن الرحيم</h1>
        <ul className="surah-content">
          {surah.ayahs.map((ayahInfo, index) => {
            return (
              <li
                key={index}
                id={`_${index}`}
                className={`${index == ayahPlay ? "active" : ""}`}
                onClick={() => {
                  playAudio(index, audioRef, surah, setayahplay);
                }}
              >
                {removeBismillah(ayahInfo.text)}
                {`(${ayahInfo.numberInSurah})`}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/***********components *************/
function Controles({ audioRef, surah, setAyahPlay, showSetting }) {
  return (
    <div className={`controles ${showSetting ? "active" : ""}`}>
      <button
        className="pause"
        onClick={() => {
          pauseAudio(audioRef);
        }}
      >
        وقف
      </button>
      <button
        className="pause"
        onClick={() => {
          playCurrentAudio(audioRef);
        }}
      >
        شغل
      </button>
      <button
        className="pause"
        onClick={() => {
          playSurah(0, audioRef, surah, setAyahPlay);
        }}
      >
        {" "}
        شغل السورة كامله{" "}
      </button>
    </div>
  );
}

// remove "بسم الله الرحمن الرحيم" from first ayah
const removeBismillah = (text) => {
  const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
  return text.startsWith(bismillah) ? text.replace(bismillah, "").trim() : text;
};

// play ayah when click on it
const playAudio = (index, audioRef, surah, setAyahPlay) => {
  if (audioRef.current) {
    audioRef.current.pause(); // pause current audio
  }
  setAyahPlay(index); // active ayah now
  audioRef.current = new Audio(surah.ayahs[index].audio); // get ayah audio
  audioRef.current.play(); // play audio
};

//play surah from start to end
const playSurah = (index, audioRef, surah, setAyahPlay) => {
  //play ayah
  playAudio(index, audioRef, surah, setAyahPlay);

  //clean old events
  if (audioRef.current.onended) {
    audioRef.current.onended = null;
  }

  //event handelar in audio when audio end do ....
  audioRef.current.onended = () => {
    //check is surah end
    if (index + 1 >= surah.ayahs.length) {
      //start again from ayah 0 active ayah 0
      setAyahPlay(0);

      //start surah again from ayah 0
      playSurah(0, audioRef, surah, setAyahPlay);
    } else {
      //start next ayah
      playSurah(index + 1, audioRef, surah, setAyahPlay);
    }
  };
};

//  pause current Audio
const pauseAudio = (audioRef) => {
  if (audioRef.current) {
    audioRef.current.pause();
  }
};

//  play current Audio
const playCurrentAudio = (audioRef) => {
  if (audioRef.current) {
    audioRef.current.play();
  }
};

export default Surah;
