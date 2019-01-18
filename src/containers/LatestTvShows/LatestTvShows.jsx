import React, { Component } from 'react';
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

class LatestTvShows extends Component {

    state = {
        latestTVShows: []
    }

    componentDidMount() {
        this.getLatestTVShows();
    }

    getLatestTVShows = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/popular?&api_key=${APIKEY}&language=en-US`);
        const latestTVShows = await resp.json();
        this.setState({ latestTVShows: latestTVShows.results });
    }

    render() {
        const latestTVShows = this.state.latestTVShows;

        return (
            <div>
                <div className="container tvshows">
                    <div className="similar_movies">
                        <SearchBoxWithSuggestionsTV/>

                        <TVShowNavigationButtons/>
                        
                        <hr className="separator"/>

                        <h1 style={{textAlign:"center"}}>Latest TV Shows</h1>
                        <TVShowsList
                            tvShowList={latestTVShows}
                            getTVShowById={this.getTVShowById}
                        />
                    </div>
                </div>
                
                <Loader/>
            </div>
        )
    }
}

export default LatestTvShows;