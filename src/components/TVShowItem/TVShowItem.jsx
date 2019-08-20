import React from "react";
import { Link } from "react-router-dom";
import Rater from "react-rater";
import Fade from "react-reveal/Fade";

const TVShowItem = ({ poster, id, title, releaseDate, voteAvg }) => {
  const _id = id.toString();

  return (
    <Link
      to={`/tv-show-info/${_id}`}
      onClick={() => this.props.history.push(`/tv-show-info/${_id}`)}
      className="card"
    >
      <Fade delay={100}>
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
      </Fade>
    </Link>
  );
};

export default TVShowItem;
