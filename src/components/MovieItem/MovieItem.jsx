import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({title, poster, id}) => {
    const _id = id.toString();

    return (
        <article className="card">
            <h4 className="card-title">{title}</h4>
            <img src={poster} alt="film poster"/>
            <div>
                <Link to={`/movie-info/${_id}`} onClick={() =>console.log({id})} className="btn movie-details">Movie Details</Link>
            </div>
        </article>
    );
};

export default MovieItem;