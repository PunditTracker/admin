'use strict';

var React         = require('react/addons');
var Link          = require('react-router').Link;
var SetHeader     = require('../components/SetHeader');

var DocumentTitle = require('../components/DocumentTitle');

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
      <section className="set-header">

        <DocumentTitle title="Set Header" />
        <SetHeader currentUser={this.props.currentUser} currentCategory={this.props.currentCategory} />

      </section>
    );
  }

});

module.exports = SetHeaderPage;
