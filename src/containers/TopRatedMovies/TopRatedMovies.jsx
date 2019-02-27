import React, { Component } from 'react';
import MovieList from "../../components/MovieList/MovieList";
import Loader from '../../components/Loader/Loader';
import MoviesNavigationButtons from '../../components/MoviesNavigationButtons/MoviesNavigationButtons';
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

import { APIKEY } from '../../config';


class TopRatedMovies extends Component {
    state = {
        topRatedMovies: []
    }

    componentDidMount() {
        this.getTopRatedMovies();
    }

    getTopRatedMovies = async () => {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US&page=1`);
        const topRatedMovies = await resp.json();
        this.setState({ topRatedMovies: topRatedMovies.results });
    }

    render() {
        const { topRatedMovies } = this.state;

        return (
            <div className="movies-wrapper">
                <SearchBoxWithSuggestions/>

                <div className="container"> 

                    <div className="group">
                        <div className="group-item line"></div>
                        <h1 className="group-item text">Top Rated</h1> 
                        <div className="group-item line"></div>
                    </div>

                    <MoviesNavigationButtons/>

                    <MovieList
                        movieList={topRatedMovies}
                    />
                </div>
                
                <Loader/>
            </div>
        )
    }
}

export default TopRatedMovies;