import React from 'react';
import { Link } from 'react-router-dom';
import './MovieItem.scss';
import Rater from 'react-rater';

const MovieItem = ({poster, id, title, releaseDate, voteAvg, mediaType}) => {
    const _id = id.toString();
    console.log()
    return (
        <Link 
            to={`/movie-info/${_id}`} 
            // to={mediaType === 'movie' ? `/movie-info/${_id}` :  `/tv-show-info/${_id}`} 
            onClick={() => this.props.history.push({}`/movie-info/${_id}`)} 
            className="card" 
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="100"
            data-aos-easing="ease-in-out"
            data-aos-anchor-placement="top"
        >
            <div className="frame">
                <img src={poster} alt="film poster"/>

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

export default MovieItem;