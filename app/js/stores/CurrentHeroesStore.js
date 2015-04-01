'use strict';

var Reflux               = require('reflux');
var _                    = require('lodash');

var CurrentHeroesActions = require('../actions/CurrentHeroesActions');
var HeroAPI              = require('../utils/HeroAPI');

var CurrentHeroesStore = Reflux.createStore({

  init: function() {
    this.heroes = null;

    this.listenTo(CurrentHeroesActions.getHeroes, this.getHeroes);
    this.listenTo(CurrentHeroesActions.saveHero, this.saveHero);
  },

  throwError: function(err, cb) {
    cb(err);
    this.trigger(err);
  },

  setHeroes: function(hero, cb) {
    var reconstructHero = {};

    cb = cb || function() {};

    // Map each individual hero to its locationNum index in the array
    _.each(hero, function(heroObj/*, id*/) {
      reconstructHero[heroObj.locationNum] = heroObj;
    });

    this.heroes = reconstructHero;

    cb(null, this.heroes);
    this.trigger(null, this.heroes);
  },

  getHeroes: function(cb) {
    cb = cb || function() {};

    HeroAPI.getHero().then(function(hero) {
      this.setHeroes(hero, cb);
    }.bind(this)).catch(function(err) {
      this.throwError(err, cb);
    }.bind(this));
  },

  saveHero: function(singleHero, cb) {
    cb = cb || function() {};

    HeroAPI.saveHero(singleHero).then(function() {
      CurrentHeroesActions.getHeroes(); // Update stored heroes after saving a new one
    }).catch(function(err) {
      this.throwError(err, cb);
    }.bind(this));
  }

});

module.exports = CurrentHeroesStore;
