'use strict';

var React                   = require('react/addons');
var DocumentTitle           = require('react-document-title');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var UserSearch              = require('../components/UserSearch');

var UserSearchPage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <DocumentTitle title="User Search">
      <section className="content no-hero user-search-page">

        <div className="container">
          <h3 className="text-center flush--top">User Search</h3>

          <UserSearch />
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = UserSearchPage;