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
      show: false,
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  toggleHeroModal: function() {
    this.setState({
      showHeroModal: !this.state.showHeroModal
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

          <div id="hero-form" className="nudge-half--bottom">
            <input id="locationNum" type="hidden" value="-1"/>
            <input id="heroId" type="hidden" value="-1"/>
            <p><label for="headerText">Header</label><textarea id="headerText" rows="5" className="full-width"></textarea></p>
            <p><label for="buttonText">Button Text</label><input type="text" id="buttonText" className="full-width"/></p>
            <p><label for="buttonUrl">Button Url</label><input type="text" id="buttonUrl" className="full-width"/></p>
            <p><label for="predictionId">Prediction</label>
              <input type="text" id='searchPredictions' placeholder="Search here" />
              <img id="loadingPredictions" src="../../images/ajax-loader.gif" alt="loading" width="26px" height="20px"/>
              <select id="predictionId" className="full-width"><option value="">None</option></select></p>
            <p><label for="filetime">Background Image</label></p>
            <div className='imageUploadMessage'></div>
            <div className='imageUpload'>
              <form enctype="multipart/form-data">
                <input id="filetime" name="file" type="file" style={{width:"500px"}} />
                <input type="button" id="uploadPicture" value="Upload" />
              </form>
              <br/>
              <div>OR</div>
            </div>
            <p><label for="imageURL">Background Image URL: </label><input type="text" id="imageURL" className="full-width" /></p>
            <p><input type="submit" value="Done" name="commit" id="uploadHero"/> or <a className="close" href="/">Cancel</a></p>

          </div>

        </Modal>
      );
    }

    return element;
  },

};

module.exports = HeroModalMixin;
