/**
 * @jsx React.DOM
 */
'use strict';

var React                 = require('react/addons');
var Reflux                = require('reflux');
var _                     = require('lodash');

var LayeredComponentMixin = require('./LayeredComponentMixin');
var Modal                 = require('../components/Modal');
var SearchModalMixin      = require('./SearchModalMixin');

var HeroModalMixin = {
  // NOTE: React.addons.LinkedStateMixin is also required, but is already included in Header.js where this mixin is used
  mixins: [ SearchModalMixin ],

  getInitialState: function() {
    return {
      showHeroModal: false,
      locationNumber: -1,
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  toggleHeroModal: function(location_number) {
    this.setState({
      showHeroModal: !this.state.showHeroModal,
      locationNumber: location_number
    });
  },
  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {

    } else if ( !_.isEmpty(this.props.currentUser) && this.state.showHeroModal) {
      // Hide modal if user is updated while open
      this.setState({ showHeroModal: false });
    }
  },
  renderLayer: function() {
    var element = (<span/>);

    if ( this.state.showHeroModal ) {
      element = (
        <Modal className="hero-modal" onRequestClose={this.toggleHeroModal}>
          <h4> Hero Location {this.state.locationNumber}</h4>
          <div id="hero-form" className="nudge-half--bottom">
            <input id="locationNum" type="hidden" value="-1"/>
            <input id="heroId" type="hidden" value="-1"/>
            <p><label htmlFor="headerText">Header</label><textarea id="headerText" rows="5" className="full-width"></textarea></p>
            <p><label htmlFor="buttonText">Button Text</label><input type="text" id="buttonText" className="full-width"/></p>
            <p><label htmlFor="buttonUrl">Button Url</label><input type="text" id="buttonUrl" className="full-width"/></p>
            <p><label htmlFor="predictionId">Set Prediction</label>
              {this._searchModalHTML()}
            </p>
            <p><label htmlFor="filetime">Background Image</label></p>
            <div className='imageUploadMessage'></div>
            <div className='imageUpload'>
              <form enctype="multipart/form-data">
                <input id="filetime" name="file" type="file" style={{width:"500px"}} />
                <input type="button" id="uploadPicture" value="Upload" />
              </form>
              <br/>
              <div>OR</div>
            </div>
            <p><label htmlFor="imageURL">Background Image URL: </label><input type="text" id="imageURL" className="full-width" /></p>
            <p><input type="submit" value="Done" name="commit" id="uploadHero"/> or <a onClick={this.toggleHeroModal}>Cancel</a></p>

          </div>

        </Modal>
      );
    }

    return element;
  },

};

module.exports = HeroModalMixin;
