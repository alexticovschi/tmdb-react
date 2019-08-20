import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const MovieItem = ({ poster, id, mediaType }) => {
  const _id = id.toString();
  return (
    <Link
      to={mediaType === "movie" ? `/movie-info/${_id}` : `/tv-show-info/${_id}`}
      onClick={() => this.props.history.push(`/movie_info/${_id}`)}
      className="card"
    >
      <Fade>
        <img src={poster} alt="film poster" />
      </Fade>
    </Link>
  );
};

export default MovieItem;
