import React, { Component } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';
import Navbar from "../../components/Navbar/Navbar";

import { withRouter } from 'react-router-dom';

import ScrollUpButton from "react-scroll-up-button"; 

import './App.css';


class App extends Component {
  state = {
    keywords: '',
    movies: [],
    total_pages: 0,
    page: 2
  }

  handleClick = () => {
    this.setState({sendState: 'loading'})
    //simulating an API
    setTimeout(() => {
      this.setState({sendState: 'finished'})
    }, 3000)
  }

  onLoading = () => {
    this.setState({ loading: true });
  }

  onIconLoading = () => {
    this.setState({ iconLoading: true });
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

  onSearchChange = (event) => {
    event.preventDefault();

    this.setState({ keywords: event.target.value });
    console.log('[searchField]:',this.state.keywords);
  }

  performSearch = async () => {
    const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.keywords}&api_key=${APIKEY}`);

    const movies = await resp.json();
    this.setState({total_pages: movies.total_pages});
    console.log('total_pages:',this.state.total_pages);

    this.setState({ 
      page: 2,
      movies: movies.results 
    });
    console.log({movies})
  }

  getMovieById = async (ID) => {
    const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
    // https://api.themoviedb.org/3/movie/tt4154756?api_key=9baa3cbfd9b62ea4f97966abadf41653
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);

    const movie = await resp.json();

    this.setState({ movie });
    console.log('[MOVIE]:',this.state.movie);
    console.log({movie});
  }

  // getTrendingMovies = async (ID) => {
  //   const resp = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=9baa3cbfd9b62ea4f97966abadf41653');
  //   const trending = await resp.json();
  //   this.setState({ movies: trending.results });
  // }
  
  loadMore = async () => {
    if(!this.state.total_pages > 1) return false;

    const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
    console.log('this.state.page:',this.state.page);

    // this.onLoading();
    // this.onIconLoading();
    this.setState({sendState: 'loading'})
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.keywords}&api_key=${APIKEY}&page=${this.state.page}`);
    let count = this.state.page + 1;
    this.setState({page: count});
    // Wait for the response and return as JSON
    const movies = await resp.json();

    const new_list = [...this.state.movies, ...movies.results];
    this.setState({ movies: new_list });

    // this.setState({ 
    //   loading: false, 
    //   onIconLoading: false
    // });
    this.setState({sendState: 'finished'})

    console.log('[NEW MOVIE LIST]:',this.state.movies);
    console.log('Current Page:', this.state.page);
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <main style={{ marginTop: "57px" }}>
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

          {this.state.total_pages > 2 && this.state.total_pages >= this.state.page ? 
            <button className="btn loadmore" onClick={this.loadMore}>Load More</button> 
          : null} 

        </main>
          
        <ScrollUpButton ContainerClassName="scroll-up-button"/>

        <footer></footer>
      </div>
    );
  }
}

export default withRouter(App);
