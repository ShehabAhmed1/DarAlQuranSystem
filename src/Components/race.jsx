import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delay, motion } from "framer-motion";

/** import components **/
import Navbar from "./NavBar";
/***********************/
import { IoMdCloseCircle } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
/***** animations ***********/
const AniScale = (duration, delayTime) => {
  return {
    initial: {
      scale: 0.5,
    },
    animate: {
      scale: 1,
      transition: {
        duration: duration,
        delay: delayTime,
      },
    },
  };
};
/************************ */

const percentage = 12.5;
function Race() {
  //usestate to controle database
  let [Database, setDatabase] = useState(
    JSON.parse(localStorage.getItem("Quran_Database") || "[]")
  );

  //usestate to controle current Month
  let [currentMonth, setcurrentMonth] = useState(
    JSON.parse(localStorage.getItem("currentMonth"))
  );

  //usestate to show note field
  const [showNote, setShowNote] = useState(false);
  return (
    <section className="race">
      <Navbar />
      <NoteBox showNote={showNote} setShowNote={setShowNote} />
      {Database.length == 0 ? (
        <ul className="prepared">
          <h1>.لو مفيش طلاب يبقي محتاج تحمل بياناتهم</h1>
          <li>
            <FaArrowLeft /> اضغط علي علامة الاعدادات
          </li>
          <li>
            {" "}
            <FaArrowLeft /> اضغط رجع كل حاجه زي مهي
          </li>
        </ul>
      ) : (
        <section className="students">
          <div className="main-container">
            {Object.entries(Database).map(([key, s]) => {
              return (
                <StudentBox
                  id={key}
                  key={key}
                  name={s.name}
                  score={s.score}
                  img={s.img}
                  classes={s.Classes}
                  setDatabase={setDatabase}
                  currentMonth={currentMonth}
                  showNote={showNote}
                  setShowNote={setShowNote}
                />
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}

function StudentBox({
  id,
  name,
  score,
  img,
  classes,
  setDatabase,
  currentMonth,
  showNote,
  setShowNote,
}) {
  return (
    <div className="student-box">
      <Student
        id={id}
        name={name}
        score={score}
        img={img}
        setDatabase={setDatabase}
        currentMonth={currentMonth}
      />
      <div className="additions">
        <Classes id={id} classes={classes} setDatabase={setDatabase} />
        <NoteButton showNote={showNote} setShowNote={setShowNote} />
      </div>
    </div>
  );
}

//student componant
function Student({ id, name, score, img, setDatabase, currentMonth }) {
  return (
    <div className="student" id={id}>
      <div className="s-header">
        <span className="s-name">{name + " " + id}</span>
      </div>
      <div className="student-progress">
        <div className="new-content">
          <h1>الجديد</h1>
          <Progress score={score} img={img} type={"new"} />
          <Pcontroler
            id={id}
            setDatabase={setDatabase}
            currentMonth={currentMonth}
            type={"new"}
          />
        </div>
        <span className="sperator"></span>
        <div className="old-content">
          <h1>الماضي</h1>
          <Progress score={score} img={img} type={"old"} />
          <Pcontroler id={id} setDatabase={setDatabase} type={"old"} />
        </div>
      </div>
      <div className="currentMonth">
        <p>الشهر الحالي</p>
        <span>{currentMonth}</span>
      </div>
    </div>
  );
}

function Progress({ score, img, type }) {
  const value = score[type]; // dynamically get the correct score type
  const validatedValue = value > 100 || value < 0 ? 0 : value;

  return (
    <div className="progress">
      <figure
        style={{
          right: `calc(${validatedValue}% - 35px)`,
        }}
        data-percentage={validatedValue + "%"}
      >
        <img src={img} alt="Progress marker" />
        <span className="after"></span>
      </figure>

      <div className="score">
        <span
          className={`score-movement ${
            validatedValue >= 75
              ? "green"
              : validatedValue >= 50
              ? "gold"
              : "red"
          }`}
          style={{
            width: `${validatedValue}%`,
          }}
        ></span>
      </div>
    </div>
  );
}

//componant that controle in progress + or - it
function Pcontroler({ id, setDatabase, type }) {
  return (
    <div className="controler">
      <div className="p_controler">
        <button
          className="increase"
          onClick={() => update(id, "increase", setDatabase, type)}
        >
          +
        </button>
        <button
          className="decrease"
          onClick={() => update(id, "decrease", setDatabase, type)}
        >
          -
        </button>
      </div>
    </div>
  );
}

//component show classes that student get it
function Classes({ id, classes, setDatabase }) {
  return (
    <div className="classes">
      <div className="box">
        <span>1</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[0]}
          onChange={() => attendeding(id, 0, setDatabase)}
        />
      </div>

      <div className="box">
        <span>2</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[1]}
          onChange={() => attendeding(id, 1, setDatabase)}
        />
      </div>

      <div className="box">
        <span>3</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[2]}
          onChange={() => attendeding(id, 2, setDatabase)}
        />
      </div>

      <div className="box">
        <span>4</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[3]}
          onChange={() => attendeding(id, 3, setDatabase)}
        />
      </div>

      <div className="box">
        <span>5</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[4]}
          onChange={() => attendeding(id, 4, setDatabase)}
        />
      </div>

      <div className="box">
        <span>6</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[5]}
          onChange={() => attendeding(id, 5, setDatabase)}
        />
      </div>

      <div className="box">
        <span>7</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[6]}
          onChange={() => attendeding(id, 6, setDatabase)}
        />
      </div>

      <div className="box">
        <span>8</span>
        <input
          type="checkbox"
          name="class"
          checked={classes[7]}
          onChange={() => attendeding(id, 7, setDatabase)}
        />
      </div>
    </div>
  );
}

