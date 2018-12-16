import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';

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
                <Navbar/>

                <div className="flex-container" style={{marginTop:"68px"}}>
                    <div className="similar_movies">
                        <TVShowNavigationButtons/>
                        
                        <hr className="separator"/>

                        <h1>Latest TV Shows</h1>
                        <TVShowsList
                            tvShowList={latestTVShows}
                            getTVShowById={this.getTVShowById}
                        />
                    </div>
                </div>
                
                <Loader/>
                <footer></footer>
            </div>
        )
    }
}

export default LatestTvShows;