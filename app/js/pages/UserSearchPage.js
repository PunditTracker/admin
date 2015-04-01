'use strict';

var React         = require('react/addons');
var DocumentTitle = require('react-document-title');

var UserSearchPage = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <DocumentTitle title="User Search">
      <section className="content no-hero user-search-page">

        Search For Users

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = UserSearchPage;