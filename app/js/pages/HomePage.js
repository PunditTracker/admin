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
      currentUser: {},
      currentCategory: 0
    };
  },


  render: function() {
    console.log("cur user", this.props.currentUser);
    return (
      <section className="home-page">

        <DocumentTitle title="Home" />
        <Link to='SetHeader'>Set Header</Link>

      </section>
    );
  }

});
module.exports = HomePage;
