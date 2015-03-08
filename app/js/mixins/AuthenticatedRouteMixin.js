'use strict';

var _                = require('lodash');
var Navigation       = require('react-router').Navigation;

var CurrentUserStore = require('../stores/CurrentUserStore');

var AuthenticatedRouteMixin = {

  mixins: [Navigation],

  componentDidUpdate: function() {
    console.log("Yup");
    if ( _.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked && this.isMounted() ) {
      this.replaceWith('Login');
    }
  }

};

module.exports = AuthenticatedRouteMixin;
