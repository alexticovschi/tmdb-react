import React, { Component } from "react";
import ActorFilmographyList from "../../components/ActorFilmographyList/ActorFilmographyList";
import { Link } from "react-router-dom";
import ShowMore from "react-show-more";
import ImageZoom from "react-medium-image-zoom";
import Loader from "../../components/Loader/Loader";
import SearchBoxWithSuggestions from "../../components/SearchBoxWithSuggestionsPerson/SearchBoxWithSuggestions";

import { APIKEY } from "../../config";

import "./ActorProfileInfo.scss";

import Fade from "react-reveal/Fade";

class ActorProfileInfo extends Component {
  state = {
    actorProfileInfo: [],
    actorFilmographyData: [],
    actorTaggedImages: []
  };

  componentDidMount() {
    const { actor_id } = this.props.match.params;
    this.getActorProfileInfo(actor_id);
    this.getActorFilmographyData(actor_id);
    this.getActorTaggedImages(actor_id);
  }

  getActorProfileInfo = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}?api_key=${APIKEY}&language=en-US`
    );
    const actorProfileInfo = await resp.json();
    this.setState({ actorProfileInfo });
  };

  getActorFilmographyData = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}/combined_credits?api_key=${APIKEY}&language=en-US`
    );
    const actorFilmographyData = await resp.json();
    this.setState({ actorFilmographyData: actorFilmographyData.cast });
  };

  getActorTaggedImages = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/person/${ID}/tagged_images?api_key=${APIKEY}&language=en-US&page=1`
    );
    const actorTaggedImages = await resp.json();
    this.setState({ actorTaggedImages: actorTaggedImages.results });
  };

  render() {
    const base_url = "https://image.tmdb.org/t/p/w500";
    const base_url2 = "https://image.tmdb.org/t/p/original";

    const actor = this.state.actorProfileInfo;
    const filmography = this.state.actorFilmographyData;

    return (
      <div className="actor-profile-wrapper">
        <SearchBoxWithSuggestions />

        <div className="container">
          <div className="row-actor-profile-info">
            <div className="side">
            <Fade delay={400}>
              <img
                className="actor-profile-img"
                src={
                  actor.profile_path === null
                    ? "https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg"
                    : base_url + actor.profile_path
                }
                alt={"img card"}
              />
              </Fade>
            </div>
            <div className="actor-profile main">
              <div className="inner-main">
                <div className="group actor-name" style={{ marginTop: "30px" }}>
                  <div className="group-item line-left" />
                  <h1 className="actor-name group-item text">{actor.name}</h1>
                  <div className="group-item line-right" />
                </div>

                <div className="bio-content">
                  <div className="actor-bio-text">
                    <h4 style={{ paddingTop: "12px", marginBottom: "6px" }}>
                      Biography:
                    </h4>

                    <ShowMore
                      lines={3}
                      more="Show more"
                      less="Show less"
                      anchorClass="actor-biography-anchor"
                    >
                      {actor.biography}
                    </ShowMore>
                  </div>

                  <div>
                    <h4>
                      Known For: <span>{actor.known_for_department}</span>
                    </h4>
                    <h4>
                      Gender:{" "}
                      <span>{actor.gender === 1 ? "Female" : "Male"}</span>
                    </h4>
                    <h4>
                      Birthday: <span>{actor.birthday}</span>
                    </h4>
                    <h4>
                      Place of Birth: <span>{actor.place_of_birth}</span>
                    </h4>
                    {actor.homepage !== null ? (
                      <h4>
                        Official Site:{" "}
                        <span>
                          <a href={actor.homepage}>{actor.homepage}</a>
                        </span>
                      </h4>
                    ) : null}
                  </div>

                  <div className="actor-profile-btn">
                    <Link
                      to={`/cast/${actor.id}/images/profiles`}
                      className="button movie-info"
                    >
                      Images
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {this.state.actorTaggedImages.length > 0 ? (
              <section className="tagged-images">
                <div className="group tagged-images">
                  <div className="group-item line" />
                  <h1 className="title filmography group-item text">
                    Tagged Images
                  </h1>
                  <div className="group-item line" />
                </div>

                <div className="masonry">
                  {this.state.actorTaggedImages.map((img, i) => (
                    <div className="item" key={i}>
                      <ImageZoom
                        image={{
                          src: `${base_url + img.file_path}`,
                          alt: "actor profile image small"
                        }}
                        zoomImage={{
                          src: `${base_url2 + img.file_path}`,
                          alt: "actor profile image original"
                        }}
                      />
                      <div className="text-content">
                        <div className="title">
                          {img.media.original_title || img.media.original_name}(
                          {img.media.release_date
                            ? img.media.release_date.substr(0, 4)
                            : null || img.media.first_air_date
                            ? img.media.first_air_date.substr(0, 4)
                            : null}
                          )
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <section className="container filmography-profile-info">
            {filmography.length && filmography.length > 0 ? (
              <div>
                <div className="group">
                  <div className="group-item line" />
                  <h1 className="title group-item text">Filmography</h1>
                  <div className="group-item line" />
                </div>

                <div className="similar_movies">
                  <ActorFilmographyList movieList={filmography} />
                </div>
              </div>
            ) : null}
          </section>
        </div>

        <Loader />
      </div>
    );
  }
}

export default ActorProfileInfo;
