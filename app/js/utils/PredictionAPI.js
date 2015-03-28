'use strict';

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  getAll: function() {
    return APIUtils.get('prediction');
  },

};

module.exports = PredictionAPI;
