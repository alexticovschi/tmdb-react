import React, { Component } from 'react';
import MovieList from "../../components/MovieList/MovieList";
import Loader from '../../components/Loader/Loader';
import MoviesNavigationButtons from '../../components/MoviesNavigationButtons/MoviesNavigationButtons';
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

class PopularMovies extends Component {
    state = {
        popularMovies: []
    }

    componentDidMount() {
        this.getPopularMovies();
    }

    getPopularMovies = async () => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?&api_key=${APIKEY}&language=en-US&page=1`);
        const popularMovies = await resp.json();
        this.setState({ popularMovies: popularMovies.results });
    }

    render() {
        const { popularMovies } = this.state;

        return (
            <div>
                <div className="container" style={{marginTop:"68px"}}> 
                    <div className="similar_movies">
                        <SearchBoxWithSuggestions/>

                        <MoviesNavigationButtons/>
                            
                        <hr className="separator"/>

                        <h1 style={{textAlign:"center"}}>Popular</h1>
                        <MovieList
                            movieList={popularMovies}
                        />
                    </div>
                </div>
                
                <Loader/>
            </div>
        )
    }
}

export default PopularMovies;