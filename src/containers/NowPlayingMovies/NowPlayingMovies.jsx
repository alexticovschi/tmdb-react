import React, { Component } from 'react';
import MovieList from "../../components/MovieList/MovieList";
import Loader from '../../components/Loader/Loader';
import MoviesNavigationButtons from '../../components/MoviesNavigationButtons/MoviesNavigationButtons';
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

class NowPlayingMovies extends Component {
    state = {
        nowPlayingMovies: []
    }

    componentDidMount() {
        this.getNowPlayingMovies();
    }

    getNowPlayingMovies = async () => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US&page=1`);
        const nowPlayingMovies = await resp.json();
        this.setState({ nowPlayingMovies: nowPlayingMovies.results });
    }

    render() {
        const { nowPlayingMovies } = this.state;

        return (
            <div>
                <div className="container movie-type"> 
                    <SearchBoxWithSuggestions/>

                    <MoviesNavigationButtons/>

                    <hr className="separator"/>

                    <h1 class style={{textAlign:"center"}}>In Theatres</h1>
                    <MovieList
                        movieList={nowPlayingMovies}
                        getMovieById={this.getMovieById}
                    />
                </div>
                
                <Loader/>
            </div>
        )
    }
}

export default NowPlayingMovies;