import React from 'react';
import { Link } from 'react-router-dom';


const MovieItem = ({title, poster, id}) => {
    const _id = id.toString();
    return (
        <Link 
            to={`/movie-info/${_id}`} 
            onClick={() => this.props.history.push('/movie_info/')} 
            className="card">
            
            <img src={poster} alt="film poster"/>
            <h4 className="card-title">{title}</h4>
        </Link>
    );
};

export default MovieItem;