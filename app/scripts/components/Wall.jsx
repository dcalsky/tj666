
var React = require('react/addons');
var Reflux = require('reflux');

var WallStore = require('../stores/WallStore.js');
var UserStore = require('../stores/UserStore.js');
var Actions = require('../actions/actions.js');

var Form = require('../src/js').Form;
var Bs = require('react-bootstrap');
var Modal = Bs.Modal , Panel = Bs.Panel , Input = Bs.Input , Col = Bs.Col , Row = Bs.Row , Button = Bs.Button ;
var Select = require('react-select');

var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');

var Card = React.createClass({
	render: function(){
		return(
			<div>
				<Panel style={{"height":300}} header={this.props.item.title} bsStyle='primary'>
					{this.props.item.content}
				</Panel>
			</div>
		);
	}
});

var Loading = React.createClass({
	render: function(){
		if(this.props.loading){
			return (<img src="./images/loading.gif" />);
		}else{
			return null ;
		}
	}
});
var Wall = React.createClass({
	mixins:[Reflux.connect(WallStore, 'WallStore'),Reflux.connect(UserStore, 'UserStore'),React.addons.LinkedStateMixin],
	getInitialState: function () {
	    return {
	        showModal: false,
        	title: null,
        	content: null,
        	gender: 'male',
        	QQ: null,
        	time: null,
        	accout: null,
	    };
	},
	componentWillMount:function(){
		/*
		if(!this.state.UserStore.user.hadLogin){window.location.href='#/login';return}
		for (attr in this.state.UserStore.user){
			if(!this.state.UserStore.user[attr]){
				this.setState({selectLabel:'请选择您的专业:',});
				break ;
			}
			this.setState({selectLabel:'请选择要查询的专业:',});
		}
		*/
		Actions.refreshWish();
	}, 
	viewMyWish: function(){
		Actions.viewMyWish(this.state.UserStore.accout);
	},
	back: function(){
		Actions.refreshWish();
	},
	addWish: function(){
		Actions.addWish({
			title: this.state.title,
			content: this.state.content,
			gender: this.state.gender,
			QQ: this.state.QQ,
			accout: this.state.UserStore.accout,
		});
	},
	cancel: function(){
		this.setState({
			showModal: false
		});
	},
	nextPage: function(){
		Actions.loadWish();
	},
	render: function(){
		return(
			<div >
              <Navbar />
              <Header color="red" headerTitle="心愿墙" headerParagraph={<p>还没开学就想先认识同学？ <br/> 只需一步</p>} subHeader={true}  />
              <section className="container" style={{"paddingTop":10}}>
              	<div style={{"marginBottom":20}} >
		              	<Button style={{"marginRight":10}} onClick={this.back} >返回</Button>             		
		              	<Button style={{"marginRight":10}} bsStyle='success' onClick={this.viewMyWish} >我的心愿</Button>
		              	<Button style={{"marginRight":10}} bsStyle='danger' onClick={this.addWish} >添加心愿</Button>
              	</div>
              	<div className="wall row">
              		{this.state.WallStore.objWish.wishs.map(function(item){
              			return(
              				<Col xs={12} sm={6} md={4} >
	              				<Card item={item} />
              				</Col>
              			);
              		})}
              	</div>
              	<div className="text-center">
				  <Loading loading={this.state.WallStore.objWish.loading} /> 
              	</div>
				<Button style={{"marginTop":20}} block bsStyle='primary' onClick={this.nextPage} disabled={this.state.WallStore.objWish.loading} >下一页</Button>
			  </section>
			  <Footer />
             </div>
			);
	}
});

module.exports = Wall ; 