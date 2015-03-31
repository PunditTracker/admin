'use strict';

var React         = require('react/addons');
var Link          = require('react-router').Link;
var DocumentTitle = require('react-document-title');

var SetHeader     = require('../components/SetHeader');

var SetHeaderPage = React.createClass({

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
      <DocumentTitle title="Set Header">
      <section className="content set-header">

        <SetHeader currentUser={this.props.currentUser} currentCategory={this.props.currentCategory} />

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SetHeaderPage;
