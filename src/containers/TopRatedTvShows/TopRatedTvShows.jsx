import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';

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
                <Navbar/>

                <div className="flex-container" style={{marginTop:"68px"}}> 
                    <div className="similar_movies">
                        <TVShowNavigationButtons/>
                        
                        <hr className="separator"/>

                        <h1>Top Rated TV Shows</h1>
                        <TVShowsList
                            tvShowList={topRatedTVShows}
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

export default TopRatedTvShows;