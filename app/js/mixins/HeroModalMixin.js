'use strict';

var React                 = require('react/addons');
var when                  = require('when');

var APIUtils              = require('../utils/APIUtils');
var CurrentHeroesActions  = require('../actions/CurrentHeroesActions');
var LayeredComponentMixin = require('./LayeredComponentMixin');
var PredictionSearchModalMixin = require('./PredictionSearchModalMixin');
var Modal                 = require('../components/Modal');
var FileInput             = require('../components/FileInput');
var Spinner               = require('../components/Spinner');

var HeroModalMixin = {

  mixins: [React.addons.LinkedStateMixin, LayeredComponentMixin, PredictionSearchModalMixin],

  getInitialState: function() {
    return {
      showHeroModal: false,
      locationNumber: -1,
      title: '',
      buttonText: '',
      buttonUrl: '',
      imageUrl: '',
      predictionId: '',
      newImage: null,
      loading: false,
      error: null
    };
  },

  toggleHeroModal: function(locationNum) {
    this.setState({
      showHeroModal: !this.state.showHeroModal,
      locationNumber: locationNum
    });
  },

  updateImage: function(file) {
    this.setState({ newImage: file });
  },

  setPrediction: function(prediction) {
    this.setState({ predictionId: prediction.id });
  },

  uploadImage: function() {
    var deferred = when.defer();

    if ( this.state.newImage ) {
      APIUtils.uploadFile('admin/image/add/hero', this.state.newImage).then(function(res) {
        this.setState({ imageUrl: res.link }, deferred.resolve);
      }.bind(this)).catch(function(err) {
        deferred.reject(err);
      }.bind(this));
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  },

  updateHero: function() {
    var deferred = when.defer();
    var hero = {
      id: this.state.hero[this.state.locationNumber].id,
      locationNum: this.state.locationNumber,
      title: this.state.title,
      buttonText: this.state.buttonText,
      buttonUrl: this.state.buttonUrl,
      imageUrl: this.state.imageUrl,
      predictionId: this.state.predictionId ? parseInt(this.state.predictionId) : null,
      isLive: true
    };

    CurrentHeroesActions.saveHero(hero).then(deferred.resolve).catch(deferred.reject);

    return deferred.promise;
  },

  handleSubmit: function(evt) {
    if ( evt ) {
      evt.preventDefault();
    }

    this.setState({ loading: true });

    this.uploadImage().then(this.updateHero).then(function() {
      this.setState({
        loading: false,
        error: null,
        showHeroModal: false,
        locationNumber: -1
      });
    }.bind(this)).catch(function(err) {
      this.setState({ loading: false, error: err.message });
    });
  },

  renderError: function() {
    var element = null;

    if ( this.state.error ) {
      element = (
        <div className="error-container nudge-half--bottom">{this.state.error}</div>
      );
    }

    return element;
  },

  renderLayer: function() {
    var element = (<span/>);

    if ( this.state.showHeroModal ) {
      element = (
        <Modal className="hero-modal" onRequestClose={this.toggleHeroModal}>

          <h4 className="flush--top">Hero Location {this.state.locationNumber}</h4>

          <form id="hero-form" className="nudge-half--bottom" onSubmit={this.handleSubmit}>

            <textarea id="headerText"
                      valueLink={this.linkState('title')}
                      rows="3"
                      className="full-width nudge-half--bottom"
                      placeholder="Hero title text" />

            <input type="text"
                   valueLink={this.linkState('buttonText')}
                   id="buttonText"
                   placeholder="Button Text"
                   className="full-width nudge-half--bottom" />

            <input type="text"
                   valueLink={this.linkState('buttonUrl')}
                   id="buttonUrl"
                   placeholder="Button URL"
                   className="full-width nudge-half--bottom" />

            <button className="btn block full-width nudge-half--bottom"
                    onClick={this.showPredictionSearchModal.bind(null, this.setPrediction)}>
              Search and Select a Prediction (Optional)
            </button>

            <input type="text"
                   valueLink={this.linkState('predictionId')}
                   id="predictionId"
                   placeholder="Associated prediction ID (optional)"
                   className="full-width nudge-half--bottom" />

            <div className="text-left">
              <label htmlFor="image-input">Background Image</label>
            </div>

            <FileInput id="image-input"
                       className="full-width nudge-half--bottom"
                       accept="image/x-png, image/gif, image/jpeg"
                       processFile={this.updateImage} />

            <strong className="line-thru">or</strong>

            <input type="text"
                   valueLink={this.linkState('imageUrl')}
                   id="image-url"
                   placeholder="Direct image URL"
                   className="full-width nudge-half--bottom" />

            {this.renderError()}

            <div>
              <button type="submit"
                      className="btn block full-width"
                      style={{ 'margin': '0 auto' }}
                      name="commit"
                      id="uploadHero">
                <Spinner loading={this.state.loading} />
                Submit
              </button>
              or <a onClick={this.toggleHeroModal}>Cancel</a>
            </div>
          </form>

        </Modal>
      );
    }

    return element;
  },

};

module.exports = HeroModalMixin;
