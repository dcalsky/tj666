
var React = require('react');
var Reflux = require('reflux');

var FindclassStore = require('../stores/FindclassStore.js');
var UserStore = require('../stores/UserStore.js');
var LoginStore = require('../stores/LoginStore.js');
var Actions = require('../actions/actions.js');

var Form = require('../src/js').Form;
var Bs = require('react-bootstrap');
var Input = Bs.Input ,Jumbotron = Bs.Jumbotron , Col = Bs.Col , Row = Bs.Row   ;

var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
var Table = require('./Table.jsx');


var Classmate = React.createClass({
	mixins:[Reflux.connect(FindclassStore, 'FindclassStore'),Reflux.connect(UserStore, 'UserStore'),Reflux.connect(LoginStore,'LoginStore')],
	handleFind:{
		findClassmate:Actions.findClassmate,
		setUserMessage:Actions.setUserMessage,
	},
	getInitialState: function () {
	    return {
	        selectLabel:'请选择您的专业:',
	        department:'材料化学研究所',
	        tableRender:false,
	    };
	},
	componentWillMount:function(){
		if(!this.state.UserStore.user.hadLogin){window.location.href='#/login';return}
		for (attr in this.state.UserStore.user){
			if(!this.state.UserStore.user[attr]){
				this.setState({selectLabel:'请选择您的专业:',});
				break ;
			}
			this.setState({selectLabel:'请选择要查询的专业:',});
		}

	}, 
	handleSelectChange:function(){
		this.setState({
			department:this.refs.department.getValue()
		});
	},
	render:function(){
		return(
			<div >
              <Navbar />
              <Header color="red" headerTitle="Providing services for students." headerParagraph={<p>"Talk is cheap,Show me the code." <br/> {"Linus Torvalds"}</p>} subHeader={true}  />
              <section className="section" >
	              <div className="container">
					<Form ref="form" type="json" handleFind={this.handleFind} department={this.state.department} hadSet={this.state.UserStore.user.messageHadSet} findFinished={this.state.FindclassStore.findFinished} > 
						<Col xs={12}>
					    <Input ref="department" type="select" className="form-control" label={this.state.selectLabel} placeholder='select' onChange={this.handleSelectChange}>
					      	{this.state.FindclassStore.department.map(function(obj){
					      		return (<option value={obj.value}>{obj.text}</option>)
					      	})}
					    </Input>
					    </Col>
						<Form.Control name="name" required={true} minlen={2} maxlen={8} classCustom={{labelCustomCol:12,groupCustomCol:5}} type="text" label="* 姓名:" placeholder="请输入您的姓名(绑定至同济大学账号)"  hidden={this.state.UserStore.user.messageHadSet} />
			          	<Form.Control name="QQ" required={true} minlen={6} maxlen={13} classCustom={{labelCustomCol:12,groupCustomCol:7}} type="integer" label="* QQ号:" placeholder="请输入您的QQ号(绑定至同济大学账号)"  hidden={this.state.UserStore.user.messageHadSet} />
			            <Form.Control name="tel"  minlen={11} maxlen={13} classCustom={{labelCustomCol:12,groupCustomCol:12}} type="integer" label="手机号码:" placeholder="请输入您的手机号码(绑定至同济大学账号)"  hidden={this.state.UserStore.user.messageHadSet} />			        
				        <Form.Submit text={["Find Them","查找中..."]} bsStyle='success' bsSize="large" style={{"width":"100%"}} />
					</Form>
				  </div>
			  </section>
			  <section>
			  	<div className="container">
			  		<Table finished={this.state.FindclassStore.findFinished} data={this.state.FindclassStore.classmateInfo} />
			  	</div>
			  </section>
			  <Footer />
             </div>
			);
	}
});

module.exports = Classmate ; 