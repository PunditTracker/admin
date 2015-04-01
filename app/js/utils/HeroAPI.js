'use strict';

var APIUtils = require('./APIUtils');

var HeroAPI = {

  getHero: function() {
    return APIUtils.get('hero');
  },

  saveHero: function(hero) {
    return APIUtils.post('admin/hero/set', hero);
  }

};

module.exports = HeroAPI;
