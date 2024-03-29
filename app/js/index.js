'use strict';

var React     = require('react/addons');
var Router    = require('react-router');

var routes    = require('./Routes');
var subdomain = window.location.host.split('.')[0];
var hostname  = window.location.hostname;

if ( subdomain === 'dev' || hostname === 'localhost' || process.env.NODE_ENV !== 'production' ) {
  window.React = React; // Enable React devtools
}

Router.HistoryLocation.replace(Router.HashLocation.getCurrentPath());

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler params={state.params} query={state.query} />, document.getElementById('app'));
});