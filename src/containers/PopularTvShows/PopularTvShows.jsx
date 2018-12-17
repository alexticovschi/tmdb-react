import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import TVShowNavigationButtons from '../../components/TVShowNavigationButtons/TVShowNavigationButtons';

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
                <Navbar/>

                <div className="container" style={{marginTop:"68px"}}> 
                    <div className="similar_movies">
                        <TVShowNavigationButtons/>
                        
                        <hr className="separator"/>

                        <h1 style={{textAlign:"center"}}>Popular TV Shows</h1>
                        <TVShowsList
                            tvShowList={popularTvShows}
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

export default PopularTvShows;