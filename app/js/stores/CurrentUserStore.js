'use strict';

var Reflux             = require('reflux');

var CurrentUserActions = require('../actions/CurrentUserActions');
var AuthAPI            = require('../utils/AuthAPI');

var CurrentTrackStore = Reflux.createStore({

  init: function() {
    this.user = null;
    this.hasBeenChecked = false;

    this.listenTo(CurrentUserActions.checkLoginStatus, this.checkLoginStatus);
    this.listenTo(CurrentUserActions.login, this.loginUser);
    this.listenTo(CurrentUserActions.facebookLogin, this.doFacebookLogin);
    this.listenTo(CurrentUserActions.logout, this.logoutUser);
  },

  setUser: function(user, cb) {
    this.user = user;
    cb(null, this.user);
    this.trigger(null, this.user);
  },

  throwError: function(err, cb) {
    cb(err);
    this.trigger(err);
  },

  checkLoginStatus: function(cb) {
    cb = cb || function() {};

    if ( this.user ) {
      this.setUser(this.user, cb);
    } else {
      AuthAPI.checkLoginStatus().then(function(user) {
        this.hasBeenChecked = true;
        if (user.isAdmin) {
          this.setUser(user, cb);
        }
        else {
          this.throwError({message:'User is not authorized.'}, cb);
        }
      }.bind(this)).catch(function(err) {
        this.hasBeenChecked = true;
        this.throwError(err, cb);
      }.bind(this));
    }
  },

  loginUser: function(user, cb) {
    cb = cb || function() {};

    AuthAPI.login(user).then(function(user) {
      if (user.isAdmin) {
        this.setUser(user, cb);
      } else {
        this.throwError({message: 'User is not authorized.'}, cb);
      }
    }.bind(this)).catch(function(err) {
      this.throwError(err, cb);
    }.bind(this));
  },

  doFacebookLogin: function(user, cb) {
    cb = cb || function() {};

    console.log('facebook login user');

    AuthAPI.facebookLogin(user).then(function(user) {
      if (user.isAdmin) {
        this.setUser(user, cb);
      } else {
        this.throwError({message: 'User is not authorized.'}, cb);
      }
    }.bind(this)).catch(function(err) {
      this.throwError(err, cb);
    }.bind(this));
  },

  logoutUser: function(cb) {
    cb = cb || function() {};
    AuthAPI.logout(this.user);
    this.setUser(null, cb);
  }

});

module.exports = CurrentTrackStore;
