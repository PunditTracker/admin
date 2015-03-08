/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var Link          = React.createFactory(require('react-router').Link);
var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin'); 

var DocumentTitle = require('../components/DocumentTitle');

var HomePage = React.createClass({
  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <section className="home-page">

        <DocumentTitle title="Home" />

        <div>
          Home
        </div>

        <div>
          <Link to="Search">Search</Link>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);
