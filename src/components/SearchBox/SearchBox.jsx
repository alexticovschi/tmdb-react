import React from "react";
import './SearchBox.scss';

const SearchBox = ({ onSearchChange, getMovies }) => {
    const onFormSubmit = (e) => e.preventDefault();

    return (
        <form onSubmit={onFormSubmit}>
            <input 
                onChange={onSearchChange} 
                onKeyPress={getMovies} 
                className="searchBox" type="search" 
                name="search" 
                placeholder="Search Movie..." 
            />
            <input 
                onClick={getMovies} 
                className="searchBoxBtn" 
                type="button" 
                value="Search" 
            />
        </form>
    );
  };

export default SearchBox;