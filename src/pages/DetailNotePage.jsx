import React from "react";
import NoteItemDetail from "../components/NoteItemDetail";
import { getNote } from "../utils/api-data";
import { useParams } from "react-router-dom";

function DetailNotePage() {
  const { id } = useParams();
  const [note, setNote] = React.useState(null);

  React.useEffect(() => {
    getNote(id).then((data) => {
      setNote(data);
    });
  }, [id]);

  if (!note) {
    return <p>Loading...</p>;
    }
    
  return (
    <NoteItemDetail
      title={note.data.title}
      body={note.data.body}
      createdAt={note.data.createdAt}
    />
  );
}


export default DetailNotePage;
