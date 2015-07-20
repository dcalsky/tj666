
var React = require('react/addons');
var Reflux = require('reflux');

var WallStore = require('../stores/WallStore.js');
var UserStore = require('../stores/UserStore.js');
var Actions = require('../actions/actions.js');

var Bs = require('react-bootstrap');
var Well = Bs.Well , PageHeader = Bs.PageHeader , Input = Bs.Input , Col = Bs.Col , Row = Bs.Row , Button = Bs.Button ;
var Select = require('react-select');

var Router = require('react-router');

var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');

var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

var AddWish = React.createClass({
	mixins:[Reflux.connect(WallStore, 'WallStore'),Reflux.connect(UserStore, 'UserStore'),React.addons.LinkedStateMixin, Router.Navigation , ValidationMixin],
	validatorTypes:  {
        title: Joi.string().required().min(4).max(20).label('标题'),
        content: Joi.string().required().min(10).max(200).label('内容'),
        gender: Joi.string().required().label('性别'),
        contact: Joi.string().required().min(3).max(16).label('联系方式'),
        name: Joi.string().required().min(2).max(20).label('昵称'),
	},
	getInitialState: function () {
	    return {
        	title: null,
        	content: null,
        	gender: 'male',
        	name: null,
        	contact: null,
        	time: null,
        	accout: null,
	    };
	},
	back: function(){
		this.transitionTo('wall');
	},
	handleSelectChange: function(val,e){
    	this.setState({
			gender:val
		});
	},
	handleForm: function(e){
		var self = this ;
		e.preventDefault();
		if(this.state.title && this.state.content && this.state.name && this.state.contact && this.state.gender){
			console.log("submit!");
			Actions.addWish({
				title: self.state.title,
				content: self.state.content,
				gender: self.state.gender,
				name: self.state.name,
				contact: self.state.contact,
				accout: self.state.UserStore.user.accout,
			});
		}else{
			return ;
		}
	},
	renderHelpText: function(message) {
	    return (
	      <span style={{"color":"red","marginBottom":10,"display":"block"}}>{message}</span>
	    );
	},
	render: function(){
		if(this.state.WallStore.objWish.addCompleted){
			alert("许愿成功,返回许愿墙...");
			this.transitionTo('wall');
		}
		return(
			<div >
              <Navbar />
              <section className="container" style={{"marginTop":30}}>
              	<PageHeader> <p className="text-center" >添加心愿单<small>Let it come true</small></p></PageHeader>
              	<form onSubmit={this.handleForm} >
              	<Col xs={12}>
	              	<Input type='text' ref="title" label='心愿标题:' placeholder='请填写心愿的标题' addonBefore='*' valueLink={this.linkState('title')} onBlur={this.handleValidation('title')} />
      	            {this.getValidationMessages('title').map(this.renderHelpText)}
				</Col>
              	<Col xs={12}>
              		<Input type='textarea' ref="content" rows={6} label='心愿内容:' placeholder='请填写心愿的内容' valueLink={this.linkState('content')} onBlur={this.handleValidation('content')} />
      	            {this.getValidationMessages('content').map(this.renderHelpText)}
              	</Col>
              	<Col xs={6}>
              		<Input type='text' ref="name" label='昵称:' placeholder='请填写您的昵称' addonBefore='*' valueLink={this.linkState('name')} onBlur={this.handleValidation('name')} />
      	            {this.getValidationMessages('name').map(this.renderHelpText)}
              	</Col>
              	<Col xs={6}>
              		<Input type='text' ref="contact" label='联系方式(3选1):' placeholder='QQ|微信|手机号' addonBefore='*' valueLink={this.linkState('contact')} onBlur={this.handleValidation('contact')} />
      	            {this.getValidationMessages('contact').map(this.renderHelpText)}

              	</Col>
              	<Col xs={12}>
              	<h5><b>性别:</b></h5>
					<Select
					    placeholder="请选择您的性别"
					    value={this.state.gender}
					    ref="gender" 
					    options={[{value:'male',label:'男神'},{value:'female',label:'女神'},]}
					    onChange={this.handleSelectChange}
					    searchable={false}
					/>
      	            {this.getValidationMessages('gender').map(this.renderHelpText)}
              	</Col>
              	<Well className="text-center" bsSize='large'><p style={{marginTop:20}} >您的联系方式只会被认领者看见 & 一天只能认领或发布心愿一次 .</p></Well>
              	<Col xs={6} style={{"marginTop":20}}>
	              	<Button onClick={this.back} block>返回</Button>
              	</Col>
              	<Col xs={6} style={{"marginTop":20}}>
	              	<Button type="submit" bsStyle="success" block >提交</Button>
              	</Col>
              	</form>
			  </section>
			  <Footer name={"济忆"} />
             </div>
			);
	}
});

module.exports = AddWish ; 