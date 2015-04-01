'use strict';

var React     = require('react/addons');
var _         = require('lodash');
var Reactable = require('Reactable');
var Table     = Reactable.Table;
var Tr        = Reactable.Tr;
var Td        = Reactable.Td;

var SearchTable = React.createClass({

	getDefaultProps: function() {
		return {
			data: [],
      cols: [],
      itemsPerPage: 10,
      handleResultsRowClick: function() {}
		};
	},

  renderColumns: function(row) {
    return _.map(this.props.cols, function(column, index) {
      return (
        <Td column={column} data={row[column]} key={index}>
          {row[column]}
        </Td>
      );
    });
  },

  renderRows: function() {
    return _.map(this.props.data, function(row, index) {
      return (
        <Tr key={index} onClick={this.props.handleResultsRowClick.bind(null, row)} style={{ 'cursor': 'pointer' }}>
          {this.renderColumns(row)}
        </Tr>
      );
    }.bind(this));
  },

	render: function(){
		return (
			<Table className="table" itemsPerPage={this.props.itemsPerPage} sortable={true}>
        {this.renderRows()}
      </Table>
		);
	},

});
module.exports = SearchTable;