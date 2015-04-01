'use strict';

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  getAll: function() {
    return APIUtils.get('prediction?limit=50');
  },

  search: function(query){
    return APIUtils.get('/prediction/search/' + query);
  },

  searchWithDates: function(query, startDate, endDate){
  	return APIUtils.get('/prediction/search/'+query+'?before='+endDate.format()+'&after='+startDate.format());
  },

  searchWithUserName: function(username){
  	return APIUtils.get('/user/prediction/search/'+username);
  }

};

module.exports = PredictionAPI;
