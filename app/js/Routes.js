'use strict';

var React                   = require('react/addons');
var Router                  = require('react-router');
var Route                   = Router.Route;
var NotFoundRoute           = Router.NotFoundRoute;
var DefaultRoute            = Router.DefaultRoute;

var App                     = require('./App');
var LoginPage               = require('./pages/LoginPage');
var HomePage                = require('./pages/HomePage');
var NotFoundPage            = require('./pages/NotFoundPage');
var SetHeroPage             = require('./pages/SetHeroPage');
var SetPredictionsPage      = require('./pages/SetPredictionsPage');
var PredictionSearchPage    = require('./pages/PredictionSearchPage');
var UserSearchPage          = require('./pages/UserSearchPage');
var AnyUserPredictPage      = require('./pages/AnyUserPredictPage');
var SpecialEventResultsPage = require('./pages/SpecialEventResultsPage');

module.exports = (
  <Route handler={App}>

    <DefaultRoute handler={LoginPage} />

    <Route name='Login' path='/' handler={LoginPage} />
    <Route name='Home' path='/home' handler={HomePage} />
    <Route name='SetHero' path='/set-hero' handler={SetHeroPage} />
    <Route name='PredictionSearch' path='/search/predictions' handler={PredictionSearchPage} />
    <Route name='UserSearch' path='/search/user' handler={UserSearchPage} />

    <Route name='AnyUserPredict' path='/predict' handler={AnyUserPredictPage} />
    <Route name='SubmitSpecialEventResults' path='/special-event' handler={SpecialEventResultsPage} />

    <Route name='SetPredictions' path='/set-predictions' handler={SetPredictionsPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);
