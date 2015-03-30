/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var Link          = React.createFactory(require('react-router').Link);
var DateRangePicker = require('react-bootstrap-daterangepicker');
var moment = require('moment');

var DocumentTitle = require('../components/DocumentTitle');
var SearchTable = require('../components/SearchTable');
var PredictionAPI = require('../utils/PredictionAPI');

var AdvSearchPage = React.createClass({

  getInitialState: function() {
    return {
      data: [],
      startDate: moment(),
      endDate: moment(),
      searchString: "",
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
    };
  },

  handleEvent:function(event, picker){
    console.log(event);
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    PredictionAPI.getAllWithDates(this.state.searchString,this.state.startDate, this.state.endDate).then(function(data){
      this.setState({data:data});
    }.bind(this));
  },

  onKey: function(event, emit){
    this.setState({searchString: event.target.value});
  },

  render: function() {
    return (
      <section className="search-page">

        <DocumentTitle title="Search" />

        <div>
          Advanced Search
        </div>
        
        <form>
        <input type='text' onKeyUp={this.onKey} />
        <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onEvent={this.handleEvent} />
        <input type='submit' />
        </form>
        <div>
          <SearchTable data={this.state.data} />
        </div>
      </section>
    );
  }

});

module.exports = React.createFactory(AdvSearchPage);