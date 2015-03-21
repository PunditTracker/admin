/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Reflux             = require('reflux');
var Link            = React.createFactory(require('react-router').Link);
var _               = require('lodash');
var HeroAPI       = require('../utils/HeroAPI');
var HeroActions = require('../actions/CurrentHeroesActions');
var HeroStore = require('../stores/CurrentHeroesStore');
var HeroModalMixin = require('../mixins/HeroModalMixin');

var Hero = React.createClass({
  mixins: [HeroModalMixin],
  getInitialState: function() {
    return {
      hero: {2: {buttonText: "See Hot NBA Predictions", buttonUrl: "/search?q=nba", categoryId: 0, imageUrl: "http://assets.pundittracker.com/hero_pic/nba.jpg", isLive: true, title: "The association is heating up"}, 3: {buttonText: "Market Predictions", buttonUrl: "/finance", categoryId: 0, imageUrl: "http://assets.pundittracker.com/hero_pic/market_predictions.png", isLive: true, title:""}, 1: {buttonText: "", buttonUrl: "", categoryId: 0, imageUrl: "http://assets.pundittracker.com/hero_pic/basket.png", isLive: true, title: "Don't miss out on the madness."}}
    };
  },
  _getButtonText: function(locationNum)
  {
    return this.state.hero[locationNum].buttonText;
  },
  _onHeroChange: function(err, hero) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ hero: hero || {}, error: null });
    }
  },

  componentDidMount: function() {
    HeroStore.getHeroes(this._onHeroChange);
    //this.listenTo(currentHeroesStore, this._onHeroChange);
  },
  render: function() {
    return (
      <div className="hero fixed done">
        <div className="pure-g card-grid">
          <div className="pure-u-2-3">
            <div className="feature-card location-1 left large">
              <div className="background" style={{backgroundImage:"url(images/oscars.jpg)"}}>
                <span className='edit'><a href='#' data-location-num='1' data-hero-id='1' onClick={this.toggleHeroModal}>Edit</a></span>
                <div className="scrim"></div>
              </div>
              <div className='inner'>
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
                  <div className="background" style={{backgroundImage:"url(images/nba.jpg)"}}>
                    <span className='edit'><a href='#' data-location-num='2' data-hero-id='2' onClick={this.toggleHeroModal}>Edit</a></span>
                    <div className="scrim"></div>
                  </div>
                  <div className="inner">
                    <h3 className="header">The Association is heating</h3>
                    <div className="go">
                      <a href="#" className="button">{this._getButtonText(2)}</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <div className="feature-card right march-madness-card location-3">
                  <div className="background" style={{backgroundImage:"url(images/playoffs.jpg)"}}>
                    <span className='edit'><a href='#' data-location-num='3' data-hero-id='3' onClick={this.toggleHeroModal}>Edit</a></span>
                    <div className="scrim"></div>
                  </div>
                  <div className="inner">
                    <h3 className="header">The Association is heating</h3>
                    <div className="go">
                      <a href="#" className="button">{this._getButtonText(3)}</a>
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
