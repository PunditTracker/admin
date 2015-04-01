'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');


var CurrentHeroesActions = require('../actions/CurrentHeroesActions');
var CurrentHeroesStore   = require('../stores/CurrentHeroesStore');
var HeroModalMixin       = require('../mixins/HeroModalMixin');

var Hero = React.createClass({

  mixins: [HeroModalMixin, Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      hero: []
    };
  },

  _onHeroChange: function(err, hero) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ hero: hero || [], error: null });
    }
  },

  _buildImageUrl: function(url) {
    return url ? 'url(' + url + ')' : '';
  },

  _buildLinkUrl: function(url) {
    var urlRegex = new RegExp('http', 'gi');
    var wwwRegex = new RegExp('www\.', 'gi');

    if ( wwwRegex.test(url) ) {
      url = 'http://' + url;
    } else if ( !urlRegex.test(url) ) {
      url = 'http://pundittracker.com' + url;
    }

    return url;
  },

  componentDidMount: function() {
    CurrentHeroesActions.getHeroes(this._onHeroChange);
    this.listenTo(CurrentHeroesStore, this._onHeroChange);
  },

  render: function() {
    var heroOne = this.state.hero[1] || {};
    var heroTwo = this.state.hero[2] || {};
    var heroThree = this.state.hero[3] || {};

    return (
      <div className="hero fixed done nudge--bottom">
        <div className="pure-g card-grid">
          <div className="pure-u-2-3">
            <div className="feature-card location-1 left large">
              <div className="background" style={{ 'backgroundImage': this._buildImageUrl(heroOne.imageUrl) }}>
                <span className="edit"><a onClick={this.toggleHeroModal.bind(this, 1)}>Edit</a></span>
                <div className="scrim"></div>
              </div>
              <div className="inner">
                <h3 className="header">Don't miss out on the madness.</h3>
                <form className="pick">
                  <h2 className="h1 flush">Sign up for updates.</h2>
                  <h4 className="fade-in-up animated">
                    <input className="email" type="text" placeholder="Email address"/>
                    <input type="submit" className="button white-inverse" value="Go"/>
                  </h4>
                </form>
              </div>
            </div>
          </div>
          <div className="pure-u-1-3">
            <div className="pure-g card-grid flush--bottom">
              <div className="pure-u-1">
                <div className="feature-card right location-2">
                  <div className="background" style={{ 'backgroundImage': this._buildImageUrl(heroTwo.imageUrl) }}>
                    <span className='edit'><a onClick={this.toggleHeroModal.bind(this, 2)}>Edit</a></span>
                    <div className="scrim"></div>
                  </div>
                  <div className="inner">
                    <h3 className="header">{heroTwo.title}</h3>
                    <div className="go">
                      <a href={this._buildLinkUrl(heroTwo.buttonUrl)} target="_blank" className="button">{heroTwo.buttonText}</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <div className="feature-card right march-madness-card location-3">
                  <div className="background" style={{ 'backgroundImage': this._buildImageUrl(heroThree.imageUrl) }}>
                    <span className="edit"><a onClick={this.toggleHeroModal.bind(this, 3)}>Edit</a></span>
                    <div className="scrim"></div>
                  </div>
                  <div className="inner">
                    <h3 className="header">{heroThree.title}</h3>
                    <div className="go">
                      <a href={this._buildLinkUrl(heroThree.buttonUrl)} target="_blank" className="button">{heroThree.buttonText}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Hero;
