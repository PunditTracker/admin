'use strict';

var React         = require('react/addons');
var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');

var DocumentTitle = require('../components/DocumentTitle');
var ListLink = require('../components/ListLink');

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
      <section className="content no-hero home-page">

        <DocumentTitle title="Home" />

        <div className="card-grid">
          <ul>
            <ListLink to="SetHeader">Set Header</ListLink>
            <ListLink to="Search">Search</ListLink>
            <ListLink to="AdvSearch">Advanced Search</ListLink>
          </ul>
        </div>

      </section>
    );
  }

});
module.exports = HomePage;
