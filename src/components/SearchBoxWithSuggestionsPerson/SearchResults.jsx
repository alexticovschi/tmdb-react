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
            {this.props.results.map((person, index) => {
                console.log(person)
                return(
                    <li key={index} onClick={this.handleClick} className="result">
                        <Link 
                        to={`/cast/actor-profile-info/${person.id}`}
                        onClick={() => this.props.history.push(`/cast/actor-profile-info/${person.id}`)}
                        >
                            <img src={person.profile_path === null ? 'https://dummyimage.com/243x350/7b8a91/ffffff&text=Image+Not+Available' : `${link}${person.profile_path}`} alt={`${person.name} poster`} className="resultPoster" />
                            <div>
                                <p></p>
                                <span className="name">{person.name} </span>
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