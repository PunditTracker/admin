'use strict';

var React                   = require('react/addons');
var _                       = require('lodash');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var UserAPI                 = require('../utils/UserAPI');
var Spinner                 = require('../components/Spinner');

var UserSearchPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
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
      evt.preventDefault();
    }

    this.setState({ loading: true });

    UserAPI.search(this.state.query).then(function(results){
      this.setState({ loading: false, results: results });
    }.bind(this));
  },

  renderResults: function() {
    var profileUrl;

    return _.map(this.state.results, function(result) {
      profileUrl = 'https://pundittracker.com/user/' + result.id;

      return (
        <li>
          <a href={profileUrl} target="_blank">{result.firstName} {result.lastName}, <strong>id:</strong> {result.id}</a>
        </li>
      );
    });
  },

  render: function() {
    var formStyles = {
      'maxWidth': '600px',
      'margin': '0 auto'
    };

    return (
      <DocumentTitle title="User Search">
      <section className="content no-hero user-search-page">

        <div className="container">
          <h3 className="text-center flush--top">User Search</h3>

          <form style={formStyles} onSubmit={this.handleSubmit}>
            <input type="text"
                   placeholder="Enter your query here..."
                   valueLink={this.linkState('query')}
                   className="block full-width nudge-half--bottom" />
            <button className="btn block full-width"
                    type="submit"
                    disabled={this.state.loading ? 'true' : ''}>
              <Spinner loading={this.state.loading} />
              Search
            </button>
          </form>

          <ul>
            {this.renderResults()}
          </ul>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = UserSearchPage;