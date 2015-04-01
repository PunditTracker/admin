'use strict';

var React                 = require('react/addons');

var LayeredComponentMixin = require('./LayeredComponentMixin');
var Modal                 = require('../components/Modal');
var UserSearch            = require('../components/UserSearch');

var UserSearchModalMixin = {

  _selectCallback: function() {},

  mixins: [LayeredComponentMixin],

  getInitialState: function() {
    return {
      showUserSearchModal: false
    };
  },

  showUserSearchModal: function(selectCb) {
    this._selectCallback = selectCb || function() {};
    this.setState({ showUserSearchModal: true });
  },

  hideUserSearchModal: function() {
    this._selectCallback = function() {};
    this.setState({ showUserSearchModal: false });
  },

  handleResultsRowClick: function(row) {
    this._selectCallback(row);
    this.hideUserSearchModal();
  },

  renderLayer: function() {
    var element = (<span/>);

    if ( this.state.showUserSearchModal ) {
      element = (
        <Modal className="user-search-modal" onRequestClose={this.hideUserSearchModal}>

          <h4 className="flush">Search for Users</h4>
          <h6 className="flush--top">Click any row to select that user</h6>

          <UserSearch itemsPerPage={15} handleResultsRowClick={this.handleResultsRowClick} />

        </Modal>
      );
    }

    return element;
  }
};

module.exports = UserSearchModalMixin;