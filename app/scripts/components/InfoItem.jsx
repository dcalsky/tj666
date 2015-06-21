var React = require('react');
var Bs = require('react-bootstrap');
var Button = Bs.Button ;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var LoginStore = require('../stores/LoginStore.js');

var InfoItem = React.createClass({
	render:function(){
		return(
			<div style={{"marginBottom":20}}>
				<img className="img-circle" width={150} height={150} style={{"backgroundColor":this.props.InfoData.color}} />
				<h2> {this.props.InfoData.InfoTitle} </h2>
				<p> {this.props.InfoData.InfoMessage} </p>
				<Link to={this.props.InfoData.Link} className="btn btn-default" role="button" > 进入 </Link>
			</div>
			);
	}

});

module.exports = InfoItem ;