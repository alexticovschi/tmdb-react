import React from 'react';
import MovieItem from '../MovieItem/MovieItem';

const MovieList = ({ movieList }) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';
    const not_available_poster = "https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available";
    const movie_list = movieList && movieList.map((movie,idx) => (
        <MovieItem 
            key={idx}
            title={movie.title}
            poster={ movie.poster_path === null ? not_available_poster : base_url + movie.poster_path }
        />
    ));
    return (
        <div>
            {movie_list}
        </div>
    );
}

export default MovieList;