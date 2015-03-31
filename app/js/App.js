'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var _                  = require('lodash');
var RouteHandler       = require('react-router').RouteHandler;

var CurrentUserActions = require('./actions/CurrentUserActions');
var CurrentUserStore   = require('./stores/CurrentUserStore');
var Header             = require('./components/Header');

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

  renderHeader: function() {
    var element = null;

    // Don't render header on login page
    if ( !_.isEmpty(this.state.currentUser) ) {
      element = (
        <Header currentUser={this.state.currentUser}
                categories={this.state.categories} />
      );
    }

    return element;
  },

  render: function() {
    return (
      <div>

        {this.renderHeader()}

        <RouteHandler params={this.props.params}
                      query={this.props.query}
                      currentUser={this.state.currentUser}
                      setCategory={this.setCategory} />

      </div>
    );
  }

});

module.exports = App;
