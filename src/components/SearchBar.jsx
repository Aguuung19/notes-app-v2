import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
    const { locale } = React.useContext(LocaleContext);

    return (
        <div className="search-bar">
            <input
                type="text"
                value={keyword}
                onChange={(event) => keywordChange(event.target.value)}
                placeholder={locale === "id" ? "Cari berdasarkan Nama..." : "Search by Name..."}
            />
        </div>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;