import React, { Component } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ActorImageCard from '../../components/ActorImageCard/ActorImageCard';
import SwiperSlider from "../../components/SwiperSlider/SwiperSlider";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestions/SearchBoxWithSuggestions";

import './MovieInfo.scss';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Modal from 'react-modal';

import { APIKEY } from '../../config';


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
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);
        const movie = await resp.json();
        this.setState({ movie });
    }

    getSimilarMovies = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/similar?&api_key=${APIKEY}&language=en-US&page=1`);
        const movies = await resp.json();
        this.setState({ similar_movies: movies.results });
    }

    getMovieCredits = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/credits?&api_key=${APIKEY}&language=en-US`);
        const credits = await resp.json();
        this.setState({ credits: credits.cast });
    }

    getMovieRecommendations = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/recommendations?&api_key=${APIKEY}&language=en-US&page=1`);
        const movieRecommedations = await resp.json();
        this.setState({ movieRecommedations: movieRecommedations.results });
    }

    getTrailers = async (ID) => {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}/videos?&api_key=${APIKEY}&language=en-US`);
        const trailers = await resp.json();
        this.setState({ trailers: trailers.results });
    }

    render() {
        const {movie, movieRecommedations} = this.state;
        const base_url = 'https://image.tmdb.org/t/p/w500';
        const base_url2 = 'https://image.tmdb.org/t/p/w1400_and_h450_face';
        // const base_url3 = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
        const not_available_poster = "https://dummyimage.com/342x500/7b8a91/ffffff&text=Poster+Not+Available";

        const genres = movie.genres;
        let list = genres && genres.map(g => g.name + ' ');

        return (
            <div className="box-movie-info">
                <SearchBoxWithSuggestions/>

                <div className="container">
                    <div className="row">
                        <div 
                            className="box-left" 
                            data-aos="fade-in"
                            data-aos-delay="50"
                            data-aos-duration="600"
                            data-aos-easing="ease-in-out"
                            data-aos-anchor-placement="bottom"
                        >
                            <img className="img-info" src={ movie.poster_path === null ? not_available_poster: base_url + movie.poster_path } alt={"img card"} />
                        </div>

                        <div className="box-right">
                            <div className="inner-box-right">
                                <div className="group movie-info">
                                    <div className="group-item line-left"></div>
                                    <h1 className="movie-info-title group-item text">{movie.original_title}</h1> 
                                    <div className="group-item line-right"></div>
                                </div>
                                
                                {list !== null ? <p><strong>Genre:</strong>  {list}</p> : null}
                                <div className="star-rating">
                                    <strong>Rating: </strong>
                                    <Rater interactive={false} total={5} rating={movie.vote_average / 2} />
                                </div>

                                <p><strong>Released: </strong>  {movie.release_date}</p>
                                <p><strong>Overview: </strong>  {movie.overview}</p> 
                                {movie.BoxOffice ? <p><strong>BoxOffice: </strong>  {movie.BoxOffice}</p> : null}
                                {movie.homepage ? <p><strong>Website: </strong>  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.original_title} Official Website</a></p> : null}

                                <div className="btn-movie-info">
                                    <a 
                                        data-aos="flip-right"
                                        data-aos-delay="750"
                                        data-aos-duration="600"
                                        data-aos-easing="ease-in-out"
                                        data-aos-anchor-placement="bottom"
                                        className="button movie-info" href={`http://imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDB</a>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="playContainer">            
                            <div className="image">
                                <img className="custom_bg_poster" src={base_url2 + movie.backdrop_path} alt=""/>
                            </div>
                            {this.state.trailers.length > 0 ?
                                <div 
                                    onClick={this.openModal} 
                                    className="play button-light">
                                    <i className="fas fa-play"></i>
                                </div>
                            : null}
                        </div>

                        {this.state.trailers.length > 0 ?
                            <div className="resp-container">
                                {this.state.trailers.slice(0,1).map(trailer => (
                                    <Modal 
                                        key={trailer.key}
                                        isOpen={this.state.modalIsOpen} 
                                        onRequestClose={this.closeModal}
                                        style={customStyles}>

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
                            {this.state.credits && this.state.credits.length > 0 ?
                                <section className="cast">
                                    <div className="group">
                                        <div className="group-item line"></div>
                                        <h1 className="title group-item text">Cast</h1>
                                        <div className="group-item line"></div>
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
                        {this.state.movieRecommedations.length > 0 ?
                            <section className="recommendations">
                                <div className="container slider">                                    
                                    <div className="group">
                                        <div className="group-item line"></div>
                                        <h1 className="title group-item text">Recommendations</h1>
                                        <div className="group-item line"></div>
                                    </div>
 
                                    <SwiperSlider items={movieRecommedations} />

                                </div>
                            </section>
                        : null}
                        
            
                        {this.state.similar_movies.length > 0 ?
                            <section className="similar-movies">  
                                <div>
                                    <div className="group">
                                        <div className="group-item line"></div>
                                        <h1 className="title group-item text">Similar Movies</h1>
                                        <div className="group-item line"></div>
                                    </div>

                                    <MovieList
                                        movieList={this.state.similar_movies}
                                        getMovieById={this.getMovieById} 
                                    />                           
                                </div>
                            </section>  
                        : null}
                           
                    </div>  
                </div> 

                <Loader/>
            </div>
        );
    }
}

export default MovieInfo;