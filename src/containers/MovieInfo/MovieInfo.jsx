import React, { Component } from 'react';
import './MovieInfo.css';


class MovieInfo extends Component {
  state = {
    movie: []
  }

  componentDidMount() {
    const { movie_id } = this.props.match.params;
    this.getMovieById(movie_id);
  }

  getMovieById = async (ID) => {
    const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
    // https://api.themoviedb.org/3/movie/tt4154756?api_key=9baa3cbfd9b62ea4f97966abadf41653
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${ID}?&api_key=${APIKEY}&language=en-US`);

        const movie = await resp.json();

        this.setState({ movie });
        console.log('[MOVIE]:',this.state.movie);
        console.log({movie});
  }

  render() {
    const {movie} = this.state;
    const base_url = 'https://image.tmdb.org/t/p/w342';
    const genres = movie.genres;
    let list = genres && genres.map(g => g.name + ' ');

    return (
      <div className="box">
        <div className="flex-container">
          <div className="d1">
            <img className="img-info" src={base_url + movie.poster_path} alt={"img card"} />
          </div>
          <div className="d2">
              <h1 className="info-title"><strong>{movie.original_title}</strong></h1> 
              <hr/>
              {list !== null ? <p><strong>Genre:</strong>  {list}</p> : null}
              <p><strong>Released: </strong>  {movie.release_date}</p>
              <p><strong>Tagline: </strong>  {movie.tagline}</p> 
              {movie.BoxOffice ? <p><strong>BoxOffice: </strong>  {movie.BoxOffice}</p> : null}
              {movie.homepage ? <p><strong>Website: </strong>  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p> : null}
          </div> 
          <div className="d3">
            <p className="plot"><strong>Plot: </strong>  {movie.overview}</p>
            <div className="btn-div">
              <a className="btn btn-info b1" href={`http://imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDB</a>
              <button className="btn btn-info b2" onClick={() => this.props.history.push('/')}>Back To Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieInfo;