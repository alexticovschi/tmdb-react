import React, { Component } from "react";
import MovieList from "../../components/MovieList/MovieList";
import './MovieGenres.css';

import Select from 'react-select';

class MovieGenres extends Component {
    state = {
        genres: [],
        genre: [],
        total_pages: 0,
        page: 2,
        id: null,
        selectedOption: null
    };

    componentDidMount() {
        const { genre_id } = this.props.match.params;
        this.getGenreById(genre_id);
        this.getGenres();
    }

    componentDidUpdate(prevProps) {
        if((this.props.location !== prevProps.location)) {
            const { genre_id } = this.props.match.params;
            this.getGenreById(this.state.selectedOption.value);
        }
    } 


    loadMore = async () => {
        if (!this.state.total_pages > 1) return false;
        const ID = this.state.id;
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${ID}&api_key=${APIKEY}&page=${this.state.page}&sort_by=popularity.desc&primary_release_year=2018`
        );
        let count = this.state.page + 1;
        this.setState({ page: count });
        const data = await resp.json();

        const new_list = [...this.state.genre, ...data.results.filter(item => item.poster_path !== null)];
        this.setState({ genre: new_list });
    }

    getGenres = async () => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?&api_key=${APIKEY}&language=en-US`
        );

        const data = await resp.json();
        this.setState({ genres: data.genres });
    };

    getGenreById = async (ID) => {
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        const resp = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${ID}&api_key=${APIKEY}&sort_by=popularity.desc&primary_release_year=2018`
        );

        const data = await resp.json();
        this.setState({
            total_pages: data.total_pages,
            page: 2, 
            genre: data.results,
            id: ID 
        });
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.history.push(`/genres/${selectedOption.value}`);
        console.log(`Option selected:`, selectedOption);
      }

    onChange = (e) => this.props.history.push(`/genre/${e.target.value}`);

    render() {
        let genres = this.state.genres;
        let optionItems = genres.map((genre) =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        );

        const { selectedOption } = this.state;
        const options = [];
        this.state.genres.map(item => {
            options.push({label: item.name, value: item.id})
        });

        return (
            <div style={{ marginTop: "57px", minHeight: "60vh" }}>
                <div style={{ marginTop: "20px" }}>
                        
                    <main >
                        {/* <select onChange={this.onChange}>
                            {optionItems}
                        </select> */}
                        <h1 className="title" style={{ padding: "24px 0px" }}>Filter Movies by Genre</h1>
                        <Select 
                            className="select"
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={ options }
                            placeholder={"Select a genre..."}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                ...theme.colors,
                                  primary25: '#88d383',
                                  neutral20: 'green',
                                  primary: 'green'
                                },
                            })}
                        />

                        <MovieList
                            movieList={this.state.genre}
                            getMovieById={this.getMovieById}
                        />

                        {this.state.total_pages > 2 &&
                        this.state.total_pages >= this.state.page ? (
                            <button className="btn loadmore" onClick={this.loadMore}>
                            Load More
                            </button>
                        ) : null}
                    </main>
                </div>
            </div>
        );
    }
}

export default MovieGenres;
