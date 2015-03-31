'use strict';

var Reflux = require('reflux');

var CurrentUserActions = Reflux.createActions([

  'checkLoginStatus',
  'login',
  'facebookLogin',
  'logout'

]);

module.exports = CurrentUserActions;