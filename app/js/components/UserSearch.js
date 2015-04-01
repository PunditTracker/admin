'use strict';

var React                   = require('react/addons');
var _                       = require('lodash');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var UserAPI                 = require('../utils/UserAPI');
var Spinner                 = require('../components/Spinner');
var SearchTable             = require('../components/SearchTable');

var UserSearch = React.createClass({

  mixins: [React.addons.LinkedStateMixin, AuthenticatedRouteMixin],

  propTypes: {
    itemsPerPage: React.PropTypes.number,
    showNoResultsMessage: React.PropTypes.bool,
    handleResultsRowClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      itemsPerPage: 10,
      showNoResultsMessage: true,
      handleResultsRowClick: function(user) {
        var profileUrl = 'http://pundittracker.com/user/' + user.id;
        var win = window.open(profileUrl, '_blank');
        win.focus();
      }
    };
  },

  getInitialState: function() {
    return {
      results: [],
      error: null,
      loading: false
    };
  },

  handleSubmit: function(evt) {
    if ( evt ) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this.setState({ loading: true });

    UserAPI.search(this.state.query).then(function(results){
      this.setState({ loading: false, results: results });
    }.bind(this));
  },

  renderResults: function() {
    var element = null;

    if ( !this.state.loading && !_.isEmpty(this.state.results) ) {
      element = (
        <div>
          <SearchTable data={this.state.results}
                       cols={['id', 'firstName', 'lastName', 'affiliation', 'created']}
                       itemsPerPage={this.props.itemsPerPage}
                       handleResultsRowClick={this.props.handleResultsRowClick}
                       showNoResultsMessage={this.props.showNoResultsMessage} />
        </div>
      );
    } else if ( !this.state.loading && this.props.showNoResultsMessage ) {
      element = (
        <h4 className="text-center">No results.</h4>
      );
    }

    return element;
  },

  render: function() {
    var formStyles = {
      'maxWidth': '600px',
      'margin': '0 auto'
    };

    return (
      <div>
        <form style={formStyles} onSubmit={this.handleSubmit}>
          <input type="text"
                 placeholder="Search for users..."
                 valueLink={this.linkState('query')}
                 className="block full-width nudge-half--bottom" />
          <button className="btn block full-width"
                  type="submit"
                  disabled={!this.state.query || this.state.loading ? 'true' : ''}>
            <Spinner loading={this.state.loading} />
            Search
          </button>
        </form>

        {this.renderResults()}
      </div>
    );
  }

});

module.exports = UserSearch;