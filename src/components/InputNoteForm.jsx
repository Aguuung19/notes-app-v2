import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

function InputNoteForm({ addNote }) {
  const { value: title, handleValueChange: handleTitleChange } = useInput("");
  const [content, setContent] = React.useState("");
  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setContent(event.target.innerHTML);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addNote({
      title,
      content,
    });
    navigate("/");
  };

  return (
    <section className="add-new-page__input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul Catatan"
          value={title}
          onChange={handleTitleChange}
          required
          className="add-new-page__input__title"
        />
        <div
          contentEditable
          placeholder="Content"
          onInput={handleContentChange}
          className="add-new-page__input__body"
          
        />
        <button type="submit" className="add-new-page__action">
          Add Note
        </button>
      </form>
    </section>
  );
}

InputNoteForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default InputNoteForm;
