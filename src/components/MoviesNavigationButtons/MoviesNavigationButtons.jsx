import React from 'react';
import { Link } from 'react-router-dom';
import './MoviesNavigationButtons.scss';

const MoviesNavigationButtons = () => {
    return (
        <div className="btn-div movies" style={{margin:"0 auto"}}>
            <Link 
                data-aos="flip-right"
                data-aos-delay="450"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/movies/now-playing`} className="button movies">In Theatres</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="550"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/movies/popular`} className="button movies">Popular</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="650"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/movies/top-rated`} className="button movies">Top Rated</Link>
        </div>
    );
};

export default MoviesNavigationButtons;