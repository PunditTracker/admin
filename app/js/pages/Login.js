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

    getInitialState: function() {
      return {
        email: '',
        password:'',
      }
    },
  handleSubmit: function(e)
  {
    if (e)
      {
        e.preventDefault();
      }
      var user = {
        email: this.state.email,
        password: this.state.password,
      };
      currentUserActions.login(user, this._onUserChange);
  },
  renderError: function() {
    if (this.state.error)
      {
        return (<div>{this.state.error}</div>);
      }
      return null;
  },
  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ loading: false, error: err.message });
    } else if ( !_.isEmpty(user) ) {
      this.doRedirect();
    }
  },
  render: function() {
    return (
      <section className="login-page">

        <DocumentTitle title="Login" />

        <form style={{paddingTop: "100px", textAlign: "center"}} id="loginform" onSubmit={this.handleSubmit}>
          <div className="error">{this.renderError}</div>
          <div className="form-group">
            <input type="text" placeholder="Email" valueLink={this.linkState('email')} className="form-control" id="email"/>
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" valueLink={this.linkState('password')} className="form-control" id="password"/>
          </div>
          <button type="submit" className="btn btn-success">Sign in</button>
        </form>
      </section>
    );
  }

});

module.exports = React.createFactory(Login);
