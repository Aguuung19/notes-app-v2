import React from "react";
import PropTypes from "prop-types";
import { FiDelete } from "react-icons/fi";

function DeleteButton({ id, onDelete }) {

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            onDelete(id);
        }
    };

    return (
        <button className="button-delete" onClick={handleDelete}>
            <FiDelete />
        </button>
    );
}

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;