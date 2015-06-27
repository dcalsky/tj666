var React = require('react');
var Bs = require('react-bootstrap');
var classnames = require('classnames');
var Button = Bs.Button ;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var LoginStore = require('../stores/LoginStore.js');

var InfoItem = React.createClass({
	render:function(){
		var disabled = this.props.InfoData.disabled ? "disabled" : "" ;
		return(
			<div style={{"marginBottom":20}}>
				<img className="img-circle " style={{"backgroundColor":this.props.InfoData.color,"width":150,"height":150}} />
				<h2> {this.props.InfoData.InfoTitle} </h2>
				<p> {this.props.InfoData.InfoMessage} </p>
				<a href={this.props.InfoData.Link} className={classnames("btn","btn-default",disabled)} role="button"  > 进入 </a>
			</div>
			);
	}

});

module.exports = InfoItem ;