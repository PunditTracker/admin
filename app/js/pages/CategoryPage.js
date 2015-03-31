'use strict';

var React                   = require('react/addons');
var Link                    = require('react-router').Link;
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');

var CategoryPage = React.createClass({
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
      <DocumentTitle title="Category">
      <section className="content no-hero category-page">

        <div>
          Home
        </div>

        <div>
          <Link to="Search">Search</Link>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = CategoryPage;
