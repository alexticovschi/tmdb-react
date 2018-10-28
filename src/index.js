import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import MovieInfo from './containers/MovieInfo/MovieInfo';
import * as serviceWorker from './serviceWorker';


import { BrowserRouter, Switch, Route } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/movie-info/:movie_id" component={MovieInfo} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
