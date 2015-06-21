var React = require('react');
var Reflux = require('reflux');
var Form = require('../src/js').Form;
var Bs = require('react-bootstrap');
var PageHeader = Bs.PageHeader;
var Navbar = require('./Navbar.jsx');
var Actions = require('../actions/actions') ;
var LoginStore = require('../stores/LoginStore.js');


var Login = React.createClass({
	mixins:[Reflux.connect(LoginStore,'LoginStore')],
	handleLogin:{
		login:Actions.login,
		register:Actions.register,
	},
	checkAccout:function(accout){
		Actions.checkAccout(accout);
	},
	render:function(){
		return(
				<div>
	              <Navbar />
	              <div className="container" style={{"marginTop":30}} >
	              	<PageHeader> <p style={{'marginLeft':'31%'}} >登陆<small>同济大学</small></p></PageHeader>
			          <Form ref="form" type="json" layout="horizontal" handleLogin={this.handleLogin} isLogin={this.state.LoginStore.objLogin.isLogin} status={this.state.LoginStore.objLogin.status} >
			            <Form.Control name="accout" required={true} minlen={7} maxlen={7} width={8} type="integer" label="学号:" placeholder="请输入您的同济学号"  onBlur={this.checkAccout} />
			            <Form.Control name="password" required={true} minlen={6} maxlen={6} width={8} type="password" label="密码:" placeholder="请输入您的密码"   />
			            <Form.Control name="password_confirm" equal="password" width={8} required={!this.state.LoginStore.objLogin.isLogin} minlen={6} maxlen={6} type="password" label="确认密码:" placeholder="请再次输入密码"  hidden={this.state.LoginStore.objLogin.isLogin} />
			           	<Form.Submit text={["登陆","登陆中..."]}  className="col-sm-8 col-sm-offset-2 col-xs-9 col-xs-offset-1" bsSize="large" href="#"  />
			          </Form>
			      </div>
			    <hr />
                <footer className="footer" style={{"marginTop":50}}>
                      <div className="container">
                          <p className="text-muted text-center" >Copyright &copy; 2015 周左左 All rights reserved.</p>
                      </div>
                </footer>
				</div>
			)
	},
})

module.exports = Login ;