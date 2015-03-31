'use strict';

var React              = require('react/addons');
var _                  = require('lodash');
var Navigation         = require('react-router').Navigation;

var DocumentTitle      = require('../components/DocumentTitle');
var currentUserActions = require('../actions/CurrentUserActions');
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
      loggingIn: false,
      submitDisabled: true
    };
  },
  _redirectIfUser: function()
  {
    if ( !_.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked ) {
      this.replaceWith('Home');
    }
  },
  _checkForm: function()
  {
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
  componentDidUpdate: function(prevProps, prevState)
  {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {
      this._checkForm();
    }
    this._redirectIfUser();
  },
  componentDidMount: function()
  {
    this._redirectIfUser();
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
          this.setState({ loggingIn: true });
          currentUserActions.login(user, this._onUserChange);
        }
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
      <section className="login-page">
        <DocumentTitle title="Login" />
        <form style={formStyles} className="text-center" id="loginform" onSubmit={this.handleSubmit}>

          <img src="../images/logo_black.png" alt="PunditTracker logo" style={{ 'maxWidth': '55%' }} />

          <h4>Admin Console</h4>

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
    );
  }

});

module.exports = Login;
