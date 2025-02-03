import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiHome, FiArchive, FiPlusCircle, FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navigation({ logout, name, theme, toggleTheme }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
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
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Navigation;
