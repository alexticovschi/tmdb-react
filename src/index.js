import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import MovieInfo from './containers/MovieInfo/MovieInfo';
import ActorProfileInfo from './containers/ActorProfileInfo/ActorProfileInfo';
import ActorImages from './containers/ActorImages/ActorImages';
import TVShows from './containers/TVShows/TVShows';
import TVShowInfo from './containers/TVShowInfo/TVShowInfo';
import PopularTvShows from './containers/PopularTvShows/PopularTvShows';
import NowOnTheAirTVShows from './containers/NowOnTheAirTVShows/NowOnTheAirTVShows';
import TopRatedTvShows from './containers/TopRatedTvShows/TopRatedTvShows';
import LatestTvShows from './containers/LatestTvShows/LatestTvShows';

import Home from './containers/Home/Home';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={App} />
            <Route exact path="/tv-shows" component={TVShows} />
            <Route exact path="/tv-shows/popular" component={PopularTvShows} />
            <Route exact path="/tv-shows/now-on-the-air" component={NowOnTheAirTVShows} />
            <Route exact path="/tv-shows/top-rated" component={TopRatedTvShows} />
            <Route exact path="/tv-shows/latest" component={LatestTvShows} />
            <Route exact path="/tv-show-info/:tv_show_id" component={TVShowInfo} />
            <Route exact path="/movie-info/:movie_id" component={MovieInfo} />
            <Route exact path="/cast/actor-bio/:actor_id" component={ActorProfileInfo} />
            <Route exact path="/cast/:actor_id/images/profiles" component={ActorImages} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
