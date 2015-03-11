/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var _             = require('lodash');
var Navigation       = require('react-router').Navigation;

var Link          = React.createFactory(require('react-router').Link);
var DocumentTitle = require('../components/DocumentTitle');
var currentUserActions = require('../actions/CurrentUserActions');
var CurrentUserStore = require('../stores/CurrentUserStore');

var Login = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Navigation],
  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      email: '',
      password:'',
    }
  },
  _redirectTo: function()
  {
    if (!_.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked )
      this.replaceWith('Home');
  },
  componentDidUpdate: function()
  {
    this._redirectTo();
  },
  componentDidMount: function()
  {
    this._redirectTo();
  },
  handleSubmit: function(e)
  {
    if (e)
      {
        e.preventDefault();
      }
      if (_.isEmpty(this.state.email) || _.isEmpty(this.state.password)) {
        this._onUserChange({message: "Username or Password can't be empty"});
      }
      else
        {
          var user = {
            email: this.state.email,
            password: this.state.password,
          };
          currentUserActions.login(user, this._onUserChange);
        }
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
      this._redirectTo();
    }
  },
  render: function() {
    return (
      <section className="login-page">

        <DocumentTitle title="Login" />

        <form style={{paddingTop: "100px", textAlign: "center"}} id="loginform" onSubmit={this.handleSubmit}>
          <div className="error">{this.renderError()}</div>
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
