import React, { Component } from 'react';
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

import { APIKEY } from '../../config';


class LatestTvShows extends Component {

    state = {
        latestTVShows: []
    }

    componentDidMount() {
        this.getLatestTVShows();
    }

    getLatestTVShows = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/tv/latest?&api_key=${APIKEY}&language=en-US`);
        const latestTVShows = await resp.json();
        this.setState({ latestTVShows: latestTVShows.results });
    }

    render() {
        const latestTVShows = this.state.latestTVShows;

        return (
            <div className="tvshows-wrapper">
                <SearchBoxWithSuggestionsTV/>

                <div className="container tvshows">
                        
                    <div className="group">
                        <div className="group-item line"></div>
                        <h1 className="group-item text">Latest</h1> 
                        <div className="group-item line"></div>
                    </div>

                    <TVShowNavigationButtons/>

                    <TVShowsList
                        tvShowList={latestTVShows}
                        getTVShowById={this.getTVShowById}
                    />
                </div>

            </div>  
        )
    }
}

export default LatestTvShows;