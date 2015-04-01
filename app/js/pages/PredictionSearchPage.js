'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var PredictionSearch        = require('../components/PredictionSearch');

var PredictionSearchPage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <DocumentTitle title="Prediction Search">
      <section className="content no-hero prediction-search-page">

        <div className="container">
          <h3 className="text-center flush">Advanced Prediction Search</h3>

          <PredictionSearch />
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = PredictionSearchPage;