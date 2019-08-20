import React from "react";
import { Link } from "react-router-dom";
import "./TVShowNavigationButtons.scss";

const TVShowNavigationButtons = () => {
  return (
    <div className="btn-div">
      <Link to={`/tv-shows/popular`} className="button tv-show">
        Popular
      </Link>

      <Link to={`/tv-shows`} className="button tv-show">
        Airing Today
      </Link>
      <Link to={`/tv-shows/top-rated`} className="button tv-show">
        Top Rated
      </Link>
      <Link to={`/tv-shows/now-on-the-air`} className="button tv-show">
        On The Air
      </Link>
    </div>
  );
};

export default TVShowNavigationButtons;
