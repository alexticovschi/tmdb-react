import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const TVShowNavigationButtons = () => {
    return (
        <div className="btn-div">
            <Link to={`/tv-shows/popular`} className="btn-movie-info b2">Popular</Link>
            <Link to={`/tv-shows/latest`} className="btn-movie-info b2">Latest</Link>
            <Link to={`/tv-shows/top-rated`} className="btn-movie-info b2">Top Rated</Link>
            <Link to={`/tv-shows/now-on-the-air`} className="btn-movie-info b2">Now On The Air</Link>
        </div>
    );
};

export default TVShowNavigationButtons;