//component button to show notes
function NoteButton({ showNote, setShowNote }) {
  return (
    <button
      className="notes-btn"
      onClick={() => {
        setShowNote(!showNote);
      }}
    >
      اكتب ملاحظه
    </button>
  );
}
//component  write notes
function NoteBox({ showNote, setShowNote }) {
  //usestates to save note data
  const [stuId, setstuId] = useState(null);
  const [date, setDate] = useState(null);
  const [note, setNote] = useState(null);
  return (
    showNote && (
      <form className="note-box">
        <span
          className="close"
          onClick={() => {
            setShowNote(false);
          }}
        >
          <IoMdCloseCircle />
        </span>
        <label htmlFor="">رقم الطالب : </label>
        <input
          type="number"
          min={1}
          required
          onChange={(event) => {
            setstuId(parseInt(event.target.value));
          }}
        />
        <label htmlFor="">التاريخ:</label>
        <input
          type="date"
          required
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <label htmlFor="">الملاحظات:</label>
        <textarea
          required
          onChange={(event) => {
            setNote(event.target.value);
          }}
        ></textarea>
        <input
          type="submit"
          value="سجل الملاحظات"
          onClick={() => {
            if (stuId && date && note) {
              addNote(stuId, date, note);
              setShowNote(!showNote);
            }
          }}
        />
      </form>
    )
  );
}

/*********** function ****************/

//to update localstorage + or -
function update(id, word, setDatabase, type) {
  //get old database
  let Database = JSON.parse(localStorage.getItem("Quran_Database"));

  if (!Database) return; // make sure that there is database

  //check you and increase or decrease
  if (word == "increase") {
    Database[id].score[type] += Database[id].score[type] < 100 ? percentage : 0;

    /*this to update usestate so
    when change happen in mainDatabase don't need to 
    reload to see new version but the use will change
     so return new component*/
    setDatabase(Database);
  } else if (word == "decrease") {
    Database[id].score[type] -= Database[id].score[type] > 0 ? percentage : 0;
    setDatabase(Database);
  }
  localStorage.setItem("Quran_Database", JSON.stringify(Database));
}

//to assign classes in localstorage
function attendeding(id, classnum, setDatabase) {
  //get database
  let database = JSON.parse(localStorage.getItem("Quran_Database"));
  //update class to this id
  database[id].Classes[classnum] = !database[id].Classes[classnum];
  //return new database
  localStorage.setItem("Quran_Database", JSON.stringify(database));
  //update state
  setDatabase(database);
}

//add note to localstorage for this student
function addNote(id, data, note) {
  let database = JSON.parse(localStorage.getItem("Quran_Database"));
  note += `( ${data} )`;
  database[id].notes.push(note);
  localStorage.setItem("Quran_Database", JSON.stringify(database));
}

export { Race };
