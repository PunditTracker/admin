'use strict';

var React         = require('react/addons');
var Link          = require('react-router').Link;
var DateRangePicker = require('react-bootstrap-daterangepicker');
var moment = require('moment');

var DocumentTitle = require('../components/DocumentTitle');
var SearchTable = require('../components/SearchTable');
var PredictionAPI = require('../utils/PredictionAPI');

var format = 'MMM Do YYYY';

var AdvSearchPage = React.createClass({

  getInitialState: function() {
    return {
      showDatePicker: true,
      data: [],
      startDate: moment().subtract(1, 'days'),
      endDate: moment(),
      searchString: "",
      ranges: {
        'Last 24 hours': [moment().subtract(1, 'days'), moment()],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Last Year': [moment().subtract(1, 'year'), moment()],
        'Last 5 Years': [moment().subtract(5, 'year'), moment()],
      },
    };
  },

  handleEvent:function(event, picker){
    console.log(event);
    if(event.type=="apply"){
      this.setState({
        startDate: picker.startDate,
        endDate: picker.endDate,
        showDatePicker: false,
      });
      return
    }
    if(event.type=="cancel"){
      this.setState({
                    showDatePicker: false,
                    startDate: moment().subtract(5, 'year'),
                    endDate: moment()
      });
    }
  },

  onKey: function(event, emit){
    this.setState({searchString: event.target.value});
  },

  handleSubmit: function(e){
    console.log(e);
    e.preventDefault();
    PredictionAPI.getAllWithDates(this.state.searchString,this.state.startDate, this.state.endDate).then(function(data){
      this.setState({data:data});
    }.bind(this));
  },

  onToggleCalendar: function(){
    this.setState({showDatePicker: !this.state.showDatePicker});
  },

  render: function() {
    return (
      <section className="search-page">

        <DocumentTitle title="Search" />

        <div>
          Advanced Search
        </div>
        <button onClick={this.onToggleCalendar}>Created Date Range: {this.state.startDate.format(format)} - {this.state.endDate.format(format)}</button>
        { this.state.showDatePicker ? <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onEvent={this.handleEvent} /> : null }

        <form onSubmit={this.handleSubmit}>
          <input type='text' onKeyUp={this.onKey} />
          <input type='submit' />
        </form>
        <div>
          <SearchTable data={this.state.data} />
        </div>
      </section>
    );
  }

});

module.exports = AdvSearchPage;