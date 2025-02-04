import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api-data";
import InputNoteForm from "../components/InputNoteForm";
import LocaleContext from "../contexts/LocaleContext";

function InputNotePage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  async function handleSubmit(note) {
    await addNote(note);
    navigate("/");
  }

  return (
    <div className="add-new-page__input">
      <h2>{ locale === 'id' ? "Tambah Catatan" : "Add Note"}</h2>
      <InputNoteForm addNote={handleSubmit} />
    </div>
  );
}

export default InputNotePage;
