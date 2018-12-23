import React, { Component } from 'react';
import SimilarMovieList from '../../components/SimilarMovieList/SimilarMovieList';
import Loader from '../../components/Loader/Loader';
import ActorImageCard from '../../components/ActorImageCard/ActorImageCard';
import SlickSlider from "../../components/Slider/SlickSliderMovieInfo";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

import './MovieInfo.css';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

class MovieInfo extends Component {
    state = {
        movie: [],
        credits: [],
        similar_movies: [],
        movieRecommedations: [],
        trailers: []
    }

    componentDidMount() {
        const { movie_id } = this.props.match.params;
        this.getMovieById(movie_id);
        this.getSimilarMovies(movie_id);
        this.getMovieCredits(movie_id);
        this.getMovieRecommendations(movie_id);
        this.getTrailers(movie_id);
    }

    componentDidUpdate(prevProps) {
        if((this.props.location !== prevProps.location)) {
            const { movie_id } = this.props.match.params;
            this.getMovieById(movie_id);
            this.getSimilarMovies(movie_id);
            this.getMovieCredits(movie_id);
            this.getMovieRecommendations(movie_id);
            this.getTrailers(movie_id);
        }
    } 

    getMovieById = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        // https://api.themoviedb.org/3/movie/tt4154756?api_key=9baa3cbfd9b62ea4f97966abadf41653
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);

        const movie = await resp.json();

        this.setState({ movie });
        // console.log('[MOVIE]:',this.state.movie);
        console.log({movie});
    }

    getSimilarMovies = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`);

        const movies = await resp.json();

        this.setState({ similar_movies: movies.results });
        // console.log('[MOVIE]:',this.state.similar_movies);
        // console.log({movies});
    }

    getMovieCredits = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/credits?&api_key=${APIKEY}&language=en-US`);
    
        const credits = await resp.json();
        this.setState({ credits: credits.cast });
        // console.log('[CREDITS]', credits);
    }

    getMovieRecommendations = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';

        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`);
        const movieRecommedations = await resp.json();
        this.setState({ movieRecommedations: movieRecommedations.results });
    }

    getTrailers = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/videos?&api_key=${APIKEY}&language=en-US`);

        const trailers = await resp.json();
        this.setState({ trailers: trailers.results });
        console.log('[trailers]', trailers);
    }

    render() {
        const {movie, movieRecommedations} = this.state;
        const base_url = 'https://image.tmdb.org/t/p/w500';
        const base_url2 = 'https://image.tmdb.org/t/p/w1400_and_h450_face';
        // const base_url3 = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
        const genres = movie.genres;
        let list = genres && genres.map(g => g.name + ' ');

        // console.log(this.state.credits);
        return (
            <div className="box" style={{ marginTop: "56px" }}>
                <div className="container">
                    <SearchBoxWithSuggestions/>

                    <div className="row">
                        <div className="box-left">
                            <img className="img-info" src={base_url + movie.poster_path} alt={"img card"} />
                        </div>
                        <div className="box-right">
                            <div className="inner-box-right">

                                <h1 className="info-title"><span>{movie.original_title}</span></h1> 

                                <hr className="separator"/>
                                
                                {list !== null ? <p><strong>Genre:</strong>  {list}</p> : null}
                                <div className="star-rating"><strong>Rating: </strong><Rater interactive={false} total={5} rating={movie.vote_average / 2} /></div>

                                <p><strong>Released: </strong>  {movie.release_date}</p>
                                <p><strong>Tagline: </strong>  {movie.tagline}</p> 
                                <p><strong>Overview: </strong>  {movie.overview}</p> 
                                {movie.BoxOffice ? <p><strong>BoxOffice: </strong>  {movie.BoxOffice}</p> : null}
                                {movie.homepage ? <p><strong>Website: </strong>  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.original_title} Official Website</a></p> : null}

                                <div className="btn-div">
                                    <a className="btn btn-info b1" href={`http://imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDB</a>
                                    <button className="btn btn-info b2" onClick={() => this.props.history.push('/movies')}>Back To Search</button>
                                </div>
                            </div>
                        </div>

                        <div>            
                            <img className="custom_bg_poster" src={base_url2 + movie.backdrop_path} alt=""/>
                        </div>
                    </div>    
                </div> 

                {this.state.trailers.length > 0 ?
                    <div className="container">
                        <div className="resp-container" style={{marginTop:"10px", marginBottom:"10px"}}>
                            {this.state.trailers.slice(0,1).map(trailer => (
                                <iframe 
                                    key={trailer.key}
                                    className="resp-iframe"
                                    style={{borderRadius:"6px", margin:"10px auto"}} 
                                    title="1" 
                                    allow="encrypted-media" 
                                    allowFullScreen
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                />
                            ))}
                        </div>
                    </div>
                : null}

                <div className="container actors" style={{borderTop:"1px solid #fff", paddingTop: "20px"}}>
                    <h1><strong>Cast</strong></h1>
                    <hr className="separator"/>

                    <main className="main-content">
                        {this.state.credits &&
                            this.state.credits.map(actor => <ActorImageCard key={actor.id} actor={actor}/>
                        )}
                    </main>
                </div>

                {this.state.movieRecommedations.length > 0 ?
                    <div className="container">
                        <hr className="slider_slick_container__separator"/>
                        <div className="slider_slick_box" style={{paddingBottom:"5px"}}>
                            <h1 style={{textAlign: "center"}}>Recommendations</h1>
                            <hr className="separator"/>

                            <SlickSlider items={movieRecommedations}/>
                        </div>

                        <hr className="separator"/>
                    </div>
                : null}
            

                <div className="container">
                    {this.state.similar_movies.length > 0 ?
                        <div className="similar_movies">
                            <h1 style={{textAlign:"center"}}><strong>Similar Movies</strong></h1>
                            <hr className="separator"/>

                            <SimilarMovieList
                                movieList={this.state.similar_movies}
                                getMovieById={this.getMovieById} 
                            />                           
                        </div>
                    : null}
                </div>

                <Loader/>
            </div>
        );
    }
}

export default MovieInfo;