'use strict';

var React                      = require('react/addons');
var _                          = require('lodash');
var DocumentTitle              = require('react-document-title');

var AuthenticatedRouteMixin    = require('../mixins/AuthenticatedRouteMixin');
var PredictionSearchModalMixin = require('../mixins/PredictionSearchModalMixin');
var APIUtils                   = require('../utils/APIUtils');
var Spinner                    = require('../components/Spinner');

var CategoryPage = React.createClass({

  mixins: [AuthenticatedRouteMixin, PredictionSearchModalMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      categories: []
    };
  },

  getInitialState: function() {
    return {
      categoryId: 0,
      locations: [{}],
      loading: false
    };
  },

  setNewCategory: function(id) {
    this.setState({
      categoryId: id,
      locations: [{}]
    });
  },

  getPredictionAtLocation: function(locationNum) {
    var location = _.find(this.state.locations, function(location) {
      return location.locationNum === locationNum;
    });

    return location ? location.prediction : {};
  },

  removeLocation: function(locationNum) {
    var locationsCopy = _.reject(this.state.locations, function(location) {
      return location.locationNum === locationNum;
    });

    this.setState({ locations: locationsCopy });
  },

  setPredictionAtLocation: function(prediction, locationNum) {
    var location = {
      id: null, // TODO: where does this come from
      locationNum: locationNum,
      categoryId: this.state.categoryId,
      prediction: prediction
    };

    console.log('choose prediction:', prediction);
  },

  saveLocations: function(evt) {
    if ( evt ) {
      evt.preventDefault();
    }

    this.setState({ loading: true });
  },

  renderCategoryToggles: function() {
    var elements = null;
    var isDisabled;

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, function(category, index) {
        isDisabled = this.state.categoryId === category.id;

        return (
          <button className="btn float-left nudge-half--right"
                  onClick={this.setNewCategory.bind(null, category.id)}
                  key={index}
                  disabled={isDisabled ? 'true' : ''}>
            {APIUtils.titleCase(category.name)}
          </button>
        );
      }.bind(this));
    }

    return elements;
  },

  renderLocationInputs: function() {
    return _.map(this.state.locations, function(location, index) {
      return (
        <li key={index} className="white">
          <div className="location-number-container">
            <h3 className="flush">{index}</h3>
          </div>
          <div className="prediction-title-container">
            <span>{this.getPredictionAtLocation(index).title}</span>
          </div>
          <div className="choose-prediction-container">
            <button className="btn" onClick={this.showPredictionSearchModal.bind(null, this.setPredictionAtLocation)}>
              <i className="fa fa-asterisk" />
            </button>
          </div>
          <div className="remove-prediction-container">
            <button className="btn red" onClick={this.removeLocation.bind(null, index)}>
              <i className="fa fa-remove" />
            </button>
          </div>
        </li>
      );
    }.bind(this));
  },

  render: function() {
    return (
      <DocumentTitle title="Set Predictions">
      <section className="content no-hero set-predictions-page">

        <div className="container">
          <h3 className="text-center flush--top">Set Predictions by Category</h3>

          <div className="clearfix nudge--bottom">
            <button className="btn float-left nudge-half--right"
                    onClick={this.setNewCategory.bind(null, 0)}
                    disabled={this.state.categoryId === 0 ? 'true' : ''}>
              Home
            </button>
            {this.renderCategoryToggles()}
          </div>

          <form onSubmit={this.saveLocations}>
            <ul className="locations-list nudge-half--bottom">
              <li></li>
              {this.renderLocationInputs()}
            </ul>

            <button type="submit" className="btn">
              <Spinner loading={this.state.loading} />
              Save Predictions in Locations
            </button>
          </form>

        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = CategoryPage;
