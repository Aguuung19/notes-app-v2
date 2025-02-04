import React from "react";
import PropTypes from "prop-types";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api-data";
import NoteItemList from "../components/NoteItemList";
import LocaleContext from "../contexts/LocaleContext";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const { locale } = React.useContext(LocaleContext);
    const [loading, setLoading] = React.useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    function changeSearchParams(keyword) { 
        setSearchParams({ keyword });
    }

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
    
    const filteredNotes = notes.filter((note) => 
        note.title.toLowerCase().includes(keyword.toLowerCase())
    );

   if (loading) {
     return <div>Loading...</div>;
   }

  return (
   
    <div className="notes-app">
          <h2>{locale === "en" ? "Notes" : "Catatan"}</h2>
            <SearchBar keyword={keyword} keywordChange={changeSearchParams} />
      <NoteItemList
        notes={filteredNotes}
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
