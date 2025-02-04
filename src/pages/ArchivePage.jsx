import React from "react";
import PropTypes from "prop-types";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api-data";
import NoteItemList from "../components/NoteItemList";
import LocaleContext from "../contexts/LocaleContext";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

function ArchivedPage() {
    const [notes, setNotes] = React.useState([]);
    const { locale } = React.useContext(LocaleContext);
  const [loading, setLoading] = React.useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(keyword) { 
    setSearchParams({ keyword });
  }

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
        setNotes(data);
        setLoading(false);
    });
      
    return () => {
      setLoading(false);
    };
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
  
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );
    
    if (loading) {
        return <div>Loading...</div>;
    };

  return (
    <div className="notes-app">
      <h2>{locale === "en" ? "Archived Notes" : "Catatan Terarsip"}</h2>
      <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
      <NoteItemList
        notes={filteredNotes}
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
