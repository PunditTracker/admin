/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var PredictionAPI = require('../utils/PredictionAPI');
var Reactable = require('Reactable');
var Table = Reactable.Table;
var cols = ['id', 'title', 'created', 'deadline'];

var SearchTable = React.createClass({

	defaultProps: function() {
		return {
			data: [],
		};
	},

	render: function(){
		return(
			<Table className="table" columns={cols} data={this.props.data} itemsPerPage={10} sortable={true} />
		)
	},

});
module.exports = SearchTable;