import React, { Component } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

class NowOnTheAirTVShows extends Component {

    state = {
        nowOnTheAirTVShows: []
    }

    componentDidMount() {
        const type = this.props.match.params
        this.getNowOnTheAirTVShows();
    }

    getNowOnTheAirTVShows = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?&api_key=${APIKEY}&language=en-US`);
        const nowOnTheAirTVShows = await resp.json();
        this.setState({ nowOnTheAirTVShows: nowOnTheAirTVShows.results });
    }


    render() {
        const nowOnTheAirTVShows = this.state.nowOnTheAirTVShows;

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
                            
                            <h1>Now On The Air TV Shows</h1>
                            <TVShowsList
                                tvShowList={nowOnTheAirTVShows}
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

export default NowOnTheAirTVShows;