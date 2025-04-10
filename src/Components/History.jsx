import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
/**** imports ***/
import { NavigateBtn } from "./Setting";
import Navbar from "./NavBar";
import "../App.css";
//DarAlQuranSystem
/*** anmations **/
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
function History() {
  //main variable to get all older data
  let lastMonth = JSON.parse(localStorage.getItem("currentMonth")) - 1;
  const allMonthsData = [];

  //get all monthes and store it in allMonthsData
  for (let i = lastMonth; i >= 1; i--) {
    let monthData = JSON.parse(localStorage.getItem(`month${i}`));
    if (!monthData) continue;
    allMonthsData.push(monthData);
  }

  return (
    <section className="history">
      <Navbar />
      <div className="history-content">
        <div className="main-container">
          {allMonthsData.map((DataMonth, index) => {
            return (
              <Table key={index} DataMonth={DataMonth} nummonth={lastMonth--} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/********* componants ************/
function Table({ DataMonth, nummonth }) {
  return (
    <motion.table
      variants={AniScale(0.5, 0)}
      whileInView="animate"
      initial="initial"
    >
      <caption className="table-titel">شهر{nummonth}</caption>
      <Thead />
      <Tbody DataMonth={DataMonth} />
    </motion.table>
  );
}

function Thead() {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>الطالب</th>
        <th>الاسم</th>
        <th>عدد الحصص</th>
        <th>التقدير</th>
      </tr>
    </thead>
  );
}

function Tbody({ DataMonth }) {
  //ranking DataMonth ascending
  const sortedArray = Object.values(DataMonth).sort(
    (a, b) => b.score - a.score
  );

  // stor ranking for all student
  const [ranking, setRanking] = useState([]);

  //to update ranks after return to avoid infinit loop
  useEffect(() => {
    let currentScore = null;
    let currentRank = 0;
    const ranks = [];

    sortedArray.forEach((values, index) => {
      if (values.score !== currentScore) {
        currentScore = values.score;
        currentRank = currentRank + 1;
      }
      ranks.push(currentRank);
    });

    setRanking(ranks);
  }, []);
  return (
    <tbody>
      {sortedArray.map((values, index) => (
        <Trow
          key={index}
          img={values.img}
          name={values.name}
          classes={values.Classes.filter((item) => item === true).length}
          score={values.score}
          ranking={ranking[index]}
        />
      ))}
    </tbody>
  );
}

function Trow({ img, name, classes, score, ranking }) {
  return (
    <tr>
      <td>{ranking}</td>
      <td>
        {" "}
        <img src={img} alt="" />
      </td>
      <td>{name}</td>
      <td>{classes}</td>
      <td className={score >= 50 ? (score >= 75 ? "green" : "gold") : "red"}>
        {score}%
      </td>
    </tr>
  );
}

export default History;
