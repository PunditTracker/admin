'use strict';

var Reflux                    = require('reflux');

var PredictionLocationActions = require('../actions/PredictionLocationActions');
var CategoriesAPI             = require('../utils/CategoriesAPI');

var PredictionLocationStore = Reflux.createStore({

  init: function() {
    this.locations = null;

    this.listenTo(PredictionLocationActions.load, this.loadLocations);
  },

  loadLocations: function(categoryId, cb) {
    cb = cb || function() {};

    console.log('get locations for category ID:', categoryId);

    CategoriesAPI.getPredictionLocations(categoryId).then(function(locations) {
      console.log('successfully got locations');
      this.locations = locations;
      cb(null, this.locations);
      this.trigger(null, this.locations);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = PredictionLocationStore;