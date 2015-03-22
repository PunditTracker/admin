/**
 * @jsx React.DOM
 */
'use strict';

var React                 = require('react/addons');
var Reflux                = require('reflux');
var _                     = require('lodash');

var LayeredComponentMixin = require('./LayeredComponentMixin');
var Modal                 = require('../components/Modal');

var HeroModalMixin = {
  // NOTE: React.addons.LinkedStateMixin is also required, but is already included in Header.js where this mixin is used
  mixins: [Reflux.ListenerMixin, LayeredComponentMixin],
  getInitialState: function() {
    return {
      showSearchModal: false,
    };
  },
  handleSearchSubmit: function(e) {
    e.preventDefault();
  },
  toggleSearchModal: function() {
    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });
  },
  _searchModalHTML: function() {
    if (this.state.showSearchModal) {
      return (
              <Modal className="search-modal" onRequestClose={this.toggleSearchModal}>
                <div id="hero-form" className="nudge-half--bottom">
                  <p>
                    <label htmlFor="predictionId">Set Prediction</label>
                    <input type="text" id='searchPredictions' placeholder="Search here" />
                    <img id="loadingPredictions" src="../../images/ajax-loader.gif" alt="loading" width="26px" height="20px"/>
                  </p>
                  <div class='prediction-list'>
                    <ul>
                      <li>test</li>
                      <li>test</li>
                      <li>test</li>
                      <li>test</li>
                      <li>test</li>
                    </ul>
                  </div>
                  <p><input type="submit" value="Done" name="commit" id="uploadHero"/> or <a onClick={this.toggleSearchModal}>Cancel</a></p>
                </div>
              </Modal>
             );
    }
    else
      {
        return (<a href='#' onClick={this.toggleSearchModal}>Search</a>);
      }
  },
};

module.exports = HeroModalMixin;
