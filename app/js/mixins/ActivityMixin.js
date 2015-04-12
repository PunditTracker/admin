'use strict';

var _         = require('lodash');
var $         = require('jquery');
var React     = require('react/addons');

var Timer = {
};
var ActivityMixin = function(settings, inactive) {
  var mixin = {

    settings: $.extend({
      interval: 10000
    }, settings),

    completionCallback: inactive || function() {},

    getInitialState: function()
    {
      return {
        active: true,
        cleared: false,
        interval: this.settings.interval,
        timerSetAt: 0,
        timerEndedAt: 0,
        totalTime:0
      };
    },

    startTimer: function(fn, interval) {
      // define a new function that includes the addTime function

      this.state.timerSetAt = new Date().getTime();
      this.state.timeFunc = setTimeout(fn, interval);
    },

    addTime: function() {
      this.state.totalTime += this.state.interval;
    },

    // function to clear the setTimeout
    clear: function() {
      this.state.cleared = true;
      clearTimeout(this.state.timeFunc);
    },

    // function to reset the timeout when an event happens
    reset: function() {
      // clear to start over
      this.clear();
      // start new timer
      this.state.TimerEndedAt = new Date().getTime();
      this.startTimer(this.completionCallback, this.state.interval);
    },

    // this function should return time from start of timer to end of timer (not necessarily active time)
    getTime: function() {
      return this.state.timerEndedAt - this.state.timerSetAt;
    },

    timerIsUp:function()
    {
      this.addTime();
      this.completionCallback();
    },
    triggerActivity: function()
    {
      this.reset();
    },
    componentDidMount: function()
    {
      this.startTimer(this.timerIsUp, this.settings.interval);
    },
    componentDidUpdate: function()
    {
    },
  };
  return mixin;
};

module.exports = ActivityMixin;
