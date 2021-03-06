import React from 'react';
import SimilarMovieItem from '../SimilarMovieItem/SimilarMovieItem';

const MovieList = ({ movieList, getMovieById }) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';
    const not_available_poster = "https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available";
    const list_of_movies = movieList && movieList.map((movie,idx) => (
        <SimilarMovieItem
            key={idx}
            id={movie.id}
            getMovieById={getMovieById}
            title={movie.title}
            mediaType={movie.media_type}
            poster={ movie.poster_path === null ? not_available_poster : base_url + movie.poster_path }
        />
    ));
    return (
        <div className="container">
            <main className="main-content">
                {list_of_movies}
            </main>
        </div>
    );
}

export default MovieList;