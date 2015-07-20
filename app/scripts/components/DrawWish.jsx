
var React = require('react');
var Reflux = require('reflux');

var WallStore = require('../stores/WallStore.js');
var UserStore = require('../stores/UserStore.js');
var Actions = require('../actions/actions.js');

var Bs = require('react-bootstrap');
var PageHeader = Bs.PageHeader , Input = Bs.Input , Col = Bs.Col , Row = Bs.Row , Button = Bs.Button ;

var Router = require('react-router');

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

var DrawWish = React.createClass({
	mixins:[Reflux.connect(WallStore, 'WallStore'),Reflux.connect(UserStore, 'UserStore'), Router.Navigation, Router.State],
	componentWillMount: function () {
	    Actions.getSingleWish(this.getParams().id);
	},
	getInitialState: function () {
	    return {
        	
	    };
	},
	back: function(){
		this.transitionTo('wall');
	},
	render: function(){
		return(
			<div >
              <Navbar />
              <section className="container" style={{"marginTop":30}}>
              	<PageHeader> <p className="text-center" >添加心愿单<small>Let it come true</small></p></PageHeader>
              	{this.getParams().id}
			  </section>
			  <Footer name={"济忆"} />
             </div>
			);
	}
});

module.exports = DrawWish ; 