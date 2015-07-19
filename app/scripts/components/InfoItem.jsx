var React = require('react');
var classnames = require('classnames');

var Bs = require('react-bootstrap');
var Button = Bs.Button ;

var Router = require('react-router');

var LoginStore = require('../stores/LoginStore.js');

var InfoItem = React.createClass({
	render:function(){
		var disabled = this.props.InfoData.disabled ? "disabled" : "" ;
		return(
			<div style={{"marginBottom":20,"verticalAlign":"bottom"}}>
				<img className="img-circle " style={{"backgroundColor":this.props.InfoData.color,"width":150,"height":150}} />
				<h2> {this.props.InfoData.InfoTitle} </h2>
				<div dangerouslySetInnerHTML={{__html: this.props.InfoData.InfoMessage}} />
				<a href={this.props.InfoData.Link} className={classnames("btn","btn-default",disabled)} role="button"  > {this.props.InfoData.buttonTitle} </a>
			</div>
			);
	}

});

module.exports = InfoItem ;