'use strict';

var React           = require('react/addons');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var moment          = require('moment');
var _               = require('lodash');
var DocumentTitle   = require('react-document-title');

var SearchTable     = require('../components/SearchTable');
var PredictionAPI   = require('../utils/PredictionAPI');
var Spinner         = require('../components/Spinner');

var format = 'MMM Do YYYY';

var AdvSearchPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      showDatePicker: false,
      data: [],
      startDate: moment().subtract(1, 'days'),
      endDate: moment(),
      query: '',
      ranges: {
        'Last 24 hours': [moment().subtract(1, 'days'), moment()],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Last Year': [moment().subtract(1, 'year'), moment()],
        'Last 5 Years': [moment().subtract(5, 'year'), moment()],
      },
      loading: false,
      error: null
    };
  },

  handleEvent:function(event, picker){
    console.log(event);
    if ( event.type === 'apply' ) {
      this.setState({
        startDate: picker.startDate,
        endDate: picker.endDate,
        showDatePicker: false,
      });
    } else if ( event.type === 'cancel' ) {
      this.setState({
        showDatePicker: false,
        startDate: moment().subtract(5, 'year'),
        endDate: moment()
      });
    }
  },

  handleSubmit: function(evt){
    evt.preventDefault();

    this.setState({ loading: true });

    PredictionAPI.getAllWithDates(this.state.query,this.state.startDate, this.state.endDate).then(function(data){
      this.setState({ loading: false, data: data });
    }.bind(this));
  },

  toggleDatepicker: function(){
    this.setState({showDatePicker: !this.state.showDatePicker});
  },

  renderDatePicker: function() {
    var element = null;

    if ( this.state.showDatePicker ) {
      element = (
        <DateRangePicker startDate={this.state.startDate}
                         endDate={this.state.endDate}
                         ranges={this.state.ranges}
                         onEvent={this.handleEvent} />
      );
    }

    return element;
  },

  renderResults: function() {
    var element = null;

    if ( !this.state.loading && !_.isEmpty(this.state.data) ) {
      element = (
        <div>
          <SearchTable data={this.state.data} />
        </div>
      );
    } else if ( !this.state.loading ) {
      element = (
        <h4 className="text-center">No results.</h4>
      );
    }

    return element;
  },

  render: function() {
    var formStyles = {
      'maxWidth': '600px',
      'margin': '0 auto'
    };

    return (
      <DocumentTitle title="Search">
      <section className="content no-hero search-page">

        <div className="container">
          <h3 className="text-center flush">Advanced Prediction Search</h3>
          <h4 className="text-center flush--top">
            Currently Searching Created Date Range: {this.state.startDate.format(format)} - {this.state.endDate.format(format)}
            <button className="btn nudge-half--left" style={{ 'fontSize': 14 }} onClick={this.toggleDatepicker}>Change</button>
          </h4>

          {this.renderDatePicker()}

          <form style={formStyles} onSubmit={this.handleSubmit}>
            <input type="text"
                   placeholder="Enter your query here..."
                   valueLink={this.linkState('query')}
                   className="block full-width nudge-half--bottom" />
            <button className="btn block full-width"
                    type="submit"
                    disabled={this.state.loading ? 'true' : ''}>
              <Spinner loading={this.state.loading} />
              Search
            </button>
          </form>
          {this.renderResults()}
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = AdvSearchPage;