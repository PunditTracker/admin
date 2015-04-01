'use strict';

var Reflux = require('reflux');

var CurrentHeroesActions = Reflux.createActions([

  'getHeroes',
  'saveHero'

]);

module.exports = CurrentHeroesActions;
