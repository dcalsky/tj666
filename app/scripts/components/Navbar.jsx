var React = require('react');
var Bs = require('react-bootstrap');
var Button = Bs.Button, Navbar = Bs.Navbar , Nav = Bs.Nav , NavItem = Bs.NavItem , DropdownButton = Bs.DropdownButton , MenuItem = Bs.MenuItem , CollapsibleNav = Bs.CollapsibleNav ;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var NavBar = React.createClass({
	render:function(){
		return(
			  <Navbar brand='微同济' inverse toggleNavKey={0}>
                <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                  <Nav navbar>
                    <li eventKey={1} ><Link to="classmate" >找新同学</Link></li>
                    <li eventKey={2} ><Link to="classmate" >找新同学</Link></li>
                    <li eventKey={3} ><Link to="classmate" >找新同学</Link></li>
                  </Nav>
                  <Nav navbar right>
                    <li eventKey={1} ><Link to="login" >校园账号登陆</Link></li>
                  </Nav>
                </CollapsibleNav>
               </Navbar>
			);
	}

});

module.exports = NavBar ;