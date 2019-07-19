import React from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";

const TVShowItem = ({ poster, id, title, releaseDate, voteAvg }) => {
  const _id = id.toString();

  return (
    <Link
      to={`/tv-show-info/${_id}`}
      onClick={() => this.props.history.push(`/tv-show-info/${_id}`)}
      className="card"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="200"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="bottom"
    >
      <div className="frame">
        <img src={poster} alt="film poster" />

        <div className="details">
          <h2 className="card-title">{title}</h2>
          <h3 className="card-title">{releaseDate}</h3>
          <div className="star-rating">
            <Rater interactive={false} total={5} rating={voteAvg / 2} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TVShowItem;
