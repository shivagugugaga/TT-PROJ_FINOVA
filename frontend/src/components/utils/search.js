import { memo } from "react";

const Search = memo(({ onChange, placeholder = "Search records..." }) => {
    return (
        <div className="search-input-wrap">
            <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
            <input
                type='text'
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
});

export default Search;