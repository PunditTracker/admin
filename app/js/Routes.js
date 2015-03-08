/**
 * @jsx React.DOM
 */
'use strict';

var Router        = require('react-router');
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;

var App           = require('./App');
var HomePage      = require('./pages/HomePage');
var Finance = require('./pages/HomePage');
var Sports = require('./pages/HomePage');
var SearchPage    = require('./pages/SearchPage');
var Login = require('./pages/Login');
var NotFoundPage  = require('./pages/NotFoundPage');

module.exports = (
  <Route handler={App} path='/'>

    <DefaultRoute handler={HomePage} />

    <Route name='Home' path='/' handler={HomePage} />
    <Route name='Search' path='/search' handler={SearchPage} />
    <Route name='Finance' path='/finance' handler={Finance} />
    <Route name='Sports' path='/sports' handler={Sports} />
    <Route name='Login' path='/login' handler={Login} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);
