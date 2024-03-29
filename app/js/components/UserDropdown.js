'use strict';

var React              = require('react/addons');
var Navigation         = require('react-router').Navigation;
var $                  = require('jquery');
var cx                 = require('classnames');

var CurrentUserActions = require('../actions/CurrentUserActions');

var UserDropdown = React.createClass({

  mixins: [Navigation],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialState: function() {
    return {
      showDropdown: false
    };
  },

  toggleDropdown: function() {
    this.setState({ showDropdown: !this.state.showDropdown }, this.setDocumentListener);
  },

  setDocumentListener: function() {
    if ( this.state.showDropdown ) {
      $(document).on('click', this.toggleDropdown);
    } else {
      $(document).off('click', this.toggleDropdown);
    }
  },

  renderDropdown: function() {
    var classes = cx({
      'dropdown': true,
      'show': this.state.showDropdown
    });

    return (
      <ul className={classes}>
        <li>
          Log Out
          <a onClick={CurrentUserActions.logout.bind(null, null)} />
        </li>
      </ul>
    );
  },

  render: function() {
    var avatarStyles = {
      'backgroundImage': 'url(' + this.props.currentUser.avatarUrl + ')'
    };

    return (
      <div className="user-dropdown">

        <div className="avatar" style={avatarStyles} onClick={this.toggleDropdown} />

        {this.renderDropdown()}

      </div>
    );
  }

});

module.exports = UserDropdown;