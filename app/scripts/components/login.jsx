var React = require('react');
var Reflux = require('reflux');
var Bs = require('react-bootstrap');
var Form = require('../src/js').Form;
var PageHeader = Bs.PageHeader , Button = Bs.Button;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var Navbar = require('./Navbar.jsx');
var Actions = require('../actions/actions') ;
var LoginStore = require('../stores/LoginStore.js');

function getSrc(f) {
  return window.location.pathname +  f + '.json'
}

var Login = React.createClass({
	mixins:[Reflux.connect(LoginStore,'LoginStore')],
	handleLogin:{
		isLogin:false,
		Login:function(data){
			Actions.login(data);
		},
		register:function(data){
			Actions.register(data);
		},
	},
	buttonClick:function(){
		console.log(this.refs.form.getValue());
	},
	render:function(){
		return(
				<div>
	              <Navbar />
	              <div className="container" style={{"marginTop":30}}>
			          <Form ref="form" type="json" layout="horizontal" handleLogin={this.handleLogin} >
			            <Form.Control name="accout" require={true} minlen={7} maxlen={7} type="integer" label="学号:" tip="" />
			            <Form.Control name="password" required={true} minlen={6} maxlen={6} type="password" label="密码:" tip="" />
			           	<Form.Submit text={["提交","处理中..."]} />
			          </Form>
			      </div>

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