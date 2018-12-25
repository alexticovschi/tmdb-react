import React from 'react';
import { Link } from 'react-router-dom';

const MoviesNavigationButtons = () => {
    return (
        <div className="btn-div" style={{margin:"0 auto"}}>
            <Link to={`/movies/now-playing`} className="btn btn-info btn-nav b2">In Theatres</Link>
            <Link to={`/movies/popular`} className="btn btn-info btn-nav b2">Popular</Link>
            <Link to={`/movies/top-rated`} className="btn btn-info btn-nav b2">Top Rated</Link>
        </div>
    );
};

export default MoviesNavigationButtons;