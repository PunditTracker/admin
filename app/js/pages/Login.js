/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var Link          = React.createFactory(require('react-router').Link);

var DocumentTitle = require('../components/DocumentTitle');

var Login = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <section className="login-page">

        <DocumentTitle title="Login" />

        <form style={{paddingTop: "100px", textAlign: "center"}} id="loginform" onSubmit={this.handleSubmit}>
          <div className="error"></div>
          <div className="form-group">
            <input type="text" placeholder="Email" className="form-control" id="user"/>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" className="form-control" id="pass"/>
          </div>
          <button type="submit" className="btn btn-success">Sign in</button>
        </form>
      </section>
    );
  }

});

module.exports = React.createFactory(Login);
