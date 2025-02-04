import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ArchivePage from "../pages/ArchivePage";
import InputNotePage from "../pages/InputNotePage";
import DetailNotePage from "../pages/DetailNotePage";
import PageNotFound from "../pages/PageNotFound";
import { getUserLogged, putAccessToken } from "../utils/api-data";
import { LocaleProvider } from "../contexts/LocaleContext";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      notes: [],
      localeContext: {
        locale: localStorage.getItem("locale") || "en",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "en" ? "id" : "en";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState({ authedUser: data, initializing: false });

    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  onLoginSuccess(user) {
    this.setState({ authedUser: user });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  }

  toggleTheme() {
    this.setState((prevState) => {
      const newTheme = prevState.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return { theme: newTheme };
    });
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
            <header className="contact-app__header">
              <h1>Notes App</h1>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>
              {this.state.localeContext.locale === "id"
                ? "Aplikasi Notes"
                : "Notes App"}
            </h1>
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
              theme={this.state.theme}
              toggleTheme={this.toggleTheme}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/note/:id" element={<DetailNotePage />} />
              <Route path="/archivedNote" element={<ArchivePage />} />
              <Route path="/addNote" element={<InputNotePage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}

export default NotesApp;
