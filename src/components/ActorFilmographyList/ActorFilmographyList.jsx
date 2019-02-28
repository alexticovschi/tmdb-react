import React from 'react';
import ActorMovieItem from '../MovieItem/MovieItem';


const ActorFilmographyList = ({ movieList }) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';
    const not_available_poster = "https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available";
    const list_of_movies = movieList && movieList.map((movie,idx) => (
        <ActorMovieItem
            mediaType={movie.media_type}
            key={idx}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date && movie.release_date.slice(0,4)}
            voteAvg={movie.vote_average}
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

export default ActorFilmographyList;