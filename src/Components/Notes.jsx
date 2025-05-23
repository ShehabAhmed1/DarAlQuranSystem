/** imports **/
import { useState } from "react";
import Navbar from "./NavBar";
import { mainDatabase } from "./Setting";
import { li } from "framer-motion/client";
function Notes() {
  const [stuId, setStuId] = useState(null);
  function handelId(id) {
    if (id > 0 && id <= Object.keys(mainDatabase).length) {
      setStuId(id);
    } else {
      setStuId(null);
    }
  }
  const [getNotes, setGetNotes] = useState(false);
  return (
    <div className="notes-page">
      <Navbar />
      <div className="main-container main">
        <div className="notes-content">
          <FindNotes
            handelId={handelId}
            id={stuId}
            setGetNotes={setGetNotes}
            mainDatabase={mainDatabase}
          />
          <div className="student-notes">
            <h1>الملاحظات</h1>
            <GetStudentNotes id={stuId} getNotes={getNotes} />
          </div>
        </div>
      </div>
    </div>
  );
}

//component to find student note by id
function FindNotes({ handelId, id, setGetNotes, mainDatabase }) {
  return (
    <div className="notes-searching">
      <div className="find-field">
        <label>دخل رقم الطالب:</label>
        <input
          type="number"
          min={1}
          max={Object.keys(mainDatabase).length}
          required
          onChange={(event) => {
            handelId(parseInt(event.target.value));
            setGetNotes(false);
          }}
        />
        <input
          type="submit"
          value="هات الملاحظات"
          onClick={() => {
            if (id) setGetNotes(true);
          }}
        />
      </div>
      <ul className="stu_ids">
        {Object.values(mainDatabase).map((stu, index) => {
          return <li key={index}>{`${stu.name} => ${index + 1}`}</li>;
        })}
      </ul>
    </div>
  );
}

//component to git student note
function GetStudentNotes({ id, getNotes }) {
  const currentDatabase = JSON.parse(localStorage.getItem("Quran_Database"));
  const pravMonth = JSON.parse(localStorage.getItem("currentMonth")) - 1;
  const pravDatabase = JSON.parse(localStorage.getItem(`month${pravMonth}`));

  return (
    getNotes && (
      <div className="all-notes">
        <h2 className="stu-name">{currentDatabase[id].name}</h2>
        {/* //current month */}
        <ul className={`_${id}note`}>
          <h3> {`ملاحظات شهر ${pravMonth + 1}`} </h3>
          {currentDatabase && currentDatabase[id].notes.length ? (
            currentDatabase[id].notes.map((n, index) => {
              return <li key={index}>{n}</li>;
            })
          ) : (
            <li>ربنا يبارك فيه</li>
          )}
        </ul>

        {/* //prav month */}
        <ul className={`_${id}note`}>
          <h3>{`ملاحظات شهر ${pravMonth}`} </h3>
          {pravDatabase && pravDatabase[id].notes.length ? (
            pravDatabase[id].notes.map((n, index) => {
              return <li key={index}>{n}</li>;
            })
          ) : (
            <li>ربنا يبارك فيه</li>
          )}
        </ul>
      </div>
    )
  );
}

export default Notes;
