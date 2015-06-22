var React = require('react');
var Reflux = require('reflux');
var classnames = require('classnames');

var Bs = require('react-bootstrap');
var Navbar = Bs.Navbar , Nav = Bs.Nav , NavItem = Bs.NavItem , DropdownButton = Bs.DropdownButton , MenuItem = Bs.MenuItem , CollapsibleNav = Bs.CollapsibleNav ;
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
    var itemDisplay_login = (this.state.UserStore.user.accout && this.state.UserStore.user.password) ? 'hidden' : '' ;
    var itemDisplay_info = (this.state.UserStore.user.accout && this.state.UserStore.user.password) ? '' : 'hidden' ;
		return(
			  <Navbar brand={<Link to="home" className="logo" >微同济 <span className={classnames(itemDisplay_info,"userInfo")} >   您好:{this.state.UserStore.user.accout}</span></Link>} inverse fixedTop fluid toggleNavKey={0}>
                <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
                  <Nav navbar>
                    <li eventKey={1} ><Link to="home" >首页</Link></li>
                    <li eventKey={2} ><Link to="classmate" >找新同学</Link></li>
                  </Nav>
                  <Nav navbar right eventKey={3} >
                    <li eventKey="1" className={itemDisplay_login} ><Link to="login" >校园账号登陆</Link></li>
                    <MenuItem eventKey="3"  className={itemDisplay_info} onClick={this.handleQuit} >退出</MenuItem>
                  </Nav>
                </CollapsibleNav>
               </Navbar>
			);
	}

});

module.exports = NavBar ;