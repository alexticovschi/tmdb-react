import React, { Component } from 'react';
import SimilarMovieList from '../../components/SimilarMovieList/SimilarMovieList';
import Loader from '../../components/Loader/Loader';
import ActorImageCard from '../../components/ActorImageCard/ActorImageCard';
import SwiperSlider from "../../components/SwiperSlider/SwiperSlider";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

import './MovieInfo.css';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top         : '50%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      transform   : 'translate(-50%, -50%)',
      height     : '90%'
    }
};


class MovieInfo extends Component {
    state = {
        movie: [],
        credits: [],
        similar_movies: [],
        movieRecommedations: [],
        trailers: [],

        modalIsOpen: false
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


    openModal = () => {
        this.setState({ modalIsOpen: true });
    };
    
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };
    

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

        console.log(this.state.trailers.slice(0,1)[0]);
        return (
            <div className="box" style={{ marginTop: "56px" }}>
                <div className="container">
                    <SearchBoxWithSuggestions/>

                    <div className="row">
                        <div 
                            className="box-left" 
                            data-aos="fade-in"
                            data-aos-delay="50"
                            data-aos-duration="600"
                            data-aos-easing="ease-in-out"
                            data-aos-anchor-placement="bottom"
                        >
                            <img className="img-info" src={base_url + movie.poster_path} alt={"img card"} />
                        </div>

                        <div className="box-right">
                            <div className="inner-box-right">

                                <h1 className="movie-info-title">{movie.original_title}</h1> 
                                
                                {list !== null ? <p><strong>Genre:</strong>  {list}</p> : null}
                                <div className="star-rating"><strong>Rating: </strong><Rater interactive={false} total={5} rating={movie.vote_average / 2} /></div>

                                <p><strong>Released: </strong>  {movie.release_date}</p>
                                {/* <p><strong>Tagline: </strong>  {movie.tagline}</p>  */}
                                <p><strong>Overview: </strong>  {movie.overview}</p> 
                                {movie.BoxOffice ? <p><strong>BoxOffice: </strong>  {movie.BoxOffice}</p> : null}
                                {movie.homepage ? <p><strong>Website: </strong>  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.original_title} Official Website</a></p> : null}

                                <div className="btn-div__movie-info">
                                    <div 
                                        data-aos="flip-right"
                                        data-aos-delay="550"
                                        data-aos-duration="600"
                                        data-aos-easing="ease-in-out"
                                        data-aos-anchor-placement="bottom"
                                        onClick={this.openModal} 
                                        className="btn btn-movie-info b1">
                                        <i className="fas fa-play"></i> View Trailer
                                    </div>
                                    <a 
                                        data-aos="flip-right"
                                        data-aos-delay="750"
                                        data-aos-duration="600"
                                        data-aos-easing="ease-in-out"
                                        data-aos-anchor-placement="bottom"
                                        className="btn btn-movie-info b1" href={`http://imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDB</a>
                                    <button
                                        data-aos="flip-right"
                                        data-aos-delay="950"
                                        data-aos-duration="600"
                                        data-aos-easing="ease-in-out"
                                        data-aos-anchor-placement="bottom"
                                        className="btn btn-movie-info b2" onClick={() => this.props.history.push('/movies')}>Back To Search</button>
                                </div>
                            </div>
                        </div>

                        <div>            
                            <img className="custom_bg_poster" src={base_url2 + movie.backdrop_path} alt=""/>
                            {/* <h1>{movie.original_title}</h1>  */}
                        </div>

                        {this.state.trailers.length > 0 ?
                            <div className="resp-container">
                                {this.state.trailers.slice(0,1).map(trailer => (
                                    <Modal 
                                        isOpen={this.state.modalIsOpen} 
                                        onRequestClose={this.closeModal}
                                        style={customStyles}>
                                        {/* <button className="modal-btn btn-movie-info b2" onClick={this.closeModal}>X</button> */}
                                        <iframe 
                                            key={trailer.key}
                                            className="resp-iframe"
                                            style={{borderRadius:"6px", margin:"10px auto"}} 
                                            title="1" 
                                            allow="encrypted-media" 
                                            allowFullScreen
                                            src={`https://www.youtube.com/embed/${trailer.key}`}
                                        />
                                    </Modal>
                                ))}
                            </div>
                        : null} 

                        <div style={{width: "100%"}}>
                            {this.state.credits ?
                                <section className="cast">
                                    <div>
                                        <h1 className="title">Cast</h1>
                                        <hr className="separator"/>
                                    </div>

                                    <div className="main-content">
                                        {this.state.credits &&
                                            this.state.credits.map(actor => {
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

                    <div>
                        <section className="recommendations">
                            {this.state.movieRecommedations.length > 0 ?
                                <div className="container slider">                                    
                                    <h1 className="title">Recommendations</h1>
                                    <hr className="separator"/>

                                    <SwiperSlider items={movieRecommedations} />

                                </div>
                            : null}
                        </section>
            
                        <section className="similar-movies">  
                            {this.state.similar_movies.length > 0 ?
                                <div>
                                    <h1 className="title" style={{textAlign:"center", paddingTop: "50px"}}><strong>Similar Movies</strong></h1>
                                    <hr className="separator"/>

                                    <SimilarMovieList
                                        movieList={this.state.similar_movies}
                                        getMovieById={this.getMovieById} 
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

export default MovieInfo;