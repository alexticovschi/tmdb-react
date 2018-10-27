import React from "react";
import './SearchBox.css';
const SearchBox = () => {
  const onFormSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" name="search" placeholder="Search Movie..." />
      <input type="button" value="Search" />
    </form>
  );
};

export default SearchBox;