import React from 'react';
import { Link } from 'react-router-dom';
import './TVShowNavigationButtons.css';

const TVShowNavigationButtons = () => {
    return (
        <div className="btn-div">
            <Link
                data-aos="flip-right"
                data-aos-delay="450"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/tv-shows/popular`} className="btn btn-movie-info tv-show b2">Popular</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="550"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/tv-shows`} className="btn btn-movie-info tv-show b2">Airing Today</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="650"
                data-aos-duration="950"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/tv-shows/top-rated`} className="btn btn-movie-info tv-show b2">Top Rated</Link>
            <Link 
                data-aos="flip-right"
                data-aos-delay="750"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom" 
                to={`/tv-shows/now-on-the-air`} className="btn btn-movie-info tv-show b2">On The Air</Link>
        </div>
    );
};

export default TVShowNavigationButtons;