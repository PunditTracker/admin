'use strict';

var React                   = require('react/addons');
var _                       = require('lodash');
var moment                  = require('moment');
var DateRangePicker         = require('react-bootstrap-daterangepicker');

var PredictionAPI           = require('../utils/PredictionAPI');
var Spinner                 = require('../components/Spinner');
var SearchTable             = require('../components/SearchTable');

var format                  = 'MMM Do YYYY';

var UserSearch = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    showNoResultsMessage: React.PropTypes.bool,
    handleResultsRowClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      itemsPerPage: 10,
      showNoResultsMessage: true,
      handleResultsRowClick: function() {}
    };
  },

  getInitialState: function() {
    return {
      showDatePicker: false,
      results: [],
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
      error: null,
      loadingPredictionSearch: false,
      loadingPredictionSearchByUser: false
    };
  },

  handleEvent:function(event, picker){
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

  toggleDatepicker: function(){
    this.setState({showDatePicker: !this.state.showDatePicker});
  },

  handleSubmit: function(evt){
    if ( evt ) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this.setState({
      loadingPredictionSearch: true,
      loadingPredictionSearchByUser: true,
      results: []
    });

    PredictionAPI.searchWithDates(this.state.query,this.state.startDate, this.state.endDate).then(function(results){
      this.setState({
        loadingPredictionSearch: false,
        results: this.state.results.concat(results)
      }, function() {
        PredictionAPI.searchByUser(this.state.query).then(function(results){
          this.setState({
            loadingPredictionSearchByUser: false,
            results: this.state.results.concat(results)
          });
        }.bind(this));
      }.bind(this));
    }.bind(this));
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
    var rebuiltResults = _.map(this.state.results, function(result) {
      return {
        id: result.id,
        title: result.title,
        created: result.created,
        deadline: result.deadline,
        creatorName: result.creator.firstName + ' ' + result.creator.lastName
      };
    });
    var loading = this.state.loadingPredictionSearch || this.state.loadingPredictionSearchByUser;

    if ( !loading ) {
      if ( !_.isEmpty(rebuiltResults) ) {
        element = (
          <div>
            <SearchTable data={rebuiltResults}
                         cols={['id', 'title', 'creatorName', 'created', 'deadline']}
                         itemsPerPage={this.props.itemsPerPage}
                         rowClickCallback={this.props.handleResultsRowClick}/>
          </div>
        );
      } else if ( this.props.showNoResultsMessage ) {
        element = (
          <h4 className="text-center">No results.</h4>
        );
      }
    }

    return element;
  },

  render: function() {
    var formStyles = {
      'maxWidth': '600px',
      'margin': '0 auto'
    };
    var loading = this.state.loadingPredictionSearch || this.state.loadingPredictionSearchByUser;

    return (
      <div>
        <h5 className="text-center flush--top nudge--bottom">
          Currently Searching Created Date Range: {this.state.startDate.format(format)} - {this.state.endDate.format(format)}
          <button className="btn nudge-half--left" style={{ 'fontSize': 14 }} onClick={this.toggleDatepicker}>Change</button>
        </h5>

        {this.renderDatePicker()}

        <form style={formStyles} onSubmit={this.handleSubmit}>
          <input type="text"
                 placeholder="Search for predictions..."
                 valueLink={this.linkState('query')}
                 className="block full-width nudge-half--bottom" />
          <button className="btn block full-width"
                  type="submit"
                  disabled={loading ? 'true' : ''}>
            <Spinner loading={loading} />
            Search
          </button>
        </form>
        {this.renderResults()}
      </div>
    );
  }

});

module.exports = UserSearch;