import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesNavigationButtons.css';

const MoviesNavigationButtons = () => {
    return (
        <div className="btn-div" style={{margin:"0 auto"}}>
            <Link 
                data-aos="flip-right"
                data-aos-delay="450"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/movies/now-playing`} className="btn btn-movie-info btn-nav b2">In Theatres</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="550"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/movies/popular`} className="btn btn-movie-info btn-nav b2">Popular</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="650"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/movies/top-rated`} className="btn btn-movie-info btn-nav b2">Top Rated</Link>
        </div>
    );
};

export default MoviesNavigationButtons;