import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { getUserLogged, putAccessToken } from "../utils/api-data"; 
import { LocaleProvider } from "../contexts/LocaleContext";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      LocaleContext: {
        locale: localStorage.getItem("locale") || "en",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.LocaleContext.locale === "en" ? "id" : "en";
            localStorage.setItem("locale", newLocale);
            return {
              LocaleContext: {
                ...prevState.LocaleContext,
                locale: newLocale,
              },
            };
          });
        },
      },
      };
      
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

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
      <LocaleProvider value={this.state.localeContext}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>
              {this.state.localeContext.locale === "id"
                ? "Aplikasi Kontak"
                : "Contacts App"}
            </h1>
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<p>homepage </p>} />
              <Route path="/addNote" element={<p>tambah </p>} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}

export default NotesApp;