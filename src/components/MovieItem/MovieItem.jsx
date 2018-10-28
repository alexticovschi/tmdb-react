import React from 'react';

const MovieItem = ({title, poster}) => {
    return (
        <article className="card">
            <h4 className="card-title">{title}</h4>
            <img src={poster} alt="film poster"/>
            <a className="btn movie-details" href="">Movie Details</a>
        </article>
    );
};

export default MovieItem;