'use strict';

var React         = require('react/addons');
var DocumentTitle = require('react-document-title');

var NotFoundPage = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <DocumentTitle title="404: Not Found">
      <section className="content no-hero not-found-page">

        Page Not Found

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = NotFoundPage;