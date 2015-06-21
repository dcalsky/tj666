var React = require('react');
var Reflux = require('reflux');
var Form = require('../src/js').Form;
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
		console.log(this.state.LoginStore);
		return(
				<div>
	              <Navbar />
	              <div className="container" style={{"marginTop":30}} >
			          <Form ref="form" type="json" layout="horizontal" handleLogin={this.handleLogin} isLogin={this.state.LoginStore.objLogin.isLogin} status={this.state.LoginStore.objLogin.status} >
			            <Form.Control name="accout" required={true} minlen={7} maxlen={7} type="integer" label="学号:" placeholder="请输入您的同济学号" tip="" onBlur={this.checkAccout} />
			            <Form.Control name="password" required={true} minlen={6} maxlen={6} type="password" label="密码:" placeholder="请输入您的密码"  tip="" />
			            <Form.Control name="password_confirm" equal="password" required={!this.state.LoginStore.objLogin.isLogin} minlen={6} maxlen={6} type="password" label="确认密码:" placeholder="请再次输入密码"  tip="" hidden={this.state.LoginStore.objLogin.isLogin} />
			           	<Form.Submit text={["登陆","登陆中..."]} width={6} href="#" />
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