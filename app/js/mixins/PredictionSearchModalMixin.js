'use strict';

var React                 = require('react/addons');

var Modal                 = require('../components/Modal');
var PredictionSearch      = require('../components/PredictionSearch');

var PredictionSearchModalMixin = {

  _selectCallback: function() {},

  getInitialState: function() {
    return {
      showPredictionSearchModal: false
    };
  },

  componentWillUnmount: function() {
    this._unrenderPredictionSearchLayer();
    document.body.removeChild(this._predictionSearchTarget);
  },

  componentDidUpdate: function() {
    this._renderPredictionSearchLayer();
  },

  componentDidMount: function() {
    // Appending to the body is easier than managing the z-index of everything on the page.
    // It's also better for accessibility and makes stacking a snap (since components will stack
    // in mount order).
    this._predictionSearchTarget = document.createElement('div');
    document.body.appendChild(this._predictionSearchTarget);
    this._renderPredictionSearchLayer();
  },

  _renderPredictionSearchLayer: function() {
    // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
    // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
    // entirely different part of the page.
    React.render(this.renderPredictionSearchLayer(), this._predictionSearchTarget);
  },

  _unrenderPredictionSearchLayer: function() {
    React.unmountComponentAtNode(this._predictionSearchTarget);
  },

  showPredictionSearchModal: function(selectCb) {
    this._selectCallback = selectCb || function() {};
    this.setState({ showPredictionSearchModal: true });
  },

  hidePredictionSearchModal: function() {
    this._selectCallback = function() {};
    this.setState({ showPredictionSearchModal: false });
  },

  handleResultsRowClick: function(row) {
    this._selectCallback(row);
    this.hidePredictionSearchModal();
  },

  renderPredictionSearchLayer: function() {
    var element = (<span/>);

    if ( this.state.showPredictionSearchModal ) {
      element = (
        <Modal className="prediction-search-modal" onRequestClose={this.hidePredictionSearchModal}>

          <h4 className="flush">Search for Predictions</h4>
          <h6 className="flush--top">Click any row to select that prediction</h6>

          <PredictionSearch itemsPerPage={15} handleResultsRowClick={this.handleResultsRowClick} />

        </Modal>
      );
    }

    return element;
  }

};

module.exports = PredictionSearchModalMixin;