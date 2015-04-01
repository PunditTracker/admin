'use strict';

var APIUtils = require('./APIUtils');

var UserAPI = {

  search: function(query) {
    return APIUtils.get('user/search/' + query);
  }

};

module.exports = UserAPI;
