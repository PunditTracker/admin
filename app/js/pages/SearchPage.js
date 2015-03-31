'use strict';

var React         = require('react/addons');
var Link          = require('react-router').Link;
var DocumentTitle = require('react-document-title');

var SearchBox     = require('../components/SearchBox');

var SearchPage = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <DocumentTitle title="Search">
      <section className="content no-hero search-page">

        <div>
          Search
        </div>
        <SearchBox />
        <div>
          <Link to="Home">Back to Home</Link>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SearchPage;