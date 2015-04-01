 /* global FB */
'use strict';

var React              = require('react/addons');
var _                  = require('lodash');
var Navigation         = require('react-router').Navigation;
var DocumentTitle      = require('react-document-title');

var CurrentUserActions = require('../actions/CurrentUserActions');
var CurrentUserStore   = require('../stores/CurrentUserStore');
var Spinner            = require('../components/Spinner');

var Login = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: '',
      password:'',
      facebookId: null,
      loggingIn: false,
      isFacebookLogin: false,
      submitDisabled: true
    };
  },

  _redirectIfUser: function() {
    if ( !_.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked && this.isMounted() ) {
      this.replaceWith('Home');
    }
  },

  _checkForm: function() {
    var formIsValid = this.state.email.length && this.state.password.length;

    this.setState({ submitDisabled: !formIsValid });
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ loggingIn: false, error: err.message });
    } else if ( !_.isEmpty(user) ) {
      this._redirectIfUser();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {
      this._checkForm();
    }
    this._redirectIfUser();
  },

  componentDidMount: function() {
    this._redirectIfUser();
  },

  checkFbState: function() {
    FB.getLoginStatus(function(response) {
      if ( response.status === 'connected' ) {
        console.log('logged in via Facebook!!');
        this.getUserInfoFb();
      } else if ( response.status === 'not_authorized' ) {
        this.setState({ error: 'You must authorize PunditTracker via Facebook to log in using that method.' });
      } else {
        this.setState({ error: 'You must be logged in to Facebook to log in using that method.' });
      }
    }.bind(this));
  },

  getUserInfoFb: function() {
    FB.api('/me', { fields: 'id' }, function(response) {
      this.setState({ facebookId: response.id }, this.handleSubmit);
    }.bind(this));
  },

  fbLogin: function() {
    this.setState({ isFacebookLogin: true });
    FB.login(this.checkFbState, { scope: 'public_profile,email' });
  },

  handleSubmit: function(evt) {
    var user = {
      email: this.state.email,
      password: this.state.password,
      facebookId: this.state.facebookId
    };
    var loginFunction = this.state.isFacebookLogin ? CurrentUserActions.facebookLogin : CurrentUserActions.login;

    if ( evt ) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this.setState({ loggingIn: true });

    loginFunction(user, this._onUserChange);
  },

  renderError: function() {
    var element = null;

    if (this.state.error)
      {
        element = (<div className="error nudge-half--bottom">{this.state.error}</div>);
      }
    return element;
  },

  render: function() {
    var formStyles = {
      'paddingTop': '100px',
      'maxWidth': '600px',
      'margin': '0 auto'
    };

    return (
      <DocumentTitle title="Login">
      <section className="login-page">
        <form style={formStyles} className="text-center" id="loginform" onSubmit={this.handleSubmit}>

          <img src="../images/logo_black.png" alt="PunditTracker logo" style={{ 'maxWidth': '55%' }} />

          <h4>Admin Console</h4>

          <div className="fb-login-container">
            <a className="btn fb full-width" onClick={this.fbLogin}><i className="fa fa-facebook" /> Login with Facebook</a>
            <strong className="line-thru">or</strong>
          </div>

          <input type="text"
                 placeholder="Email"
                 valueLink={this.linkState('email')}
                 className="full-width nudge-half--bottom"
                 id="email" />

          <input type="password"
                 placeholder="Password"
                 valueLink={this.linkState('password')}
                 className="full-width nudge-half--bottom"
                 id="password" />

          {this.renderError()}

          <button type="submit"
                  className="btn block full-width"
                  disabled={this.state.loggingIn || this.state.submitDisabled ? 'true' : ''}>
            <Spinner loading={this.state.loggingIn} />
            Login
          </button>

        </form>
      </section>
      </DocumentTitle>
    );
  }

});

module.exports = Login;
