'use strict';

var React = require('react/addons');
var _     = require('lodash');
var Hero  = require('./Hero');

var SetHero = React.createClass({

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  _renderHtml: function() {
    if ( parseInt(this.props.currentCategory) >= 0 ) {
      if ( this.props.currentCategory === 0 ) {
        // Home page do a different headers since we have Hero's.
        return (
          <section className="hero">
            <Hero />
          </section>
        );
      } else {
          return (
            <section className="hero">
              <p>
                Set Hero of page:
                <input type="text" className="fullWidth" value="Hero"/></p>
              <br/>
            </section>
          );
    }
  } else {
      console.log('Current Category is empty?');
    }
    return (<div> hello</div>);
  },

  render: function() {
    var element = null;

    if ( !_.isEmpty(this.props.currentUser) ) {
      element = this._renderHtml();
    }

    return element;
  }

});

module.exports = SetHero;
