import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiLogOut, FiArchive } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import  LocaleContext  from "../contexts/LocaleContext";
import  ThemeContext  from "../contexts/ThemeContext";

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <nav className="navigation">
      <ul>
        <li>
          <button className="button-locale" onClick={toggleLocale}>
            {locale === "id" ? "en" : "id"}
          </button>
        </li>
        <li>
          <button className="button-theme" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </li>
        <li>
          <Link to="/">
            <FiHome />
          </Link>
        </li>
        <li>
          <Link to="/archivedNote">
            <FiArchive />
          </Link>
        </li>
        <li>
          <Link to="/addNote">
            <FiPlusCircle />
          </Link>
        </li>
        <li>
          <button className="button-logout" onClick={logout}>
            {name} <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
