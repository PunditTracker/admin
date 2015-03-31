'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var Link            = require('react-router').Link;
var Navigation      = require('react-router').Navigation;

var APIUtils        = require('../utils/APIUtils');
var UserDropdown    = require('../components/UserDropdown');
var ListLink        = require('./ListLink');

var Header = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      categories: []
    };
  },

  getInitialState: function() {
    return {
      query: ''
    };
  },

  handleKeyPress: function(evt) {
    var keyCode = evt.keyCode || evt.which;

    if ( keyCode === '13' || keyCode === 13 ) {
      this.doSearch();
    }
  },

  doSearch: function() {
    this.transitionTo('Search', {}, { q: this.state.query });

    this.setState({ query: '' }, function() {
      this.refs.searchInput.getDOMNode().blur();
    }.bind(this));
  },

  renderCategoryLinks: function() {
    var elements = null;

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, function(category, index) {
        return (
          <ListLink to="Category" params={{ category: category.name.toLowerCase() }} key={index}>
            {APIUtils.titleCase(category.name)}
          </ListLink>
        );
      });
    }

    return elements;
  },

  renderLink: function() {
    var element = null;

    if ( _.isEmpty(this.props.currentUser) ) {
      element = (
        <a className="user-option non-button nudge-half--left" onClick={this.toggleLoginModal}>Log in</a>
      );
    } else {
      element = (
        <UserDropdown currentUser={this.props.currentUser} />
      );
    }

    return element;
  },

  render: function() {
    return (
      <header className={this.props.className}>

        <nav>
          <div className="pure-g">
            <div className="pure-u-1">
              <Link to="Home">
                <img className="logo-image" src="../images/logo_black.png" alt="PunditTracker logo" />
              </Link>
              <ul className="categories">
                {this.renderCategoryLinks()}
                <li><a href="http://blog.pundittracker.com/" target="_blank">Blog</a></li>
              </ul>
              {this.renderLink()}
            </div>
          </div>
        </nav>

      </header>
    );
  }

});

module.exports = Header;