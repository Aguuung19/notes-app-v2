import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ArchivedPage from "../pages/ArchivePage";
import InputNotePage from "../pages/InputNotePage";
import PageNotFound from "../pages/PageNotFound";
import DetailNotePage from "../pages/DetailNotePage";
import { getUserLogged, putAccessToken } from "../utils/api-data"; 
import { LocaleProvider } from "../contexts/LocaleContext";
import { ThemeProvider } from "../contexts/ThemeContext";



class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      notes: [],
      theme: localStorage.getItem("theme") || "light",
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


;

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    this.updateTheme();
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  updateTheme = () => {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  };

  toggleTheme = () => {
    this.setState(
      (prevState) => {
        const newTheme = prevState.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
      },
      () => this.updateTheme()
    );
  };

  toggleLocale = () => {
    this.setState((prevState) => {
      const newLocale = prevState.locale === "en" ? "id" : "en";
      localStorage.setItem("locale", newLocale);
      return { locale: newLocale };
    });
  };

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
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
      <ThemeProvider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        <LocaleProvider
          value={{ locale: this.state.locale, toggleLocale: this.toggleLocale }}
        >
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
              />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/note/:id" element={<DetailNotePage />} />
                <Route path="/archivedNote" element={<ArchivedPage />} />
                <Route path="/addNote" element={<InputNotePage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default NotesApp;