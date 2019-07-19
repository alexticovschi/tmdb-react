import React from "react";
import TVShowItem from "../TVShowItem/TVShowItem";

const TVShowsList = ({ tvShowList, getTVShowById }) => {
  const base_url = "https://image.tmdb.org/t/p/w342";
  const not_available_poster =
    "https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available";
  const tv_shows_list =
    tvShowList &&
    tvShowList.map((tvShow, idx) => (
      <TVShowItem
        key={idx}
        getTVShowById={getTVShowById}
        id={tvShow.id}
        releaseDate={tvShow.first_air_date}
        title={tvShow.name}
        firstAirDate={tvShow.first_air_date.slice(0, 4)}
        voteAvg={tvShow.vote_average}
        poster={
          tvShow.poster_path === null
            ? not_available_poster
            : base_url + tvShow.poster_path
        }
      />
    ));
  return (
    <div className="container">
      <main className="main-content">{tv_shows_list}</main>
    </div>
  );
};

export default TVShowsList;
