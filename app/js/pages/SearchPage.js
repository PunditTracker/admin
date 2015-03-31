'use strict';

var React         = require('react/addons');
var Link          = require('react-router').Link;
var SearchBox = require('../components/SearchBox');

var DocumentTitle = require('../components/DocumentTitle');

var SearchPage = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <section className="content no-hero search-page">

        <DocumentTitle title="Search" />

        <div>
          Search
        </div>
        <SearchBox />
        <div>
          <Link to="Home">Back to Home</Link>
        </div>

      </section>
    );
  }

});

module.exports = SearchPage;