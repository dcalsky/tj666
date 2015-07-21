
var React = require('react/addons');
var Reflux = require('reflux');

var WallStore = require('../stores/WallStore.js');
var UserStore = require('../stores/UserStore.js');
var Actions = require('../actions/actions.js');

var _ = require('underscore');

var Bs = require('react-bootstrap');
var Badge = Bs.Badge , Glyphicon = Bs.Glyphicon , Panel = Bs.Panel , Input = Bs.Input , Col = Bs.Col , Row = Bs.Row , Button = Bs.Button ;
var Halogen = require('halogen');

var Router = require('react-router');

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');

var CardLike = React.createClass({
	render: function(){
		if(this.props.mine == 1){
			return <Badge >MINE</Badge> ;
		}else{
			return (
				<Button bsStyle='danger' bsSize="small" className="pull-right" onClick={this.props.handleHeart}>
					<Glyphicon style={{"cursor":"pointer"}} glyph={this.props.heart} />
				</Button>
			);
		}
	}
});
var Draw = React.createClass({
	render: function(){
		if(this.props.mine == 1){
			return null ;
		}else{
			return <Button bsSize='small' disabled={this.props.disabled} onClick={this.props.drawWish} >认领 </Button> ;
		}
	}

});
var Card = React.createClass({
	mixins: [Reflux.connect(WallStore, 'WallStore'),Reflux.connect(UserStore, 'UserStore')],
	heart: 'heart-empty',
	liked: false,
	love: 0,
	label: '认领',
	completed: true,
	accout: null,
	contact: null,
	myDrawed: null,
	getInitialState: function () {
	    return {
	        drawed: false,
	    };
	},
	handleHeart: function(){
		if(this.liked && this.completed){
			this.completed = false;
			Actions.unlikeWish(this.props.item.id,this.props.accout);
		}else if(!this.liked && this.completed){
			this.completed = false;
			Actions.likeWish(this.props.item.id,this.props.accout);
		}
	},
	drawWish: function(){

		var D = new Date();
		if(this.state.WallStore.objWish.lastTime && (D.getTime() - this.state.WallStore.objWish.lastTime >= 86400000 && this.drawCompleted == false)){
			Actions.drawWish(this.props.item.id,this.state.UserStore.user.accout);
			this.setState({drawed: true}) ;
		}else{
			alert('Sorry!距离您上次认领或者发布心愿未到一天哦～');
		}
	},
	componentWillMount: function () {
	   	if(this.props.item.drawed != 'none'){
	   		this.label = '已被认领';
	   		this.setState({drawed: true}) ;
	   	}
	   	if(this.props.item.contact != 'filter' && this.props.item.accout != 'filter'){
	   		this.contact = <i><br />联系方式:{this.props.item.contact}<br /></i>;
	   		this.accout = <i>学号:{this.props.item.accout}</i>;
	   		this.myDrawed = <Badge ><b>我认领的</b></Badge>;

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
		if(nextProps.item.drawCompleted){
			alert('认领成功,请到"我的认领"查看联系方式.');
		}
	},
	render: function(){
	    this.love = this.props.item.love ;
	    this.liked = this.props.item.liked ;
	    this.heart = this.props.item.liked ? 'heart' : 'heart-empty' ;
		var content = this.props.item.content.replace(new RegExp('\n', "gm"), "<br />");
		var content = this.props.item.content.replace(new RegExp("<script>", "gm"), " ");
		if(this.props.item.mine == 1){
			var drawed = this.props.item.drawed != '0' ? <i>被:{this.props.item.drawed}认领</i> : <i>暂时无人认领</i> ;
			var title = <div>{this.props.item.title}<Badge style={{"margin":"0px 0px 6px 5px"}} >Like:{this.love}</Badge><Badge >MINE</Badge></div> ;
			return(
				<div>
					<Panel style={{"height":300,"overflowY":"scroll","wordBreak":"break-all"}} header={title} bsStyle='primary'>
						<pre><div dangerouslySetInnerHTML={{__html: content}} /></pre>
						<p className="text-right" style={{marginTop:40}} >
							<i>{this.props.item.name}</i> 
							<br />于 <br />
							<i>{this.props.item.time}</i>
							<br />
							{drawed}
						</p>
					</Panel>
				</div>
			)
		}else{
			var title = <div>{this.props.item.title}<Badge style={{"margin":"0px 0px 6px 5px"}} >Like:{this.love}</Badge>{this.myDrawed}<CardLike mine={this.props.item.mine} handleHeart={this.handleHeart} heart={this.heart} /></div> ;
		   	return(
				<div>
					<Panel style={{"height":300,"overflowY":"scroll","wordBreak":"break-all"}} header={title} bsStyle='primary'>
						<pre><div dangerouslySetInnerHTML={{__html: content}} /></pre>
						<p className="text-right" style={{marginTop:40}} >
							<i>{this.props.item.name}</i> 
							<br />于 <br />
							<i>{this.props.item.time}</i>
							<br />
							{this.accout}
							{this.contact}
							<Draw drawWish={this.drawWish} label={this.label} disabled={this.state.drawed}/>
						</p>
					</Panel>
				</div>
		   	)
		}
	}
});

var Loading = React.createClass({
	render: function(){
		if(this.props.loading){
			return (<div className="loading" ><Halogen.BounceLoader color={"#4DAF7C"} size="48px" /></div>);
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
		Actions.checkLastTime(this.state.UserStore.user.accout);
	}, 
	viewMyWish: function(){
		this.setState({
			missed: true,
			viewWishButton: 'none',
			backButton: 'inline',
		});
		Actions.viewMyWish(this.state.UserStore.user.accout);
	},
	viewDrawWish: function(){
		this.setState({
			missed: true,
			viewDrawButton: 'none',
			backButton: 'inline',
		});
		Actions.viewDrawWish(this.state.UserStore.user.accout);
	},
	back: function(){
		this.setState({
			missed: false,
			viewWishButton: 'inline',
			viewDrawButton: 'inline',
			backButton: 'none',
		});
		Actions.refreshWish(this.state.UserStore.user.accout);
		Actions.checkLastTime(this.state.UserStore.user.accout);
	},
	addWish: function(){
		var D = new Date();
		if(this.state.WallStore.objWish.lastTime && (D.getTime() - this.state.WallStore.objWish.lastTime >= 86400000)){
			this.transitionTo('addWish');
		}else{
			alert('Sorry!距离您上次认领或者发布心愿未到一天哦～');
		}
	},
	nextPage: function(){
		Actions.loadWish(this.state.UserStore.user.accout);
	},
	render: function(){
		var self = this ;
		return(
			<div >
              <Navbar />
              <Header color="pink" headerTitle="心愿墙" headerParagraph={<p>我的心愿是劈柴喂马 <br/> 谁帮我实现?</p>} subHeader={true}  />
              <section className="container" style={{"paddingTop":10}}>
              	<div style={{"marginBottom":20}} >
		              	<Button style={{"marginRight":10,"display":this.state.backButton}} onClick={this.back} >返回</Button>             		
		              	<Button style={{"marginRight":10,"display":this.state.viewWishButton}} bsStyle='success' onClick={this.viewMyWish} >我的心愿</Button>
						<Button style={{"marginRight":10,"display":this.state.viewDrawButton}} bsStyle='success' onClick={this.viewDrawWish} >我的认领</Button>
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
              	<div className="text-center" style={{"marginLeft":200}}>
				  <Loading loading={this.state.WallStore.objWish.loading} /> 
              	</div>
              	<NextButton  disabled={this.state.WallStore.objWish.loading} nextPage={this.nextPage} missed={this.state.missed} />
			  </section>
			  <Footer name={"济忆"} />
             </div>
			);
	}
});

module.exports = Wall ; 