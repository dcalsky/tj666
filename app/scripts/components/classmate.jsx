'use-strict';
var React = require('react');
var Reflux = require('reflux');

var FindclassStore = require('../stores/FindclassStore.js');
var UserStore = require('../stores/UserStore.js');
var LoginStore = require('../stores/LoginStore.js');
var Actions = require('../actions/actions.js');

var Form = require('../src/js').Form;

var FixedDataTable = require('fixed-data-table');
var ResponsiveFixedDataTable = FixedDataTable.Table;
var Column = FixedDataTable.Column;


var Bs = require('react-bootstrap');
var Input = Bs.Input ,Jumbotron = Bs.Jumbotron , Col = Bs.Col , Row = Bs.Row  ;

var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var Navbar = require('./Navbar.jsx');


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
	    };
	},
	componentWillMount:function(){
		if(!this.state.UserStore.user.hadLogin){window.location.href='#/login';return}
		for (attr in this.state.UserStore.user){
			if(!this.state.UserStore.user[attr]){
				this.setState({hadSet:false,selectLabel:'请选择您的专业:',});
				break ;
			}
			this.setState({hadSet:true,selectLabel:'请选择要查询的专业:',});
		}
	},
	handleSelectChange:function(){
		this.setState({
			department:this.refs.department.getValue()
		});
	},
	render:function(){
var data = [
	['a1', 'b1', 'c1'],
	['a2', 'b3', 'c2'],
	['a3', 'b3', 'c3']
];

function rowGetter(rowIndex) {
  return data[rowIndex];
}
		return(
			<div >
              <Navbar />
              <div ref="container" className="container">
	              <Jumbotron>
				      <h1>Hey, 想要马上找到你的小伙伴吗?</h1>
				  </Jumbotron>
					<ResponsiveFixedDataTable
						rowHeight={40}
						rowGetter={rowGetter}
						rowsCount={data.length}
						width={500}
						height={200}
						headerHeight={60} >
						<Column label='Col 1' width={100} dataKey={0} />
						<Column label="Col 2" width={400} dataKey={1} flexGrow={1} />
					</ResponsiveFixedDataTable>
				<Form ref="form" type="json" handleFind={this.handleFind} department={this.state.department} hadSet={this.state.hadSet} > 
					<Col xs={12}>
				    <Input ref="department" type="select" className="form-control" label={this.state.selectLabel} placeholder='select' onChange={this.handleSelectChange}>
				      	{this.state.FindclassStore.department.map(function(obj){
				      		return (<option value={obj.value}>{obj.text}</option>)
				      	})}
				    </Input>
				    </Col>
					<Form.Control name="name" required={true} minlen={2} maxlen={8} classCustom={{labelCustomCol:12,groupCustomCol:5}} type="text" label="* 姓名:" placeholder="请输入您的姓名"  hidden={this.state.UserStore.user.messageHadSet} />
		          	<Form.Control name="QQ" required={true} minlen={6} maxlen={13} classCustom={{labelCustomCol:12,groupCustomCol:7}} type="integer" label="* QQ号:" placeholder="请输入您的QQ号"  hidden={this.state.UserStore.user.messageHadSet} />
		       	  
		            <Form.Control name="tel"  minlen={11} maxlen={13} classCustom={{labelCustomCol:12,groupCustomCol:12}} type="integer" label="手机号码:" placeholder="请输入您的手机号码"  hidden={this.state.UserStore.user.messageHadSet} />
		        
			        <Form.Submit text={["Find Them","查找中..."]} bsStyle='success' bsSize="large" style={{"width":"100%"}} />

				</Form>




			  </div>

                <footer className="footer" style={{"marginTop":50}}>
                      <div className="container">
                          <p className="text-muted text-center" >Copyright &copy; 2015 周左左 All rights reserved.</p>
                      </div>
                </footer>
             </div>
			)
	}

});

module.exports = Classmate ; 