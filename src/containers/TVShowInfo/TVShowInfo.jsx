import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Navbar from "../../components/Navbar/Navbar";

import './TVShowInfo.css';

class TVShowInfo extends Component {
    state = {
        tvShow: []
    }

    componentDidMount() {
        const { tv_show_id } = this.props.match.params;
        this.getTVShowById(tv_show_id);
    }

    getTVShowById = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/tv/${ID}?&api_key=${APIKEY}&language=en-US`);
        const tvShow = await resp.json();
        this.setState({ tvShow });
    }

    render() {
        const {tvShow} = this.state;
        const base_url = 'https://image.tmdb.org/t/p/w500';
        const genres = tvShow.genres;
        let gen = [];
        let list = genres && genres.map(g => gen.push(g.name));
        let genre = gen.map(x => x + ' ');

        console.log(this.state.tvShow)

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
                                <hr/>
                                {list !== null ? <p><strong>Genre:</strong> {genre}</p> : null}
                                <p><strong>Overview: </strong>  {tvShow.overview}</p> 
                                <p><strong>First Air Date: </strong>  {tvShow.first_air_date}</p>                                
                                <p><strong>Episodes: </strong>  {tvShow.number_of_episodes}</p> 
                                <p><strong>Seasons: </strong>  {tvShow.number_of_seasons}</p> 
                                {tvShow.BoxOffice ? <p><strong>BoxOffice: </strong>  {tvShow.BoxOffice}</p> : null}
                                {tvShow.homepage ? <p><strong>Website: </strong>  <a href={tvShow.homepage} target="_blank" rel="noopener noreferrer">{tvShow.homepage}</a></p> : null}
                                
                                <div className="btn-div">
                                    <button className="btn btn-info b2" onClick={() => this.props.history.push('/tv-shows')}>Back To TV Shows</button>
                                    <button className="btn btn-info b2" onClick={() => this.props.history.goBack()}>Back To Previous Page</button>
                                </div>
                            </div>
                        
                        </div>
                    </div>    
                </div>

                <footer></footer>
                <Loader/>
            </div>
        );
    }
}

export default TVShowInfo;