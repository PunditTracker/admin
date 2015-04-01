'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');
var _                       = require('lodash');
var Link                    = require('react-router').Link;

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');

var HomePage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  renderPageLinks: function() {
    var pages = [
      {
        title: 'Set Hero',
        routerPageName: 'SetHero'
      },
      {
        title: 'Prediction Search',
        routerPageName: 'PredictionSearch'
      },
      {
        title: 'User Search',
        routerPageName: 'UserSearch'
      },
      {
        title: 'Set Predictions',
        routerPageName: 'SetPredictions'
      },
      {
        title: 'Submit Predictions as Any User',
        routerPageName: 'AnyUserPredict'
      },
      {
        title: 'Bulk Submit Special Event Results',
        routerPageName: 'SubmitSpecialEventResults'
      }
    ];

    return _.map(pages, function(page, index) {
      return (
        <li key={index}>
          <i className={'fa nudge-half--bottom ' + page.iconClass} />
          <h3 className="title">{page.title}</h3>
          <Link to={page.routerPageName} />
        </li>
      );
    });
  },

  render: function() {
    return (
      <DocumentTitle title="Home">
      <section className="content no-hero home-page">

        <div className="container">
          <ul className="page-list clearfix">
            {this.renderPageLinks()}
          </ul>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});
module.exports = HomePage;
