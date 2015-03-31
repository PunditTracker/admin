/**
 * @jsx React.DOM
 */
'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var RouteHandler       = require('react-router').RouteHandler;

var CurrentUserActions = require('./actions/CurrentUserActions');
var CurrentUserStore   = require('./stores/CurrentUserStore');
var Header             = require('./components/Header');
var Footer             = require('./components/Footer');

var App = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      currentUser: {},
      currentCategory: -1,
      categories: [{name:"Home", path: "Home", categoryId: 0}, {name: "Finance", path: "Finance", categoryId: 1}, {name: "Sports", path: "Sports", categoryId: 2} ]
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
  setCategory: function(cat) {
    this.setState({currentCategory: cat});
  },

  render: function() {
    return (
      <div>


        <RouteHandler params={this.props.params}
                      query={this.props.query}
                      currentUser={this.state.currentUser}
                      setCategory={this.setCategory} />


      </div>
    );
  }

});

module.exports = App;
