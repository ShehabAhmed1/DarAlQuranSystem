import { React, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { animate, motion } from "framer-motion";
/**imgs ***/
import shehab from "../assets/images/students/shehab_.png";
import fahd from "../assets/images/students/fahd.png";
import habiba_samy from "../assets/images/students/habiba-samy.png";
import mohamed_hosam from "../assets/images/students/mohamed_hosam.png";
import Abdelrahman_samy from "../assets/images/students/Abdelrahman_samy.png";
import Amen from "../assets/images/students/Amen.jpg";
import hamza from "../assets/images/students/Hamza.jpg";
import mohamed_Abdelazez from "../assets/images/students/Mohamed_Abdelazez.png";
/**** icons ****/
import { IoIosArrowBack } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
/***** animations ***/

/***** animations ***********/
const fromRight = (duration) => {
  return {
    initial: {
      x: 250,
    },
    animate: {
      x: 0,
      transition: {
        duration: duration,
      },
    },
  };
};
const spinning = () => {
  return {
    initial: {
      rotate: 0,
    },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
};
/************************ */
/*** options ***/
const mainDatabase = {
  1: {
    name: " فهد محمود",
    score: {
      new: 0,
      old: 0,
    },
    img: fahd,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  2: {
    name: "محمد حسام",
    score: {
      new: 0,
      old: 0,
    },
    img: mohamed_hosam,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  3: {
    name: "زياد محمد",
    score: {
      new: 0,
      old: 0,
    },
    img: shehab,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  4: {
    name: "حبيبة سامي",
    score: {
      new: 0,
      old: 0,
    },
    img: habiba_samy,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  5: {
    name: "عبدالرحمن سامي",
    score: {
      new: 0,
      old: 0,
    },
    img: Abdelrahman_samy,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  6: {
    name: "محمد عبدالعزيز",
    score: {
      new: 0,
      old: 0,
    },
    img: mohamed_Abdelazez,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  7: {
    name: "محمد اشرف",
    score: {
      new: 0,
      old: 0,
    },
    img: shehab,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
  8: {
    name: "حمزة علاء",
    score: {
      new: 0,
      old: 0,
    },
    img: hamza,
    Classes: [false, false, false, false, false, false, false, false],
    notes: [],
  },
};

function Setting() {
  // to route to history when i click on history button
  const navigate = useNavigate();
  const [showSetting, SetShowSetting] = useState(false);
  return (
    <div className="setting">
      <SettingContoles
        showSetting={showSetting}
        SetShowSetting={SetShowSetting}
      />
      <SettingOperations showSetting={showSetting} />
    </div>
  );
}

//component setting icons
function SettingContoles({ showSetting, SetShowSetting }) {
  return (
    <div
      className="setting-icon"
      onClick={() => {
        SetShowSetting(!showSetting);
      }}
    >
      <motion.div
        className="icon"
        variants={spinning()}
        initial="initial"
        animate={`${showSetting ? "animate" : ""}`}
      >
        <IoSettingsSharp />
      </motion.div>
    </div>
  );
}

//component setting operations
function SettingOperations({ showSetting }) {
  return (
    <div className={`setting-operations ${showSetting ? "active" : ""}`}>
      <ul>
        <li>
          <MdOutlineDateRange />
          <NextMonth />
        </li>
        <li>
          <FiRefreshCcw />
          <Reset />
        </li>
      </ul>
    </div>
  );
}

//componant that restart student data
function NextMonth() {
  return (
    <button
      className="new-month"
      onClick={() => {
        history();
        savelocalstorage(mainDatabase);
        AddcurrentMonth_local();
        window.location.reload();
      }}
    >
      ابدأ شهر جديد
    </button>
  );
}

//componant that reset all student data
function Reset() {
  return (
    <button
      className="reset-all"
      onClick={() => {
        resetAll();
        window.location.reload();
      }}
    >
      رجع كل حاجه زي ما هي
    </button>
  );
}

//to reset all
function resetAll() {
  localStorage.removeItem("Quran_Database");
  let currentMonth = JSON.parse(localStorage.getItem("currentMonth"));
  localStorage.removeItem("currentMonth");
  for (let i = currentMonth; i >= 1; i--) {
    console.log(i);
    localStorage.removeItem(`month${i}`);
  }
  savecurrentMonth();
  savelocalstorage(mainDatabase);
}

//to put currentMonth in localstorage
function savecurrentMonth() {
  const Dateobj = new Date();
  localStorage.setItem("currentMonth", JSON.stringify(Dateobj.getMonth() + 1));
}

//to put mainDatabase in localstorage
function savelocalstorage(mainDatabase) {
  if (!mainDatabase) return;
  localStorage.setItem("Quran_Database", JSON.stringify(mainDatabase));
}

//to save data throught months m1,m2...
function history() {
  let currentMonth = JSON.parse(localStorage.getItem("currentMonth"));
  let data = JSON.parse(localStorage.getItem("Quran_Database"));

  if (!currentMonth || !data) return;
  localStorage.setItem(`month${currentMonth}`, JSON.stringify(data));
}

//Add new currentMonth
function AddcurrentMonth_local() {
  let currentMonths = JSON.parse(localStorage.getItem("currentMonth"));
  if (!currentMonths) return;
  currentMonths += 1;
  localStorage.setItem("currentMonth", currentMonths);
}

function NavigateBtn({ name, navigate, path }) {
  return (
    <button className="historybtn" onClick={() => navigate(path)}>
      {name}
    </button>
  );
}

export { Setting, NavigateBtn, SettingContoles, mainDatabase };
