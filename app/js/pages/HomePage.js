'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var ListLink                = require('../components/ListLink');

var HomePage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },


  render: function() {
    return (
      <DocumentTitle title="Home">
      <section className="content no-hero home-page">

        <div className="container">
          <ul>
            <ListLink to="SetHero">Set Hero</ListLink>
            <ListLink to="PredictionSearch">Prediction Search</ListLink>
            <ListLink to="SetPredictions">Set Predictions</ListLink>
            <ListLink to="AnyUserPredict">Submit Predictions as Any User</ListLink>
            <ListLink to="SubmitSpecialEventResults">Bulk Submit Special Event Results</ListLink>
          </ul>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = HomePage;
