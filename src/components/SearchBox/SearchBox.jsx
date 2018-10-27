import React from "react";
import './SearchBox.css';

const SearchBox = ({ onSearchChange, getMovies }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onFormSubmit}>
      <input onChange={onSearchChange} type="text" name="search" placeholder="Search Movie..." />
      <input onClick={getMovies} type="button" value="Search" />
    </form>
  );
};

export default SearchBox;