import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

function NoteItemList({ notes, onDelete, onArchive }) {
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <NoteItem
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    body={note.body}
                    createdAt={note.createdAt}
                    archived={note.archived}
                    onDelete={onDelete}
                    onArchive={onArchive}
                />
            ))}
        </div>
    );
}

NoteItemList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default NoteItemList;