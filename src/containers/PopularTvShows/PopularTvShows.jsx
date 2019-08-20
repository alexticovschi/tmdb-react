import React, { Component } from "react";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import TVShowNavigationButtons from "../../components/TVShowNavigationButtons/TVShowNavigationButtons";
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

import { APIKEY } from "../../config";

class PopularTvShows extends Component {
  state = {
    popularTVShows: []
  };

  componentDidMount() {
    this.getPopularTVShows();
  }

  getPopularTVShows = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/popular?&api_key=${APIKEY}&language=en-US`
    );
    const popularTVShows = await resp.json();
    this.setState({ popularTVShows: popularTVShows.results });
  };

  render() {
    const popularTvShows = this.state.popularTVShows;

    return (
      <div className="tvshows-wrapper">
        <SearchBoxWithSuggestionsTV />

        <div className="container tvshows">
          <div className="group">
            <div className="group-item line" />
            <h1 className="group-item text">Popular</h1>
            <div className="group-item line" />
          </div>

          <TVShowNavigationButtons />

          <TVShowsList
            tvShowList={popularTvShows}
            getTVShowById={this.getTVShowById}
          />
        </div>

      </div>
    );
  }
}

export default PopularTvShows;
