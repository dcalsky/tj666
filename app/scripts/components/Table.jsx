var React = require('react');
var BsTable = require('react-bootstrap').Table ;

var Table = React.createClass({
	componentWillReceiveProps:function(nextProps){
		this.setState({
			data:nextProps.data,
		})
	},
	render:function(){
		if(!this.props.finished){
			return null ;
		}else{
			return(     
				<BsTable>
			  			<thead>
			  				<tr>
					  			{Object.keys(this.state.data[0]).map(function(attr){
					  				return (<th>{attr}</th>);
					  			})}
					  		</tr>
			  			</thead>

			  			<tbody>
			  				{this.state.data.map(function(obj){
			  					return <tr>{Object.keys(obj).map(function(attr){
			  						return <td>{obj[attr]}</td>
			  					})}</tr>
			  				})}
			  			</tbody>
			  	</BsTable>
			);
		}
	}
});

module.exports = Table ;