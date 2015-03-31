'use strict';

var React = require('react/addons');
var PredictionAPI = require('../utils/PredictionAPI');
var Reactable = require('Reactable');
var Table = Reactable.Table;


var SearchBox = React.createClass({

	getInitialState: function() {
		return {
			data: [],
		};
	},

	componentDidMount: function(){
		PredictionAPI.getAll().then(function(preds){
			console.log('preds: ',preds);
			this.setState({data:preds});
		}.bind(this));
	},

	render: function() {
		return(
			<Table className="table" data={this.state.data} itemsPerPage={10} sortable={true} />
		);
	},

});
module.exports = SearchBox;