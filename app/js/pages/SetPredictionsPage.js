'use strict';

var React                      = require('react/addons');
var Reflux                     = require('reflux');
var _                          = require('lodash');
var when                       = require('when');
var DocumentTitle              = require('react-document-title');

var AuthenticatedRouteMixin    = require('../mixins/AuthenticatedRouteMixin');
var PredictionSearchModalMixin = require('../mixins/PredictionSearchModalMixin');
var APIUtils                   = require('../utils/APIUtils');
var PredictionLocationActions  = require('../actions/PredictionLocationActions');
var PredictionLocationStore    = require('../stores/PredictionLocationStore');
var Spinner                    = require('../components/Spinner');

var CategoryPage = React.createClass({

  mixins: [Reflux.ListenerMixin, AuthenticatedRouteMixin, PredictionSearchModalMixin],

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
      updatedLocations: [],
      loading: false,
      saved: false,
      error: null
    };
  },

  _onLocationsChange: function(err, locations) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      locations = locations || [{ locationNum: 0 }];
      // Ensure there's always an empty location to edit
      if ( !_.isEmpty(locations[locations.length-1].prediction) ) {
        locations.push({
          locationNum: locations.length
        });
      }
      this.setState({ locations: locations || [{ locationNum: 0 }], error: null });
    }
  },

  componentDidMount: function() {
    PredictionLocationActions.load(this.state.categoryId, this._onLocationsChange);
    this.listenTo(PredictionLocationStore, this._onLocationsChange);
  },

  setNewCategory: function(id) {
    this.setState({
      categoryId: id,
      locations: [{}],
      updatedLocations: [],
      loading: false,
      saved: false,
      error: null
    }, function() {
      PredictionLocationActions.load(this.state.categoryId, this._onLocationsChange);
    }.bind(this));
  },

  getLocationAtNum: function(locationNum) {
    var location = _.find(this.state.locations, function(location) {
      return location.locationNum === locationNum;
    });

    return location || {};
  },

  removeLocation: function(locationNum) {
    var indexToModify = null;
    var locationsCopy = this.state.locations;
    var updatedLocationsCopy = this.state.updatedLocations;

    _.each(this.state.locations, function(location, index) {
      if ( location.locationNum === locationNum ) {
        indexToModify = index;
      }
    });

    if ( indexToModify !== null ) {
      locationsCopy[indexToModify].prediction = null;
      locationsCopy[indexToModify].predictionId = null;

      updatedLocationsCopy.push(locationsCopy[indexToModify]);
    }

    this.setState({ locations: locationsCopy, updatedLocations: updatedLocationsCopy });
  },

  replaceLocation: function(locationNum, newLocation) {
    var indexToModify = null;
    var locationsCopy = this.state.locations;

    _.each(this.state.locations, function(location, index) {
      if ( location.locationNum === locationNum ) {
        indexToModify = index;
      }
    });

    if ( indexToModify !== null ) {
      locationsCopy[indexToModify] = newLocation;
    }

    this.setState({ locations: locationsCopy });
  },

  setPredictionAtLocation: function(locationNum) {
    var locationsCopy = this.state.locations;
    var updatedLocationsCopy = this.state.updatedLocations;
    var existingLocation;
    var location;

    this.showPredictionSearchModal(function(prediction) {
      existingLocation = this.getLocationAtNum(locationNum);
      location = {
        id: _.isNumber(existingLocation.id) ? existingLocation.id : 0,
        locationNum: locationNum,
        categoryId: this.state.categoryId,
        prediction: prediction,
        predictionId: prediction.id
      };

      updatedLocationsCopy.push(location);

      // Ensure there's always an empty location to edit
      if ( this.state.locations && locationNum === this.state.locations.length - 1 ) {
        locationsCopy.push({
          locationNum: this.state.locations.length
        });
      }

      this.setState({ locations: locationsCopy, updatedLocations: updatedLocationsCopy }, function() {
        console.log('updated locations:', this.state.updatedLocations);
      }.bind(this));

      this.replaceLocation(locationNum, location);
    }.bind(this));
  },

  saveLocations: function(evt) {
    var promises = [];

    if ( evt ) {
      evt.preventDefault();
    }
    _.each(this.state.updatedLocations, function(location) {
      console.log('saving:', location);
      promises.push(APIUtils.post('admin/predictionLoc/set', {
        id: location.id,
        locationNum: location.locationNum,
        categoryId: location.categoryId,
        predictionId: location.predictionId
      }));
    });

    this.setState({ loading: true });

    when.all(promises).then(function() {
      this.setState({ loading: false, saved: true, error: null, updatedLocations: [] });
    }.bind(this)).catch(function(err) {
      this.setState({ loading: false, error: err.message });
      PredictionLocationActions.load(this.state.categoryId, this._onLocationsChange);
    }.bind(this));
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
    var prediction;
    var creatorName;

    return _.map(this.state.locations, function(location, index) {
      prediction = this.getLocationAtNum(index).prediction || {};
      creatorName = '';

      if ( prediction.creatorName ) {
        creatorName = prediction.creatorName + ':';
      } else if ( !_.isEmpty(prediction) ) {
        creatorName = prediction.creator.firstName + ' ' + prediction.creator.lastName + ':';
      }

      console.log('prediction to render:', prediction);

      return (
        <li key={index} className="white nudge-half--bottom">
          <div className="location-number-container">
            <h3 className="flush">{index}</h3>
          </div>
          <div className="prediction-title-container">
            <strong>{creatorName}</strong> <span>{prediction.title}</span>
          </div>
          <div className="button-container">
            <a className="btn" onClick={this.setPredictionAtLocation.bind(this, index)}>
              <i className="fa fa-plus" />
            </a>
          </div>
          <div className="button-container">
            <a className="btn red" onClick={this.removeLocation.bind(this, index)}>
              <i className="fa fa-remove" />
            </a>
          </div>
        </li>
      );
    }.bind(this));
  },

  renderSavedMessageOrButton: function() {
    var element = null;
    var isDisabled;

    if ( this.state.saved && (!this.state.updatedLocations || !this.state.updatedLocations.length) ) {
      element = (
        <strong className="float-right">Prediction locations saved!</strong>
      );
    } else {
      isDisabled = (!this.state.updatedLocations || !this.state.updatedLocations.length) || this.state.loading;
      element = (
        <button type="submit"
                className="btn float-right"
                disabled={isDisabled ? 'true' : ''}>
          <Spinner loading={this.state.loading} />
          Save Predictions in Locations
        </button>
      );
    }

    return element;
  },

  renderError: function() {
    var element = null;

    if ( this.state.error ) {
      element = (
        <div className="text-center nudge-half--bottom error-container">
          {this.state.error}
        </div>
      );
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title="Set Predictions">
      <section className="content no-hero set-predictions-page">

        <div className="container clearfix">
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
            <ul className="location-list nudge-half--bottom">
              <li></li>
              {this.renderLocationInputs()}
            </ul>

            {this.renderError()}

            {this.renderSavedMessageOrButton()}
          </form>

        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = CategoryPage;
