import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delay, motion } from "framer-motion";

/** import components **/
import Navbar from "./NavBar";
/***********************/
import { IoMdCloseCircle } from "react-icons/io";
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
    JSON.parse(localStorage.getItem("database") || "[]")
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
      <Progress score={score} img={img} />
      <Pcontroler
        id={id}
        setDatabase={setDatabase}
        currentMonth={currentMonth}
      />
    </div>
  );
}

//componant that show the progress to the student
function Progress({ score, img }) {
  return (
    <div className="progress">
      <figure
        style={{
          //this is to controle progress's movement  and makesure that is not out off the container
          right: `calc(${score > 100 || score < 0 ? 0 : score}% - 35px)`,
        }}
        percentage={score + "%"}
      >
        <img src={img} alt="" />
        <span className="after"></span>
      </figure>
      <div className="score">
        <span
          className={`score-movement ${
            score >= 50 ? (score >= 75 ? "green" : "gold") : "red"
          }`}
          style={{ width: `${score > 100 || score < 0 ? 0 : score}%` }}
        ></span>
      </div>
    </div>
  );
}

//componant that controle in progress + or - it
function Pcontroler({ id, setDatabase, currentMonth }) {
  return (
    <div className="controler">
      <div className="p_controler">
        <button
          className="increase"
          onClick={() => update(id, "increase", setDatabase)}
        >
          +
        </button>
        <button
          className="decrease"
          onClick={() => update(id, "decrease", setDatabase)}
        >
          -
        </button>
      </div>
      <div className="currentMonth">
        <p>الشهر الحالي</p>
        <span>{currentMonth}</span>
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
function update(id, word, setDatabase) {
  //get old database
  let Database = JSON.parse(localStorage.getItem("database"));

  if (!Database) return; // make sure that there is database

  //check you and increase or decrease
  if (word == "increase") {
    Database[id].score += Database[id].score < 100 ? percentage : 0;

    /*this to update usestate so
    when change happen in mainDatabase don't need to 
    reload to see new version but the use will change
     so return new component*/
    setDatabase(Database);
  } else if (word == "decrease") {
    Database[id].score -= Database[id].score > 0 ? percentage : 0;
    setDatabase(Database);
  }
  localStorage.setItem("database", JSON.stringify(Database));
}

//to assign classes in localstorage
function attendeding(id, classnum, setDatabase) {
  //get database
  let database = JSON.parse(localStorage.getItem("database"));
  //update class to this id
  database[id].Classes[classnum] = !database[id].Classes[classnum];
  //return new database
  localStorage.setItem("database", JSON.stringify(database));
  //update state
  setDatabase(database);
}

//add note to localstorage for this student
function addNote(id, data, note) {
  let database = JSON.parse(localStorage.getItem("database"));
  note += `( ${data} )`;
  database[id].notes.push(note);
  localStorage.setItem("database", JSON.stringify(database));
}

export { Race };
