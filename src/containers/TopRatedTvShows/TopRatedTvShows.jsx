import React, { Component } from 'react';
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

class TopRatedTvShows extends Component {

    state = {
        topRatedTVShows: []
    }

    componentDidMount() {
        this.getTopRatedTVShows();
    }

    getTopRatedTVShows = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/top_rated?&api_key=${APIKEY}&language=en-US`);
        const topRatedTVShows = await resp.json();
        this.setState({ topRatedTVShows: topRatedTVShows.results });
    }

    render() {
        const topRatedTVShows = this.state.topRatedTVShows;

        return (
            <div>
                <div className="container tvshows"> 
                    <SearchBoxWithSuggestionsTV/>

                    <div className="group" style={{marginTop: "20px"}}>
                        <div className="group-item line"></div>
                        <h1 className="group-item text">Top Rated</h1> 
                        <div className="group-item line"></div>
                    </div>

                    <TVShowNavigationButtons/>

                    <TVShowsList
                        tvShowList={topRatedTVShows}
                        getTVShowById={this.getTVShowById}
                    />
                </div>

                <Loader/> 
            </div>
        )
    }
}

export default TopRatedTvShows;