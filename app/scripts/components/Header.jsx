var React = require('react');
var classnames = require('classnames');
var Router = require('react-router');
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
			            <Link to="wall"> 心愿墙 </Link>
			          </div>
			          <div className="col-xs-3">
			            <Link to="home" >选课网(即将推出) </Link>
			          </div>
			        </div>
			      </div>
			    </div>) : null ;
		return(
			<section>
				<div className={classnames("header_"+this.props.color)} >
			      <div className="container" >
			        <p className="lead">济忆</p>
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