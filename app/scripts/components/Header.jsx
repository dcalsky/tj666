var React = require('react');
var classnames = require('classnames');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var Header = React.createClass({
	render:function(){
		var subHeader = this.props.subHeader ? 	
				 (<div className={classnames("subheader_"+this.props.color,"lead")} >
			      <div className="container">
			        <div className="row">
			          <div className="col-xs-3">
			            <Link to="classmate" >新生找同学</Link>
			          </div>
			          <div className="col-xs-3">
			            <a href="http://www.ttjj666.com/milk.html">校园订奶</a>
			          </div>
			          <div className="col-xs-3">
			            <a href="#">新生必备</a>
			          </div>
			          <div className="col-xs-3">
			            <Link to="home" >关于我们</Link>
			          </div>
			        </div>
			      </div>
			    </div>) : null ;
		return(
			<section>
				<div className={classnames("header_"+this.props.color)} >
			      <div className="container" >
			        <p className="lead">微同济</p>
			        <h1>{this.props.headerTitle} <br/></h1>
			        <div className="lead" >{this.props.headerParagraph}</div>
			      </div>
			    </div>
			    {subHeader}
			</section>
			);
	}

});

module.exports = Header ;