import React, { Component } from 'react'
import SearchResults from './SearchResults';
import search from './search.svg';
import './SearchBoxWithSuggestions.css';

class SearchBoxWithSuggestions extends Component {
    state = {
        results: [],
        keywords: ''
    }

    onSubmit = (e) => e.preventDefault();

    onSearchChange = event => {
        this.setState({ keywords: event.target.value });
        if (event.target.value === '') document.getElementById('results').className = 'noDisplay';
    };

    clearSuggestions = () => {
        document.getElementById('results').className = 'noDisplay';
    }

    performSearch = async () => {
        document.getElementById('results').className = 'searchResults';
        let val = this.state.keywords;

        if (val === '') {
            this.clearSuggestions();
        }
        
        const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${val}&page=1&include_adult=false`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    const results = data.results;
                    this.setState({ results });
                });
            })

            .catch(err => {
                console.log('Fetch Error :-S', err);
            })                                               
    }

    render() {
        return (
            <div className="searchbox-wrapper">
                <form onSubmit={this.onSubmit} id="form">
                    <input 
                        type="text" 
                        onKeyUp={this.performSearch} 
                        onChange={this.onSearchChange} 
                        id="searchInput" 
                        className="searchBar" 
                        placeholder="Search a movie..." 
                        required
                    />
                    <button onClick={this.clearSuggestions} className="close-icon" type="reset" />
                    <img src={search} className="searchIcon" alt=""/>

                    <SearchResults results={this.state.results} />
                </form>
            </div>
        );
    }
}

export default SearchBoxWithSuggestions;
