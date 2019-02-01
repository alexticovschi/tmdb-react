import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import ActorImageCard from '../../components/ActorImageCard/ActorImageCard';
import SwiperSlider from "../../components/SwiperSlider/SwiperSliderTV";

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import './TVShowInfo.css';

const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';

class TVShowInfo extends Component {
    state = {
        tvShow: [],
        tvShowCredits: [],
        similarTVShows: [],
        tvShowRecommedations: []
    }

    componentDidMount() {
        const { tv_show_id } = this.props.match.params;
        this.getTVShowById(tv_show_id);
        this.getSimilarTVShows(tv_show_id);
        this.getTVShowCredits(tv_show_id);
        this.getTVShowsRecommendations(tv_show_id);
    }

    getTVShowById = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}?&api_key=${APIKEY}&language=en-US`);
        const tvShow = await resp.json();
        this.setState({ tvShow });
    }

    getTVShowCredits = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}/credits?&api_key=${APIKEY}&language=en-US`);
        const tvShowCredits = await resp.json();
        this.setState({ tvShowCredits: tvShowCredits.cast });
    }

    getSimilarTVShows = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`);
        const similarTVShows = await resp.json();
        this.setState({ similarTVShows: similarTVShows.results });
    }

    getTVShowsRecommendations = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`);
        const tvShowRecommedations = await resp.json();
        this.setState({ tvShowRecommedations: tvShowRecommedations.results });
    }

    render() {
        const {tvShow, tvShowRecommedations} = this.state;
        const base_url = 'https://image.tmdb.org/t/p/w500';
        const base_url2 = 'https://image.tmdb.org/t/p/w1400_and_h450_face';
        const genres = tvShow.genres;
        let gen = [];
        let list = genres && genres.map(g => gen.push(g.name));
        let genre = gen.map(x => x + ' ');
        
        console.log(this.state)
        return (
            <div className="box" style={{ marginTop: "56px" }}>
                <div className="container">
                    <div className="row">
                        <div className="box-left">
                            <img className="img-info" src={base_url + tvShow.poster_path} alt={"img card"} />
                        </div>
                        <div className="box-right">
                            <div className="inner-box-right">
                                {/* <h1 className="tvshow-info-title"><span>{tvShow.original_name}</span></h1>  */}
                                <div className="group">
                                    <div className="group-item line-left"></div>
                                    <h1 className="tvshow-info-title group-item text">{tvShow.original_name}</h1> 
                                    <div className="group-item line-right"></div>
                                </div>              
                                {list !== null ? <p><strong>Genre:</strong> {genre}</p> : null}
                                <div className="star-rating"><strong>Rating: </strong><Rater interactive={false} total={5} rating={tvShow.vote_average / 2} /></div>
                                <p><strong>Overview: </strong>  {tvShow.overview}</p> 
                                <p><strong>First Air Date: </strong>  {tvShow.first_air_date}</p>                                
                                <p><strong>Episodes: </strong>  {tvShow.number_of_episodes}</p> 
                                <p><strong>Seasons: </strong>  {tvShow.number_of_seasons}</p> 
                                {tvShow.BoxOffice ? <p><strong>BoxOffice: </strong>  {tvShow.BoxOffice}</p> : null}
                                {tvShow.homepage ? <p><strong>Website: </strong>  <a href={tvShow.homepage} target="_blank" rel="noopener noreferrer">{tvShow.original_name} Official Website</a></p> : null}

                                <button className="btn btn-movie-info tvshow b2" onClick={() => this.props.history.push('/tv-shows')}><i class="fas fa-arrow-left"></i> Back To Main</button>
                            </div>
                        </div>

                        <div>            
                            <img className="custom_bg_poster" src={base_url2 + tvShow.backdrop_path} alt=""/>
                        </div>


                        <div style={{width: "100%"}}>
                            {this.state.tvShowCredits.length > 0 ?
                                <section className="cast">
                                    <div className="group">
                                        <div className="group-item line"></div>
                                        <h1 className="title group-item text">Cast</h1>
                                        <div className="group-item line"></div>
                                    </div>

                                    <div className="main-content">
                                        {this.state.tvShowCredits.map(actor => {
                                                if(actor.profile_path !== null) {
                                                    return <ActorImageCard key={actor.id} actor={actor}/>
                                                }
                                                    return null;
                                                }
                                        )}
                                    </div>
                                </section>
                            : null}
                        </div>

                    </div>
                    
                    <div style={{width: "100%"}}>
                        {this.state.tvShowCredits.length > 0 ?
                            <section className="cast">
                                <div className="group">
                                    <div className="group-item line"></div>
                                    <h1 className="title group-item text">Cast</h1>
                                    <div className="group-item line"></div>
                                </div>

                                <div className="main-content">
                                    {this.state.tvShowCredits.map(actor => {
                                        if(actor.profile_path !== null) {
                                            return <ActorImageCard key={actor.id} actor={actor}/>
                                        }
                                        return null;
                                    })}
                                </div>
                            </section>
                        : null}
                    </div>
                    
                    <div>
                        {this.state.tvShowRecommedations.length > 0 ?
                            <section className="recommendations">
                                <div className="container slider">
                                    <div>
                                        <div className="group">
                                            <div className="group-item line"></div>
                                            <h1 className="title group-item text">Recommendations</h1>
                                            <div className="group-item line"></div>
                                        </div>

                                        <SwiperSlider items={tvShowRecommedations}/>
                                    </div>
                                </div>
                            </section>
                        : null}
                    </div>

                    <div>
                        <section className="similar-tvshows"> 
                            {this.state.similarTVShows.length > 0 ?
                                <div>
                                    <div className="group">
                                        <div className="group-item line"></div>
                                        <h1 className="title group-item text">Similar TV Shows</h1>
                                        <div className="group-item line"></div>
                                    </div>

                                    <TVShowsList
                                        tvShowList={this.state.similarTVShows}
                                        getTVShowById={this.getTVShowById}
                                    />
                                </div>
                            : null} 
                        </section>       
                    </div>
                </div>

                <Loader/>
            </div>
        );
    }
}

export default TVShowInfo;