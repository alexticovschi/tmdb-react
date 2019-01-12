import React, { Component } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MoviesNavigationButtons from '../../components/MoviesNavigationButtons/MoviesNavigationButtons';

import './Movies.css';

import Select from 'react-select';

const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";

class Movies extends Component {
    state = {
        keywords: "",
        movies: [],
        total_pages: 0,
        page: 2
    };
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    }

    componentWillUnmount() {
        window.removeEventListener(
        "beforeunload",
        this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
        // if the key exists in localStorage
        if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);

            // parse the localStorage string and setState
            try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
            } catch (e) {
            // handle empty string
            this.setState({ [key]: value });
            }
        }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
        // save to localStorage
        localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    

    // getTrendingMovies = async (ID) => {
    //   const resp = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=9baa3cbfd9b62ea4f97966abadf41653');
    //   const trending = await resp.json();
    //   this.setState({ movies: trending.results });
    // }

    loadMore = async () => {
        if (!this.state.total_pages > 1) return false;

        console.log("this.state.page:", this.state.page);

        // this.onLoading();
        // this.onIconLoading();
        this.setState({ sendState: "loading" });
        const resp = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${
            this.state.keywords
        }&api_key=${APIKEY}&page=${this.state.page}`
        );
        let count = this.state.page + 1;
        this.setState({ page: count });
        // Wait for the response and return as JSON
        const movies = await resp.json();

        const new_list = [...this.state.movies, ...movies.results];
        this.setState({ movies: new_list });

        console.log("[NEW MOVIE LIST]:", this.state.movies);
        console.log("Current Page:", this.state.page);
    }

    render() {

        return (
            <section className="search-movies">
                <main>
                    <MoviesNavigationButtons/>

                    <MovieList
                        movieList={this.state.movies}
                        getMovieById={this.getMovieById}
                    />

                    {this.state.total_pages > 2 &&
                    this.state.total_pages >= this.state.page ? (
                        <button className="btn loadmore" onClick={this.loadMore}>
                        Load More
                        </button>
                    ) : null}
                </main>
            </section>
        );
    }
}

export default Movies;
