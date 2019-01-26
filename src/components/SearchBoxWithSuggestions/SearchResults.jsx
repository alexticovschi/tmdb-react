import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SearchResults.css';

class SearchResults extends Component {

    onClickHandler = () => {
        document.getElementById('results').className = 'noDisplay';
        document.getElementById('searchInput').value = '';
    }

    render() {
        const link = 'https://image.tmdb.org/t/p/w300';
        return(
        <ul id="results" onClick={this.onClickHandler}>
            {this.props.results.map((movie, index) => {
            return(
                <li key={index} onClick={this.handleClick} className="result">
                    <Link to={`/movie-info/${movie.id}`} >
                        <img src={movie.poster_path === null ? 'https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available' : `${link}${movie.poster_path}`} alt={`${movie.title} poster`} className="resultPoster" />
                        <div>
                            <p></p>
                            <span className="title">{movie.title} </span>
                            <span>({movie.release_date.slice(0,4)})</span>
                            <p className="overview" style={{fontSize:"12px", fontWeight:"300"}}>{movie.overview.slice(0,147)+'...'} </p>
                        </div>
                    </Link>
                </li>
            )
            })}
        </ul>
        );
    }
}

export default SearchResults;