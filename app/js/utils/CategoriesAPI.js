'use strict';

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getCategories: function() {
    return APIUtils.get('category');
  },

  getPredictionLocations: function(categoryId) {
    return APIUtils.get('admin/predictionLoc/' + categoryId);
  }

};

module.exports = HomePageAPI;