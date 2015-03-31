'use strict';

var humps        = require('humps');
var camelizeKeys = humps.camelizeKeys;
var request      = require('superagent');
var when         = require('when');

var APIUtils = {

  root: '//api.dev.pundittracker.com/v1/',

  titleCase: function(str) {
    var newString = str;

    // Convert from camelCase
    newString = newString.replace(/([a-z](?=[A-Z]))/g, '$1 ');

    // Convert to Title Case
    newString = str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return newString;
  },

  normalizeResponse: function(response) {
    return camelizeKeys(response.body);
  },

  get: function(path) {
    var deferred = when.defer();

    request.get(this.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  post: function(path, body) {
    var deferred = when.defer();

    request.post(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  patch: function(path, body) {
    var deferred = when.defer();

    request.patch(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  put: function(path, body) {
    var deferred = when.defer();

    request.put(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  del: function(path) {
    var deferred = when.defer();

    request.del(this.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  }

};

module.exports = APIUtils;
