/**
 * @jsx React.DOM
 */
'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var RouteHandler       = React.createFactory(require('react-router').RouteHandler);

var CurrentUserActions = require('./actions/CurrentUserActions');
var CurrentUserStore   = require('./stores/CurrentUserStore');
var Header             = require('./components/Header');
var Footer             = require('./components/Footer');

var App = React.createClass({

  mixins: [Reflux.ListenerMixin, React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      currentUser: {},
      categories: [{name:"Home", path: "Home"}, {name: "Finance", path: "Finance"}, {name: "Sports", path: "Sports"} ]
    };
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ currentUser: user || {}, error: null });
    }
  },

  componentDidMount: function() {
    CurrentUserActions.checkLoginStatus(this._onUserChange);
    this.listenTo(CurrentUserStore, this._onUserChange);
  },

  render: function() {
    return (
      <div>

        <Header currentUser={this.state.currentUser} categories={this.state.categories} />

        <RouteHandler params={this.props.params}
                      query={this.props.query}
                      currentUser={this.state.currentUser} />


      </div>
    );
  }

});

module.exports = App;
