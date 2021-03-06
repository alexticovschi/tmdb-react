import React, { Component } from "react";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import TVShowNavigationButtons from "../../components/TVShowNavigationButtons/TVShowNavigationButtons";
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

import { APIKEY } from "../../config";

class TopRatedTvShows extends Component {
  state = {
    topRatedTVShows: []
  };

  componentDidMount() {
    this.getTopRatedTVShows();
  }

  getTopRatedTVShows = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?&api_key=${APIKEY}&language=en-US`
    );
    const topRatedTVShows = await resp.json();
    this.setState({ topRatedTVShows: topRatedTVShows.results });
  };

  render() {
    const topRatedTVShows = this.state.topRatedTVShows;

    return (
      <div className="tvshows-wrapper">
        <SearchBoxWithSuggestionsTV />

        <div className="container tvshows">
          <div className="group">
            <div className="group-item line" />
            <h1 className="group-item title text">Top Rated</h1>
            <div className="group-item line" />
          </div>

          <TVShowNavigationButtons />

          <TVShowsList
            tvShowList={topRatedTVShows}
            getTVShowById={this.getTVShowById}
          />
        </div>

      </div>
    );
  }
}

export default TopRatedTvShows;
