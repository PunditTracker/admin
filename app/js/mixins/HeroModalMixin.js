/**
 *  * @jsx React.DOM
 *   */
/* global FB */
'use strict';

var React                 = require('react/addons');
var Reflux                = require('reflux');
var _                     = require('lodash');

var UserActions           = require('../actions/UserActions');
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
      this.checkForm();
    } else if ( !_.isEmpty(this.props.currentUser) && this.state.showHeroModal) {
      // Hide modal if user is updated while open
      this.setState({ showHeroModal: false });
    }
  },

  renderLayer: function() {
    var element = (<span/>);

    if ( this.state.showHeroModal ) {
      element = (
        <Modal className="login-modal" onRequestClose={this.toggleHeroModal}>

          <form id="login-form" className="nudge-half--bottom" onSubmit={this.handleSubmit}>
          </form>

          <div className="nudge-half--bottom">
            <a href="/forgot">Forgot your password?</a>
          </div>

          <div>
            Don't have an account? <a href="/register">Sign up</a>
            </div>

          </Modal>
      );
    }

    return element;
  },

};

module.exports = HeroModalMixin;
