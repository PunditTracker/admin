'use strict';

var React                   = require('react/addons');
var _                       = require('lodash');
var Link                    = require('react-router').Link;
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');

var CategoryPage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      categories: []
    };
  },

  getInitialState: function() {
    return {
      pageId: 0
    };
  },

  componentDidMount: function() {
    console.log("SetCat");
    this.props.setCategory(1);
  },

  renderCategoryLinks: function() {
    var elements = null;

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, function(category, index) {
        return (
          <ListLink to="Category" params={{ category: category.name.toLowerCase() }} key={index}>
            {APIUtils.titleCase(category.name)}
          </ListLink>
        );
      });
    }

    return elements;
  },


  render: function() {
    return (
      <DocumentTitle title="Set Predictions">
      <section className="content no-hero set-predictions-page">

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = CategoryPage;
