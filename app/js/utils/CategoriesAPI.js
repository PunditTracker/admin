'use strict';

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getCategories: function() {
    return APIUtils.get('category');
  }

};

module.exports = HomePageAPI;