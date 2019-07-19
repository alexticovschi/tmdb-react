import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ poster, id, mediaType }) => {
    
  const _id = id.toString();
  return (
    <Link
      to={mediaType === "movie" ? `/movie-info/${_id}` : `/tv-show-info/${_id}`}
      onClick={() => this.props.history.push(`/movie_info/${_id}`)}
      className="card"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="300"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="bottom"
    >
      <img src={poster} alt="film poster" />
    </Link>
  );
};

export default MovieItem;
