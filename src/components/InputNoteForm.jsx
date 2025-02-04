import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext"; 

function InputNoteForm({ addNote }) {
  const { value: title, handleValueChange: handleTitleChange } = useInput("");
  const { locale } = React.useContext(LocaleContext);
  const [body, setContent] = React.useState("");
  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setContent(event.target.innerHTML);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addNote({
      title,
      body,
    });
    navigate("/");
  };

  return (
    <section className="add-new-page__input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={locale === "id" ? "Judul Catatan" : "Note Title"}
          value={title}
          onChange={handleTitleChange}
          required
          className="add-new-page__input__title"
        />
        <div
          contentEditable
          placeholder={locale === "id" ? "isi Catatan" : "Note Content"}
          onInput={handleContentChange}
          className="add-new-page__input__body"
        />
        <button type="submit" className="button-add">
          {locale === "id" ? "Tambah Catatan" : "Add Note"}
        </button>
      </form>
    </section>
  );
}

InputNoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default InputNoteForm;
