'use strict';

var React = require('react/addons');
var Link            = require('react-router').Link;
var Reflux                = require('reflux');
var APIUtils        = require('../utils/APIUtils');
var _               = require('lodash');
var Modal                 = require('../components/Modal');
var LayeredComponentMixin = require('../mixins/LayeredComponentMixin');

var Search = React.createClass({
  mixins: [Reflux.ListenerMixin,LayeredComponentMixin],
  getInitialState: function() {
    return {
      showSearchModal: false,
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  toggleSearchModal: function() {
    console.log("yo");
    this.setState({
      showSearchModal: this.state.showSearchModal,
    });
  },
  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {

    } else if ( !_.isEmpty(this.props.currentUser) && this.state.showSearchModal) {
      // Hide modal if user is updated while open
      this.setState({ showSearchModal: false });
    }
  },

  renderLayer: function() {
    var element = (<span/>);

    if ( this.state.showHeroModal ) {
      element = (
        <Modal className="hero-modal" onRequestClose={this.toggleSearchModal}>
          <div id="hero-form" className="nudge-half--bottom">
            <p>
              <label htmlFor="predictionId">Set Prediction</label>
              <input type="text" id='searchPredictions' placeholder="Search here" />
              <img id="loadingPredictions" src="../../images/ajax-loader.gif" alt="loading" width="26px" height="20px"/>
              <select id="predictionId" className="full-width"><option value="">None</option></select>
            </p>
            <p><input type="submit" value="Done" name="commit" id="uploadHero"/> or <a className="close" href="/">Cancel</a></p>
          </div>
        </Modal>
      );
    }
    return element;
  },
  render: function() {
    return (
              <a href='#' onClick={this.toggleSearchModal}>Search</a>
    );
  }
});
module.exports = Search;
