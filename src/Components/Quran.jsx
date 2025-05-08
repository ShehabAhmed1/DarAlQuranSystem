/*** imports ***/
import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { NavigateBtn } from "./Setting";
import { Link, useNavigate } from "react-router-dom";
/****  icons ****/

function Quran() {
  const [quran, setQuran] = useState([]);
  const navigate = useNavigate();
  /** fetch data from Api **/
  function fetchQuran() {
    //الحصري => https://api.alquran.cloud/v1/quran/ar.husary
    //مشاري => https://api.alquran.cloud/v1/quran/ar.alafasy
    fetch("https://api.alquran.cloud/v1/quran/ar.husary")
      .then((response) => response.json())
      .then((data) => {
        setQuran(data.data.surahs);
      })
      .catch((error) => console.error("خطأ في جلب البيانات:", error));
  }
  useEffect(() => {
    fetchQuran();
  }, []);

  return (
    <div className="quran">
      <Navbar />
      <div className="main-container">
        <div className="quran-content">
          {quran.map((surahObject, index) => {
            return (
              <Link
                to="/surah"
                className="surah-name"
                key={index}
                onClick={() => {
                  storeSurah(surahObject);
                }}
              >
                {surahObject.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// to put surah in session storage

function storeSurah(surahObject) {
  sessionStorage.setItem("surah", JSON.stringify(surahObject));
}

export default Quran;
