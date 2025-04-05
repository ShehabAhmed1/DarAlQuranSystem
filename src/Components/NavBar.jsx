import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
/***** imports  ******/
import { NavigateBtn } from "./Setting";
/****************** */
/*** icons ***/
import { FaBars } from "react-icons/fa6";
/***** animations ***********/
const fromTop = (duration) => {
  return {
    initial: {
      top: -70,
    },
    animate: {
      top: 0,
      transition: {
        duration: duration,
      },
    },
  };
};
/************************ */
const links = [
  {
    name: "صفحة السباق",
    path: "/",
  },
  {
    name: "تعليمات الكتاب",
    path: "/instructions",
  },
  {
    name: "القرءان كامل",
    path: "/quran",
  },
  {
    name: "مخزن التقيمات",
    path: "/history",
  },
  {
    name: "الملاحظات",
    path: "/notes",
  },
];
function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="navbar"
      variants={fromTop(0.5)}
      initial="initial"
      animate="animate"
    >
      <div className="main-container">
        <div className="nav-content">
          <ul className="links">
            {links.map((l, index) => {
              return (
                <Link key={index} to={l.path}>
                  {l.name}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
