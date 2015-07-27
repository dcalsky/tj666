
var React = require('react');
var Reflux = require('reflux');

var FindclassStore = require('../stores/FindclassStore.js');
var UserStore = require('../stores/UserStore.js');
var LoginStore = require('../stores/LoginStore.js');
var Actions = require('../actions/actions.js');

var Form = require('../src/js').Form;
var Bs = require('react-bootstrap');
var Input = Bs.Input , Jumbotron = Bs.Jumbotron , Col = Bs.Col , Row = Bs.Row  , PageHeader = Bs.PageHeader ; 
var Select = require('react-select');

var Router = require('react-router');

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
var Table = require('./Table.jsx');


var Classmate = React.createClass({
	mixins:[Reflux.connect(FindclassStore, 'FindclassStore'),Reflux.connect(UserStore, 'UserStore'),Reflux.connect(LoginStore,'LoginStore'),Router.Navigation],
	handleFind:{
		findClassmate:Actions.findClassmate,
		setUserMessage:Actions.setUserMessage,
	},
	getInitialState: function () {
	    return {
	        selectLabel:'请选择您的专业:',
	        department:'',
	        tableRender:false,
	    };
	},
	componentWillMount:function(){
		var attr;
		if(!this.state.UserStore.user.hadLogin){
			this.transitionTo('login');
			return;
		}
		for (attr in this.state.UserStore.user){
			if(!this.state.UserStore.user[attr]){
				this.setState({selectLabel:'请选择您的专业:',});
				break ;
			}
			this.setState({selectLabel:'请选择要查询的专业:',});
		}

	}, 
	handleSelectChange:function(val) {
    	this.setState({
			department:val
		});
	},
	render:function(){
		return(
			<div >
              <Navbar />
              <Header color="red" headerTitle="同济新生找同学" headerParagraph={<p>还没开学就想先认识同学？ <br/> 只需一步</p>} subHeader={true}  />
              <section className="section" >
	              <PageHeader> <p className="text-center" >新生找同学</p></PageHeader>
	              <div className="container" style={{"paddingTop":10}}>
					<Form ref="form"   type="json" handleFind={this.handleFind} department={this.state.department} hadSet={this.state.UserStore.user.messageHadSet} findFinished={this.state.FindclassStore.findFinished} > 
						<Col xs={12} style={{"marginBottom":30}} >
						<Select
						    placeholder={this.state.selectLabel}
						    value={this.state.department}
						    options={this.state.FindclassStore.department}
						    onChange={this.handleSelectChange}
						    searchable={false}
						/>
					    </Col>
						<Form.Control name="name" required={true} minlen={2} maxlen={8} classCustom={{labelCustomCol:12,groupCustomCol:5}} type="text" label="* 姓名:" placeholder="请输入您的姓名(绑定至同济大学账号)"  hidden={this.state.UserStore.user.messageHadSet} />
			          	<Form.Control name="QQ" required={true} minlen={6} maxlen={13} classCustom={{labelCustomCol:12,groupCustomCol:7}} type="integer" label="* QQ号:" placeholder="请输入您的QQ号(绑定至同济大学账号)"  hidden={this.state.UserStore.user.messageHadSet} />
			            <Form.Control name="tel"  minlen={11} maxlen={13} classCustom={{labelCustomCol:12,groupCustomCol:12}} type="integer" label="手机号码:" placeholder="请输入您的手机号码(绑定至同济大学账号)"  hidden={this.state.UserStore.user.messageHadSet} />			        
				        <Form.Submit text={["Find Them","Find Them..."]} bsStyle='success' bsSize="large" style={{"width":"100%"}} />
					</Form>
				  </div>
			  </section>
			  <section>
			  	<div className="container">
			  		<Table finished={this.state.FindclassStore.findFinished} data={this.state.FindclassStore.classmateInfo} />
			  	</div>
			  </section>
			  <Footer name={"周左左"} />
             </div>
			);
	}
});

module.exports = Classmate ; 