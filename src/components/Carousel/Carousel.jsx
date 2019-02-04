import React from "react";
import { Carousel } from "react-responsive-carousel";
import './Carousel.css';

import { Link } from 'react-router-dom';


export default ({movies}) => {
    // console.log(movies);
    const base_url = 'https://image.tmdb.org/t/p/original';
    return (
        <Carousel infiniteLoop={true} useKeyboardArrows={true}>
            {movies.map(movie => (
                <div key={movie.id}>
                    <img className="carousel-img" src={base_url + movie.backdrop_path} alt="carousel img"/>
                    <Link 
                        to={`/movie-info/${movie.id}`} 
                        className="legend">
                            <p className="movie-title">{movie.title}</p>
                            <p>Release date: {movie.release_date}</p>
                    </Link>
                </div>
            ))}
        </Carousel>
    );
};
