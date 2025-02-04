import React from "react";
import PropTypes from "prop-types";
import { FiArchive , FiRepeat } from "react-icons/fi";

function ArchiveButton({id, archived, onArchive}) {
    
    return (
        <button className="button-archive" onClick={() => onArchive(id)}>
            {archived ? <FiRepeat /> : <FiArchive />}
        </button>
    );
}

ArchiveButton.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;


