import React, { Component } from "react";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import TVShowNavigationButtons from "../../components/TVShowNavigationButtons/TVShowNavigationButtons";
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

import "./TVShows.scss";
import { APIKEY } from "../../config";

class TVShows extends Component {
  state = {
    airingTodayTVShows: []
  };

  componentDidMount() {
    this.getAiringTodayTVShows();
  }

  getAiringTodayTVShows = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?&api_key=${APIKEY}&language=en-US`
    );
    const airingTodayTVShows = await resp.json();
    this.setState({ airingTodayTVShows: airingTodayTVShows.results });
  };

  render() {
    const airingTodayTVShows = this.state.airingTodayTVShows;

    return (
      <div className="tvshows-wrapper">
        <SearchBoxWithSuggestionsTV />

        <div className="container tvshows">
          <div className="group">
            <div className="group-item line" />
            <h1 className="group-item text">Airing Today</h1>
            <div className="group-item line" />
          </div>

          <TVShowNavigationButtons />

          <TVShowsList
            tvShowList={airingTodayTVShows}
            getTVShowById={this.getTVShowById}
          />
        </div>

      </div>
    );
  }
}

export default TVShows;
