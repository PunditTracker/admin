'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var SetHero                 = require('../components/SetHero');

var SetHeroPage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

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

        <h3 className="text-center flush--top">Set Hero Features</h3>

        <SetHero currentUser={this.props.currentUser} currentCategory={this.props.currentCategory} />

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SetHeroPage;
