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
  componentDidMount: function()
  {
    this.props.setCategory(0);
  },

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
module.exports = HomePage;
