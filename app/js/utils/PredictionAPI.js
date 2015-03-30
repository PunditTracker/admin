'use strict';

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  getAll: function() {
    return APIUtils.get('prediction?limit=50');
  },
  getAllWithDates: function(searchString, startDate, endDate){
  	return APIUtils.get('/prediction/search/'+searchString+'?before='+endDate+'&after='+startDate);
  }

};

module.exports = PredictionAPI;
