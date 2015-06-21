var React = require('react');
var Reflux = require('reflux');
var Bs = require('react-bootstrap');
var Button = Bs.Button, Navbar = Bs.Navbar , Nav = Bs.Nav , NavItem = Bs.NavItem , DropdownButton = Bs.DropdownButton , MenuItem = Bs.MenuItem , CollapsibleNav = Bs.CollapsibleNav ;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var UserStore = require('../stores/UserStore.js');
var Actions = require('../actions/actions.js');

var NavBar = React.createClass({
  mixins:[Reflux.connect(UserStore,'UserStore')],
  handleQuit:function(){
    Actions.quit();
  },
	render:function(){
    this.itemDisplay = (this.state.UserStore.user.accout && this.state.UserStore.user.password) ? '' : 'hidden' ;
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
                    <MenuItem eventKey={2}  className={this.itemDisplay} >{this.state.UserStore.user.accout} </MenuItem>
                    <MenuItem eventKey={3}  className={this.itemDisplay} onClick={this.handleQuit} >退出</MenuItem>
                  </Nav>
                </CollapsibleNav>
               </Navbar>
			);
	}

});

module.exports = NavBar ;