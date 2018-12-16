import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Navbar from "../../components/Navbar/Navbar";
import TVShowsList from "../../components/TVShowsList/TVShowsList";

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import ScrollUpButton from "react-scroll-up-button"; 

import './TVShowInfo.css';

class TVShowInfo extends Component {
    state = {
        tvShow: [],
        similarTVShows: []
    }

    componentDidMount() {
        const { tv_show_id } = this.props.match.params;
        this.getTVShowById(tv_show_id);
        this.getSimilarTVShows(tv_show_id);
    }

    getTVShowById = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}?&api_key=${APIKEY}&language=en-US`);
        const tvShow = await resp.json();
        this.setState({ tvShow });
    }

    getSimilarTVShows = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`);
        const similarTVShows = await resp.json();
        this.setState({ similarTVShows: similarTVShows.results });
    }
    
    render() {
        const {tvShow} = this.state;
        const base_url = 'https://image.tmdb.org/t/p/w500';
        const genres = tvShow.genres;
        let gen = [];
        let list = genres && genres.map(g => gen.push(g.name));
        let genre = gen.map(x => x + ' ');

        console.log(this.state)

        return (
            <div className="box" style={{ marginTop: "56px" }}>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="box-left">
                            <img className="img-info" src={base_url + tvShow.poster_path} alt={"img card"} />
                        </div>
                        <div className="box-right">
                            <div className="inner-box-right">
                                <h1 className="info-title">{tvShow.original_name}</h1> 
                            
                                <hr className="separator"/>
                            
                                {list !== null ? <p><strong>Genre:</strong> {genre}</p> : null}
                                <div className="star-rating"><strong>Rating: </strong><Rater interactive={false} total={5} rating={tvShow.vote_average / 2} /></div>
                                <p><strong>Overview: </strong>  {tvShow.overview}</p> 
                                <p><strong>First Air Date: </strong>  {tvShow.first_air_date}</p>                                
                                <p><strong>Episodes: </strong>  {tvShow.number_of_episodes}</p> 
                                <p><strong>Seasons: </strong>  {tvShow.number_of_seasons}</p> 
                                {tvShow.BoxOffice ? <p><strong>BoxOffice: </strong>  {tvShow.BoxOffice}</p> : null}
                                {tvShow.homepage ? <p><strong>Website: </strong>  <a href={tvShow.homepage} target="_blank" rel="noopener noreferrer">{tvShow.original_name} Official Website</a></p> : null}

                                <div className="btn-div">
                                    <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows')}>Back To TV Shows</button>
                                    <button className="btn btn-info b2" onClick={() => this.props.history.goBack()}>Back To Previous Page</button>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>

                
                <div className="flex-container">
                    {this.state.similarTVShows.length > 0 ?
                        <div>
                            <hr className="separator"/>
                            <div className="similar_movies">
                                    <h1>Similar TV Shows</h1>
                                    <TVShowsList
                                        tvShowList={this.state.similarTVShows}
                                        getTVShowById={this.getTVShowById}
                                    />
                            </div>
                        </div>
                    : null}        
                </div>

                <footer></footer>

                <ScrollUpButton ContainerClassName="scroll-up-button"/>

                <Loader/>
            </div>
        );
    }
}

export default TVShowInfo;