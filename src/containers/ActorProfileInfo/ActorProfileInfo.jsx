import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import ActorFilmographyList from "../../components/ActorFilmographyList/ActorFilmographyList";
import { Link } from 'react-router-dom';

import "./ActorProfileInfo.css";

class ActorProfileInfo extends Component {
  state = {
    actorProfileInfo: [],
    actorFilmographyData: []
  };

  componentDidMount() {
    const { actor_id } = this.props.match.params;
    this.getActorProfileInfo(actor_id);
    this.getActorFilmographyData(actor_id);
  }

  getActorProfileInfo = async ID => {
    const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}?api_key=${APIKEY}&language=en-US`
    );

    const actorProfileInfo = await resp.json();
    this.setState({ actorProfileInfo });
    console.log("[ACTOR PROFILE]", actorProfileInfo);
  };

  getActorFilmographyData = async ID => {
    const APIKEY = "9baa3cbfd9b62ea4f97966abadf41653";
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}/combined_credits?api_key=${APIKEY}&language=en-US`
    );

    const actorFilmographyData = await resp.json();
    const actorFilmography = actorFilmographyData.cast.filter((movie) => movie.media_type !== "tv");
    console.log('[actorFilmography]',actorFilmographyData.cast);
    this.setState({ actorFilmographyData: actorFilmography });
  };

  render() {
    const base_url = "https://image.tmdb.org/t/p/w500";
    const actor = this.state.actorProfileInfo;
    const filmography = this.state.actorFilmographyData;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="side">
              <img
                className="actor_profile_img"
                src={
                  actor.profile_path === null
                    ? "https://www.matajikesarwala.com/wp-content/uploads/2018/05/man-dummy.jpg"
                    : base_url + actor.profile_path
                }
                alt={"img card"}
              />
            </div>
            <div className="main">
              <div className="inner_main">
                <h1 className="actor_nm">{actor.name}</h1>
                <div className="bio_content">
                  <h2 className="bio_title">Biography</h2>
                  <p>{actor.biography}</p>
                </div>
              </div>
              <button
                className="bio_btn"
                onClick={() => this.props.history.goBack()}
              >
                Back To Movie Info
              </button>
            </div>
          </div>

          <div className="personal_info">
            <div>
              <h2>Personal Info</h2>
              <h4>
                Known For: <span>{actor.known_for_department}</span>
              </h4>
              <h4>
                Gender: <span>{actor.gender === 1 ? "Female" : "Male"}</span>
              </h4>
              <h4>
                Birthday: <span>{actor.birthday}</span>
              </h4>
              <h4>
                Place of Birth: <span>{actor.place_of_birth}</span>
              </h4>
              {actor.homepage !== null ?
                <h4>
                    Official Site: <span><a href={actor.homepage} >{actor.homepage}</a></span>
                </h4>
               : null}
            </div>
          </div>

          <div className="flex-container">
            {filmography.length && filmography.length > 0 ? (
              <div className="similar_movies">
                <h1>{actor.name} - <span className="bio_title">Filmography</span></h1>
                <ActorFilmographyList
                  movieList={filmography}
                />

                <button
                  className="btn btn-info b3"
                  onClick={() => this.props.history.push("/")}
                >
                  Back To Search
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <Loader />
      </div>
    );
  }
}

export default ActorProfileInfo;
