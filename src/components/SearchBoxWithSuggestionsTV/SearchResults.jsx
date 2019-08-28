import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {

    onClickHandler = () => {
        document.getElementById('results').className = 'noDisplay';
        document.getElementById('searchInput').value = '';
    }

    render() {
        const link = 'https://image.tmdb.org/t/p/w300';
        return(
            <ul id="results" onClick={this.onClickHandler}>
                {this.props.results.map((tvshow, index) => {
                    return(
                        <li key={index} onClick={this.handleClick} className="result">
                            <Link to={`/tv-show-info/${tvshow.id}`} onClick={() => this.props.history.push(`/tv-show-info/${tvshow.id}`)}>
                                <img src={tvshow.poster_path === null ? 'https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available' : `${link}${tvshow.poster_path}`} alt={`${tvshow.title} poster`} className="resultPoster" />
                                <div>
                                    <p></p>
                                    <span className="title">{tvshow.original_name} </span>
                                    <span>({tvshow.first_air_date ? tvshow.first_air_date.slice(0,4) : 'n/a'})</span>
                                    <p style={{fontSize:"12px", fontWeight:"300"}}>{tvshow.overview.slice(0,147)+'...'} </p>
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