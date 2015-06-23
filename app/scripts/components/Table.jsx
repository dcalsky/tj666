var React = require('react');
var BsTable = require('react-bootstrap').Table ;

var Table = React.createClass({
	render:function(){
		if(!this.props.finished){
			return null ;
		}else{
			var title = Object.keys(this.props.data[0]).map(function(attr){
					  		return (<th>{attr}</th>);
					  	});
			var i =[];
			 this.props.data.map(function(obj){
							Object.keys(obj).map(function(attr){
								i.push(obj[attr]);
							})
						}
			);
			 console.log(i);
			var body = i.map(function(data){return data});
			var context = this.props.data.map(function(obj){
				return (<tr>{body}</tr>)
			});
			//var context = this.props.data.map(function(key){for(attr in key){return <td>{key[attr]}</td>}});
			return(     
				<BsTable>
			  			<thead>
			  				<tr>
					  			{title}
					  		</tr>
			  			</thead>

			  			<tbody>
			  				{context}
			  			</tbody>
			  	</BsTable>
			);
		}
	}
});

module.exports = Table ;