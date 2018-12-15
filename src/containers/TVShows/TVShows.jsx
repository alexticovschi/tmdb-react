import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';


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
                <Navbar/>

                <div className="flex-container" style={{marginTop:"68px"}}> 
                    <div className="similar_movies">
                        <div className="btn-div" style={{margin:"0 auto"}}>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/popular')}>Popular</button>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/latest')}>Latest</button>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/top-rated')}>Top Rated</button>
                            <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows/now-on-the-air')}>Now On The Air</button>
                        </div>

                        <h1>Airing Today</h1>
                        <TVShowsList
                            tvShowList={airingTodayTVShows}
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

export default TVShows;