var React = require('react');
var Reflux = require('reflux');
var FindclassStore = require('../stores/FindclassStore.js');
var Bs = require('react-bootstrap');
var Button = Bs.Button , Jumbotron = Bs.Jumbotron , Input = Bs.Input , Col = Bs.Col , Row = Bs.Row ;
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var Navbar = require('./Navbar.jsx');

var Classmate = React.createClass({
	mixins:[Reflux.connect(FindclassStore, 'FindclassStore')],

	render:function(){
		console.log(this.state.FindclassStore.department);
		return(
			<div >
              <Navbar />
              <div className="container">
	              <Jumbotron>
				      <h1>Hey, 想要马上找到你的小伙伴吗?</h1>
				  </Jumbotron>

				<Row>
				<Col xs={12}>
				    <Input type='select' label='请选择要查询的专业:' placeholder='select'>
				      	{this.state.FindclassStore.department.map(function(name){
				      		return (<option value={name}>{name}</option>)
				      	})}
				    </Input>
				</Col>
				<Col xs={12}>
					<Button bsStyle='success' bsSize="large" block > Find Them </Button>
				</Col>
				</Row>


			  </div>
             </div>
			)
	}

});

module.exports = Classmate ; 