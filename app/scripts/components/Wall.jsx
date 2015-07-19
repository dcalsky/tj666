
var React = require('react/addons');
var Reflux = require('reflux');

var WallStore = require('../stores/WallStore.js');
var UserStore = require('../stores/UserStore.js');
var Actions = require('../actions/actions.js');

var _ = require('underscore');

var Bs = require('react-bootstrap');
var Badge = Bs.Badge , Glyphicon = Bs.Glyphicon , Panel = Bs.Panel , Input = Bs.Input , Col = Bs.Col , Row = Bs.Row , Button = Bs.Button ;

var Router = require('react-router');

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');

var Card = React.createClass({
	heart: 'heart-empty',
	liked: false,
	love: 0,
	completed: true,
	handleClick: function(){
		if(this.liked && this.completed){
			completed: false;
			Actions.unlikeWish(this.props.item.id,this.props.accout);
		}else if(!this.liked && this.completed){
			completed: false;
			Actions.likeWish(this.props.item.id,this.props.accout);
		}
	},
	componentWillReceiveProps: function (nextProps) {
		if(nextProps.item.likeCompleted){
			this.heart = 'heart' ;
			this.liked = true ;
			this.completed = true ;
			this.love = nextProps.item.love ;
		}else if(nextProps.item.unlikeCompleted){
			this.heart = 'heart-empty' ;
			this.liked = false ;
			this.completed = true ;
			this.love = nextProps.item.love ;
		}
	},
	render: function(){
	    this.love = this.props.item.love ;
	    this.liked = this.props.item.liked ;
	    this.heart = this.props.item.liked ? 'heart' : 'heart-empty' ;
		var content = this.props.item.content.replace(new RegExp("\n", "gm"), "<br />");
		var content = this.props.item.content.replace(new RegExp("<script>", "gm"), " ");
		title = <div>{this.props.item.title}<Badge style={{"margin":"0px 0px 6px 5px"}} >Like:{this.love}</Badge><span className="pull-right" onClick={this.handleClick}><Glyphicon style={{"cursor":"pointer"}} glyph={this.heart} /></span></div> ;
		return(
			<div>
				<Panel style={{"height":300,"overflowY":"scroll","wordBreak":"break-all"}} header={title} bsStyle='primary'>
					<div dangerouslySetInnerHTML={{__html: content}} />
					<p className="text-right" style={{marginTop:40}} ><i>{this.props.item.name}</i> <br />于 <br /><i>{this.props.item.time}</i></p>
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

var NextButton = React.createClass({
	getInitialState: function () {
	    return {
	    	label: '下一页',
	    	missed: 'block',
	    };
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.disabled){
			this.setState({
				label: '已到最后一页',
			});
		}else if(nextProps.missed){
			this.setState({
				missed: 'none',
			});
		}else{
			this.setState({
				label: '下一页',
				missed: 'block',
			});
		}
	},
	render: function(){
		var self = this ;
		return(
			<Button style={{"marginTop":20,"display":self.state.missed}} block bsStyle='primary' onClick={this.props.nextPage} disabled={this.props.disabled} >{this.state.label}</Button>
		);
	}
});
var Wall = React.createClass({
	mixins:[Reflux.connect(WallStore, 'WallStore'),Reflux.connect(UserStore, 'UserStore'),React.addons.LinkedStateMixin, Router.Navigation],
	getInitialState: function () {
	    return {
	        showModal: false,
        	missed: false,
        	viewWishButton: 'inline',
        	backButton: 'none'
	    };
	},
	componentWillMount:function(){
		if(!this.state.UserStore.user.hadLogin){
			this.transitionTo('login');
			return;
		}
		Actions.refreshWish(this.state.UserStore.user.accout);
	}, 
	viewMyWish: function(){
		this.setState({
			missed: true,
			viewWishButton: 'none',
			backButton: 'inline',
		});
		Actions.viewMyWish(this.state.UserStore.user.accout);
	},
	back: function(){
		this.setState({
			missed: false,
			viewWishButton: 'inline',
			backButton: 'none',
		});
		Actions.refreshWish(this.state.UserStore.user.accout);
	},
	addWish: function(){
		this.transitionTo('addWish');
	},
	nextPage: function(){
		Actions.loadWish(this.state.UserStore.user.accout);
	},
	render: function(){
		var self = this ;
		return(
			<div >
              <Navbar />
              <Header color="red" headerTitle="心愿墙" headerParagraph={<p>还没开学就想先认识同学？ <br/> 只需一步</p>} subHeader={true}  />
              <section className="container" style={{"paddingTop":10}}>
              	<div style={{"marginBottom":20}} >
		              	<Button style={{"marginRight":10,"display":this.state.backButton}} onClick={this.back} >返回</Button>             		
		              	<Button style={{"marginRight":10,"display":this.state.viewWishButton}} bsStyle='success' onClick={this.viewMyWish} >我的心愿</Button>
		              	<Button style={{"marginRight":10}} bsStyle='danger' onClick={this.addWish} >添加心愿</Button>
              	</div>
              	<div className="wall row">
              		{this.state.WallStore.objWish.wishs.map(function(item){
              			return(
              				<Col xs={12} sm={6} md={4} >
	              				<Card item={item} accout={self.state.UserStore.user.accout}  />
              				</Col>
              			);
              		})}
              	</div>
              	<div className="text-center">
				  <Loading loading={this.state.WallStore.objWish.loading} /> 
              	</div>
              	<NextButton  disabled={this.state.WallStore.objWish.loading} nextPage={this.nextPage} missed={this.state.missed} />
			  </section>
			  <Footer />
             </div>
			);
	}
});

module.exports = Wall ; 