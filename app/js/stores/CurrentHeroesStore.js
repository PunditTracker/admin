'use strict';

var Reflux             = require('reflux');

var CurrentHeroesActions = require('../actions/CurrentHeroesActions');
var HeroAPI     = require('../utils/HeroAPI');
var _ = require('lodash');

var CurrentHeroesStore = Reflux.createStore({

  init: function() {
    this.heroes = null;
    this.hasBeenChecked = false;

    this.listenTo(CurrentHeroesActions.getHeroes, this.getHeroes);
    // this.listenTo(CurrentUserActions.login, this.loginUser);
    //this.listenTo(CurrentUserActions.logout, this.logoutUser);
  },

  setHeroes: function(hero, cb) {
    var reconstructHero = {};
    _.map(hero, function(heroObj, id) {
      reconstructHero[heroObj.locationNum] = heroObj;
    });
    this.heroes= reconstructHero;
    cb(null, this.heroes);
    this.trigger(null, this.heroes);
  },

  throwError: function(err, cb) {
    cb(err);
    this.trigger(err);
  },
  getHeroes: function(cb) {
    cb = cb || function() {};

    HeroAPI.getHero().then(function(hero) {
      this.hasBeenChecked = true;
      this.setHeroes(hero, cb);
    }.bind(this)).catch(function(err) {
      this.hasBeenChecked = true;
      this.throwError(err, cb);
    }.bind(this));
  },
  /*
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
this.throwError({message:"User is not authorized."}, cb);
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
if (user.isAdmin)
this.setUser(user, cb);
else
this.throwError({message: "User is not authorized."}, cb);
}.bind(this)).catch(function(err) {
this.throwError(err, cb);
}.bind(this));
},

logoutUser: function(cb) {
cb = cb || function() {};

AuthAPI.logout(this.user).then(function() {
this.setUser(null, cb);
}.bind(this));
}
*/
});

module.exports = CurrentHeroesStore;
