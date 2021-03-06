import React, { Component } from "react";
import TVShowsList from "../../components/TVShowsList/TVShowsList";
import TVShowNavigationButtons from "../../components/TVShowNavigationButtons/TVShowNavigationButtons";
import SearchBoxWithSuggestionsTV from "../../components/SearchBoxWithSuggestionsTV/SearchBoxWithSuggestions";

import { APIKEY } from "../../config";

class NowOnTheAirTVShows extends Component {
  state = {
    nowOnTheAirTVShows: []
  };

  componentDidMount() {
    this.getNowOnTheAirTVShows();
  }

  getNowOnTheAirTVShows = async ID => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?&api_key=${APIKEY}&language=en-US`
    );
    const nowOnTheAirTVShows = await resp.json();
    this.setState({ nowOnTheAirTVShows: nowOnTheAirTVShows.results });
  };

  render() {
    const nowOnTheAirTVShows = this.state.nowOnTheAirTVShows;

    return (
      <div className="tvshows-wrapper">
        <SearchBoxWithSuggestionsTV />

        <div className="container tvshows">
          <div className="group">
            <div className="group-item line" />
            <h1 className="group-item text">Now On The Air</h1>
            <div className="group-item line" />
          </div>

          <TVShowNavigationButtons />

          <TVShowsList
            tvShowList={nowOnTheAirTVShows}
            getTVShowById={this.getTVShowById}
          />
        </div>

      </div>
    );
  }
}

export default NowOnTheAirTVShows;
