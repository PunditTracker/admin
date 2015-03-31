'use strict';

var React         = require('react/addons');
var Link          = require('react-router').Link;
var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');

var DocumentTitle = require('../components/DocumentTitle');

var Finance= React.createClass({
  mixins: [AuthenticatedRouteMixin],
  componentDidMount: function()
  {
    console.log("SetCat");
    this.props.setCategory(1);
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
      <section className="finance-page">

        <DocumentTitle title="Finance" />

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
module.exports = Finance;
