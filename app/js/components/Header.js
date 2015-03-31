/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Link            = require('react-router').Link;
var APIUtils        = require('../utils/APIUtils');
var _               = require('lodash');
var CurrentUserActions = require('../actions/CurrentUserActions');

var Header = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },
  categoryLinks: function()
  {
    var elements = null;
    elements = _.map(this.props.categories, function(category, index) {
      return(
        <li>
          <Link to={category.path}>
            {category.name}
          </Link>
        </li>
      );
    });
    return elements;
  },
  logout: function(e)
  {
    e.preventDefault();
    CurrentUserActions.logout(this._onUserChange);
  },
  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ loading: false, error: err.message });
    }
  },
  getLogoutButton: function()
  {
    if (!_.isEmpty(this.props.currentUser))
      {
        return (<a className="user-option button" href="/logout" onClick={this.logout}>Logout</a>);
      }
  },
  render: function() {
    return (
      <header>
        <nav>
          <div className="pure-g">
            <div className="pure-u-1">
              <Link to="Home">
                <img className="logo-image" src="../images/logo-blue.png" alt="PunditTracker logo" />
              </Link>
              <ul className="categories">
                {this.categoryLinks()}
              </ul>
              {this.getLogoutButton()}
            </div>
          </div>
        </nav>
      </header>
    );
  }

});

module.exports = Header;
