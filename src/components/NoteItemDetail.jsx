import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { showFormattedDate } from "../utils/formatedDate";

function NoteItemDetail({ title, body, createdAt }) {

    return (
        <div className="detail-page">
            <h3 className="note-item__title">{title}</h3>
            <p className="note-item__createAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{parse(body)}</p>
        </div>
    );
}

NoteItemDetail.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default NoteItemDetail;