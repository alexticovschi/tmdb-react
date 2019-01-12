import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({title, poster, id, vote}) => {
    const _id = id.toString();

    return (
        <Link 
            to={`/movie-info/${_id}`} 
            className="card" 
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="300"
            data-aos-easing="ease-in-out"
            data-aos-anchor-placement="bottom"
        >
                <img src={poster} alt="film poster"/>
            {/* <h4 className="card-title">{title}</h4> */}
        </Link>
    );
};

export default MovieItem;