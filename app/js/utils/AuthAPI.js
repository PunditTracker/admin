'use strict';

var APIUtils = require('./APIUtils');

var AuthAPI = {

  checkLoginStatus: function() {
    return APIUtils.get('auth/check');
  },

  login: function(user) {
    return APIUtils.post('auth/login', user);
  },

  facebookLogin: function(user) {
    return APIUtils.post('auth/loginfb', user);
  },

  logout: function() {
    return APIUtils.post('auth/logout');
  }

};

module.exports = AuthAPI;
