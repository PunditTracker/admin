'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var _                  = require('lodash');
var RouteHandler       = require('react-router').RouteHandler;

var GlobalActions      = require('./actions/GlobalActions');
var CurrentUserActions = require('./actions/CurrentUserActions');
var CategoriesStore    = require('./stores/CategoriesStore');
var CurrentUserStore   = require('./stores/CurrentUserStore');
var Header             = require('./components/Header');

var App = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      currentUser: {},
      currentCategory: -1,
      categories: []
    };
  },

  _onCategoriesChange: function(err, categories) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ categories: categories || [] });
    }
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ currentUser: user || {}, error: null });
    }
  },

  componentDidMount: function() {
    GlobalActions.loadCategories(this._onCategoriesChange);
    CurrentUserActions.checkLoginStatus(this._onUserChange);
    this.listenTo(CategoriesStore, this._onCategoriesChange);
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
        <Header currentUser={this.state.currentUser} />
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
                      categories={this.state.categories}
                      setCategory={this.setCategory} />

      </div>
    );
  }

});

module.exports = App;
