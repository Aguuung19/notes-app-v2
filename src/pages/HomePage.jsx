import React from "react";
import PropTypes from "prop-types";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api-data";
import NoteItemList from "../components/NoteItemList";
import LocaleContext  from "../contexts/LocaleContext";

function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const { locale } = React.useContext(LocaleContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });

    return () => {
      setLoading(false);
    };
  }, []);

  async function handleDelete(id) {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function handleArchive(id) {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }

   if (loading) {
     return <div>Loading...</div>;
   }

  return (
   
    <div className="notes-app">
      <h2>{locale === "en" ? "Notes" : "Catatan"}</h2>
      <NoteItemList
        notes={notes}
        onDelete={handleDelete}
        onArchive={handleArchive}
      />
    </div>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default HomePage;
