import React from "react";
import PropTypes from "prop-types";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";

function NoteItem({ title, body, createdAt, id , onDelete, archived, onArchive }) {
    return (
      <div className="note-item">
        <NoteItemBody title={title} body={body} createdAt={createdAt} />
        <div className="note-item__action">
          <DeleteButton id={id} onDelete={onDelete} />
          <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
        </div>
      </div>
    );
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    archived: PropTypes.bool.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default NoteItem;