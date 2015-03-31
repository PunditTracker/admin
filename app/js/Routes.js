'use strict';

var React         = require('react/addons');
var Router        = require('react-router');
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;

var App           = require('./App');
var SetHeaderPage = require('./pages/SetHeaderPage');
var HomePage      = require('./pages/HomePage');
var CategoryPage  = require('./pages/CategoryPage');
var SearchPage    = require('./pages/SearchPage');
var LoginPage     = require('./pages/LoginPage');
var NotFoundPage  = require('./pages/NotFoundPage');
var AdvSearchPage = require('./pages/AdvSearchPage');

module.exports = (
  <Route handler={App}>

    <DefaultRoute handler={LoginPage} />

    <Route name='Login' path='/' handler={LoginPage} />
    <Route name='Home' path='/home' handler={HomePage} />
    <Route name='SetHeader' path='/SetHeader' handler={SetHeaderPage} />
    <Route name='Search' path='/search' handler={SearchPage} />
    <Route name='Category' path='/:category' handler={CategoryPage} />
    <Route name='AdvSearch' path='/advSearch' handler={AdvSearchPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);
