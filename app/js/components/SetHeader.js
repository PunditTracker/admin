/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Link            = React.createFactory(require('react-router').Link);
var _               = require('lodash');
var Hero            = require('./Hero');

var SetHeader = React.createClass({
  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },
  _renderHtml: function() {
    if (parseInt(this.props.currentCategory) >= 0) {
      if (this.props.currentCategory == 0) {
        // Home page do a different headers since we have Hero's.
        return (
          <section className="hero">
            <Hero />
          </section>
        );
      }
      else
        {
          return (
            <section className="hero">
              <p>
                Set Header of page:
                <input type="text" className="fullWidth" value="Header"/></p>
              <br/>
            </section>
          );
        }
    }
    else {
      console.log("Current Category is empty?");
    }
    return (<div> hello</div>);
  },
  render: function() {
    return (!_.isEmpty(this.props.currentUser) ? this._renderHtml() : (<div></div>));
  }


});
module.exports = SetHeader
