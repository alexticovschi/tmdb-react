import React from 'react';
import { Link } from 'react-router-dom';

const TVShowNavigationButtons = () => {
    return (
        <div className="btn-div" style={{margin:"0 auto"}}>
            <Link to={`/tv-shows/popular`} className="btn btn-info b2">Popular</Link>
            <Link to={`/tv-shows/latest`} className="btn btn-info b2">Latest</Link>
            <Link to={`/tv-shows/top-rated`} className="btn btn-info b2">Top Rated</Link>
            <Link to={`/tv-shows/now-on-the-air`} className="btn btn-info b2">Now On The Air</Link>
        </div>
    );
};

export default TVShowNavigationButtons;