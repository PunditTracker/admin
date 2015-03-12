/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Link            = React.createFactory(require('react-router').Link);
var _               = require('lodash');

var Hero = React.createClass({
  render: function() {
    return (
      <div className="hero fixed done">
        <div className="pure-g card-grid">
          <div className="pure-u-2-3">
            <div className="feature-card location-1 left large">
              <div className="background" style={{backgroundImage:"url(images/oscars.jpg)"}}>
                <span className='edit'><a href='#' data-location-num='1' data-hero-id='1'>Edit</a></span>
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
                    <span className='edit'><a href='#' data-location-num='2' data-hero-id='2'>Edit</a></span>
                    <div className="scrim"></div>
                  </div>
                  <div className="inner">
                    <h3 className="header">The Association is heating</h3>
                    <div className="go">
                      <a href="#" className="button">See Hot NBA Predictions</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <div className="feature-card right march-madness-card location-3">
                  <div className="background" style={{backgroundImage:"url(images/playoffs.jpg)"}}>
                    <span className='edit'><a href='#' data-location-num='3' data-hero-id='3'>Edit</a></span>
                    <div className="scrim"></div>
                  </div>
                  <div className="inner">
                    <h3 className="header">The Association is heating</h3>
                    <div className="go">
                      <a href="#" className="button">See Hot NBA Predictions</a>
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
