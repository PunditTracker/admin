'use strict';

var when     = require('when');
var request  = require('superagent');
var APIUtils = require('./APIUtils');

var HeroAPI = {

  getHero: function() {
    return APIUtils.get('hero');
  }
};

module.exports = HeroAPI;
