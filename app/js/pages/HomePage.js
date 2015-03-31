'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var ListLink                = require('../components/ListLink');

var HomePage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  componentDidMount: function()
  {
    this.props.setCategory(0);
  },

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      currentCategory: 0
    };
  },


  render: function() {
    return (
      <DocumentTitle title="Home">
      <section className="content no-hero home-page">

        <div className="container">
          <ul>
            <ListLink to="SetHeader">Set Header</ListLink>
            <ListLink to="Search">Search</ListLink>
            <ListLink to="AnyUserPredict">Submit Predictions as Any User</ListLink>
            <ListLink to="SubmitSpecialEventResults">Bulk Submit Special Event Results</ListLink>
            <ListLink to="AdvSearch">Advanced Search</ListLink>
          </ul>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = HomePage;
