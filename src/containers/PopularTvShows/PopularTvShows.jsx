import React, { Component } from 'react';
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

class PopularTvShows extends Component {

    state = {
        popularTVShows: []
    }

    componentDidMount() {
        this.getPopularTVShows();
    }

    getPopularTVShows = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/popular?&api_key=${APIKEY}&language=en-US`);
        const popularTVShows = await resp.json();
        this.setState({ popularTVShows: popularTVShows.results });
    }


    render() {
        const popularTvShows = this.state.popularTVShows;

        return (
            <div>
                <div className="container tvshows"> 
                    <div className="similar_movies">
                        <SearchBoxWithSuggestionsTV/>

                        <div className="group" style={{marginTop: "20px"}}>
                            <div className="group-item line"></div>
                            <h1 className="group-item text">Popular</h1> 
                            <div className="group-item line"></div>
                        </div>

                        <TVShowNavigationButtons/>

                        <TVShowsList
                            tvShowList={popularTvShows}
                            getTVShowById={this.getTVShowById}
                        />
                    </div>
                </div>
                
                <Loader/>
            </div>
        )
    }
}

export default PopularTvShows;