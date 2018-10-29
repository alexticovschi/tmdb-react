import React, { Component } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';
import { withRouter } from 'react-router-dom';

import './App.css';


class App extends Component {
  state = {
    keywords: '',
    movies: []
  }

  componentDidMount(){
    this.hydrateStateWithLocalStorage();
  }

  componentWillUnmount() {
    //window.onload = this.getRecipe();
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

  onSearchChange = (event) => {
    event.preventDefault();

    this.setState({ searchField: event.target.value });
    console.log('[searchField]:',this.state.searchField);
  }

  // componentDidMount() {
  //   this.performSearch();
  // }

  onSearchChange = (event) => {
    event.preventDefault();

    this.setState({ keywords: event.target.value });
    console.log('[searchField]:',this.state.keywords);
  }

  performSearch = async () => {
    const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.keywords}&api_key=${APIKEY}`);

    const movies = await resp.json();
    
    this.setState({ movies: movies.results });
    console.log({movies})
  }

  getMovieById = async (ID) => {
    const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
    // https://api.themoviedb.org/3/movie/tt4154756?api_key=9baa3cbfd9b62ea4f97966abadf41653
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);

        // Wait for the response and return as JSON
        const movie = await resp.json();

        // Return the object
        this.setState({ movie });
        console.log('[MOVIE]:',this.state.movie);
        console.log({movie});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBox
            onSearchChange={this.onSearchChange}
            getMovies={this.performSearch}
          />
        </header>

        <MovieList
          movieList={this.state.movies} 
          getMovieById={this.getMovieById} 
        />
      </div>
    );
  }
}

export default withRouter(App);
