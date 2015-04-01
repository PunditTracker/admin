'use strict';

var React                   = require('react/addons');
var _                       = require('lodash');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var APIUtils                = require('../utils/APIUtils');

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
      categoryId: 0
    };
  },

  setNewCategory: function(id) {
    this.setState({ categoryId: id });
  },

  choosePredictionFromResults: function(prediction) {
    console.log('choose prediction:', prediction);
  },

  renderCategoryToggles: function() {
    var elements = null;
    var isDisabled;

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, function(category, index) {
        isDisabled = this.state.categoryId === category.id;

        return (
          <button className="btn float-left nudge-half--right"
                  onClick={this.setNewCategory.bind(null, category.id)}
                  key={index}
                  disabled={isDisabled ? 'true' : ''}>
            {APIUtils.titleCase(category.name)}
          </button>
        );
      }.bind(this));
    }

    return elements;
  },

  render: function() {
    return (
      <DocumentTitle title="Set Predictions">
      <section className="content no-hero set-predictions-page">

        <div className="container">
          <h3 className="text-center flush--top">Set Predictions by Category</h3>

          <div className="clearfix nudge--bottom">
            <button className="btn float-left nudge-half--right"
                    onClick={this.setNewCategory.bind(null, 0)}
                    disabled={this.state.categoryId === 0 ? 'true' : ''}>
              Home
            </button>
            {this.renderCategoryToggles()}
          </div>

        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = CategoryPage;
