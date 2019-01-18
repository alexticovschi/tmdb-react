import React, { Component } from 'react';
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

import './TVShows.css';

class TVShows extends Component {

    state = {
        airingTodayTVShows: [] 
    }

    componentDidMount() {
        this.getAiringTodayTVShows();
    }

    getAiringTodayTVShows = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/airing_today?&api_key=${APIKEY}&language=en-US`);
        const airingTodayTVShows = await resp.json();
        this.setState({ airingTodayTVShows: airingTodayTVShows.results });
    }

    render() {
        const airingTodayTVShows = this.state.airingTodayTVShows;

        return (
            <div>
                <section className="container tvshows"> 
                    <div className="similar_movies">
                        <SearchBoxWithSuggestionsTV/>

                        <TVShowNavigationButtons/>

                        <hr className="separator"/>

                        <h1 style={{textAlign:"center"}}>Airing Today</h1>
                        <TVShowsList
                            tvShowList={airingTodayTVShows}
                            getTVShowById={this.getTVShowById}
                        />
                    </div>
                </section>
                
                <Loader/>
            </div>
        )
    }
}

export default TVShows;