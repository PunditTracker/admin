'use strict';

var _                = require('lodash');
var Navigation       = require('react-router').Navigation;

var CurrentUserStore = require('../stores/CurrentUserStore');

var AuthenticatedRouteMixin = {

  mixins: [Navigation],

  _checkIfRedirect: function() {
    var userNotAdmin = !CurrentUserStore.user.isAdmin;
    var checkedAndNoUser =  _.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked;

    if ( (userNotAdmin || checkedAndNoUser) && this.isMounted() ) {
      this.replaceWith('Login');
    }
  },

  componentDidMount: function() {
    this._checkIfRedirect();
  },
  componentDidUpdate: function()
  {
    this._checkIfRedirect();
  }


};

module.exports = AuthenticatedRouteMixin;
