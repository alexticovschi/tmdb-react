import React from 'react';

const MovieItem = ({title, poster}) => {
    return (
        <div>
            <h4 className="card-title">{title}</h4>
            <img src={poster} alt="film poster"/>
        </div>
    );
};

export default MovieItem;