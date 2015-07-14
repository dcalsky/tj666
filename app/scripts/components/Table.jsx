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
			return null;
		}else if(this.props.finished=='error'){
			return <h1 className="text-center">正在等待更多的同学加入，请稍后再试。</h1> ;
		}else{
			return(
				<div>
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
				  	<h1 className="text-center">正在加入更多的同学信息...</h1>
			  	</div>
			);
		}
	}
});

module.exports = Table ;