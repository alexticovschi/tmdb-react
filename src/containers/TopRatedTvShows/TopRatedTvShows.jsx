import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

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
                        <div className="btn-div" style={{margin:"0 auto"}}>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/popular')}>Popular</button>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/latest')}>Latest</button>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/top-rated')}>Top Rated</button>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/now-on-the-air')}>Now On The Air</button>
                        </div>

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