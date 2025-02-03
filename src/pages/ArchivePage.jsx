import React from "react";
import PropTypes from "prop-types";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api-data";
import NoteItemList from "../components/NoteItemList";
import LocaleContext from "../contexts/LocaleContext";

function ArchivedPage() {
  const [notes, setNotes] = React.useState([]);
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function handleDelete(id) {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  async function handleUnarchive(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  return (
    <div className="notes-app">
      <h2>{locale === "en" ? "Archived Notes" : "Catatan Terarsip"}</h2>
      <NoteItemList
        notes={notes}
        onDelete={handleDelete}
        onArchive={handleUnarchive}
      />
    </div>
  );
}

ArchivedPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default ArchivedPage;
