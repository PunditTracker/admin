'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var Hero                    = require('../components/Hero');

var SetHeroPage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    currentCategory: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      currentCategory: 0
    };
  },

  renderBody: function() {
    var element = null;

    if ( this.props.currentCategory === 0 ) {
      element = (
        <section className="hero">
          <Hero />
        </section>
      );
    } else {
      element = (
        <section className="hero">
          <p>
            Set Hero of page:
            <input type="text" className="fullWidth" value="Hero"/></p>
          <br/>
        </section>
      );
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title="Set Hero">
      <section className="content set-hero-page">

        <h3 className="text-center flush--top">Set Hero Features</h3>

        {this.renderBody()}

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SetHeroPage;
