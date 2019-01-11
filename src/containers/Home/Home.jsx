import React, { Component } from 'react'
import Carousel from "../../components/Carousel/Carousel";
import MovieList from '../../components/MovieList/MovieList';
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";


import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Home.css';

class Home extends Component {
    state = {
        movie: [],
        upcomingMovies: [],
        nowPlayingMovies: [],
        popularMovies: [],
        topRatedMovies: [],
        latestMovies: []
    }

    componentDidMount() {
        this.getUpcomingMovies();
        this.getNowPlayingMovies();
        this.getPopularMovies();
        this.getTopRatedMovies();
        this.getLatestMovies();
    }

    getUpcomingMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/upcoming?&api_key=${APIKEY}&language=en-US`);

        const upcomingMovies = await resp.json();

        this.setState({ upcomingMovies: upcomingMovies.results });
    }

    getNowPlayingMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/now_playing?&api_key=${APIKEY}&language=en-US`);

        const nowPlayingMovies = await resp.json();

        this.setState({ nowPlayingMovies: nowPlayingMovies.results });
    }

    getPopularMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?&api_key=${APIKEY}&language=en-US`);

        const popularMovies = await resp.json();

        this.setState({ popularMovies: popularMovies.results });
    }

    getTopRatedMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${APIKEY}&language=en-US`);

        const topRatedMovies = await resp.json();

        this.setState({ topRatedMovies: topRatedMovies.results });
    }

    getLatestMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/discover/movie?&api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);

        const latestMovies = await resp.json();

        this.setState({ latestMovies: latestMovies.results });
    }

    getMovieById = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        // https://api.themoviedb.org/3/movie/tt4154756?api_key=9baa3cbfd9b62ea4f97966abadf41653
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);
    
        const movie = await resp.json();
    
        this.setState({ movie });
        // console.log('[MOVIE]:',this.state.movie);
      }

    render() {
        console.log(this.state)
        return (
            <div className="container" style={{marginTop:"56px"}}>
                <main className="container">
                    <SearchBoxWithSuggestions/>
                    <Carousel movies={this.state.nowPlayingMovies} />    
                    <MovieList
                        movieList={this.state.latestMovies} 
                        getMovieById={this.getMovieById} 
                    />
                </main>
                
            </div>

        )
    }
}

export default Home;
